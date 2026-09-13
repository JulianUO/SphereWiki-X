---
name: sphereserver-game-systems
description: Comprehensive C++ architectural and engineering standards for SphereServer gameplay systems, game objects (CObjBase, CChar, CItem, CItemContainer), memory flags (CItemMemory), AI, combat, magic, sectors, and network synchronization.
metadata:
  origin: UOAscension
---

# SphereServer Gameplay Systems & Object Architecture (C++)

This standard defines the architectural patterns, memory invariants, object lifecycle rules, and gameplay mechanics for developing and refactoring C++ code within the SphereServer engine (`Source-X`).

---

## 1. Core Object Hierarchy & Identity

### Object Polymorphism Model
The entity hierarchy in SphereServer is rooted at `CObjBaseTemplate`:

```
CObjBaseTemplate
  └── CObjBase (Has UID, Serial, Top-level coordinates, Property map)
        ├── CChar (Living entities: NPCs, Players, Creatures, Pets)
        └── CItem (Objects: Weapons, Armor, Multi, Containers, Corpses, Memory)
              ├── CItemContainer (Backpacks, BankBoxes, Chests, Corpses)
              │     ├── CItemCorpse (Dead character containers)
              │     └── CItemMulti (Houses, Ships, Custom multis)
              ├── CItemMemory (Special equipped memory items on LAYER_SPECIAL)
              └── CItemVendable (Items with buy/sell pricing)
```

### UID Conventions & Resolution (`CUID`)
- Every spawned game entity has a unique 32-bit `CUID`.
- Highest bits encode flags: `UID_F_ITEM`, `UID_F_RESOURCE`.
- **Finding Objects**:
  ```cpp
  // Resolving generic object:
  CObjBase *pObj = uid.ObjFind();
  if (pObj == nullptr)
      return; // Object does not exist, was deleted, or UID is invalid.

  // Resolving character:
  CChar *pChar = uid.CharFind();

  // Resolving item:
  CItem *pItem = uid.ItemFind();
  ```

### Safe Casting & Hierarchy Navigation Rules
> **RULE 1.1**: NEVER use unchecked `static_cast` on `GetContainer()`, `GetTopLevelObj()`, `m_uidLink.ObjFind()`, `m_Act_Targ_UID.ObjFind()`, or `m_Fight_Targ_UID.ObjFind()`.

#### Anti-Pattern (Crash Danger):
```cpp
// DANGEROUS: If GetContainer() returns nullptr, a CItem, or a CItemCorpse, this crashes or causes UB.
CChar* pCharContainerOwner = static_cast<CChar*>(pContainer->GetContainer());
pCharContainerOwner->SysMessage("...");
```

#### Correct Pattern:
```cpp
// SAFE: Use dynamic_cast or type check before casting
CChar *pCharContainerOwner = dynamic_cast<CChar*>(pContainer->GetContainer());
if (pCharContainerOwner != nullptr)
{
    iMaxWeight += g_Cfg.Calc_MaxCarryWeight(pCharContainerOwner);
}
```

---

## 2. Container Topology, Inventory & Weight Physics

### Nesting & Circular Containment Guard
- Never allow a container to be inserted inside one of its own descendant children (`IsItemInside()`), as recursive weight calculations will enter an infinite loop or cause stack overflow.
- Check depth and capacity with `CanContainerHold()` before placing items.

### Content Counting vs Virtual Layers
In Ultima Online and SphereServer, certain items contained within `CContainer` / `CItemContainer` are virtual items (hair, beard, memory items, internal spells).

When reporting item counts or weight in UI single-click packets or tooltips:
- **`IT_CORPSE`**:
  - Filter out `IT_HAIR` and `IT_BEARD`.
  - Filter out fixed/system attributes: `ATTR_NEWBIE | ATTR_MOVE_NEVER | ATTR_CURSED2 | ATTR_BLESSED2 | ATTR_STATIC`.
- **Equipped Layers**:
  - Layers `LAYER_HAIR`, `LAYER_BEARD`, `LAYER_PACK`, `LAYER_BANKBOX`, `LAYER_SPECIAL`, `LAYER_DRAGGING` must be treated specifically according to the target context.

```cpp
size_t iTotalUnits = 0;
size_t iTotalWeight = 0;

if (pItem->IsType(IT_CORPSE))
{
    const size_t iCount = pCont->GetContentCount();
    for (size_t i = 0; i < iCount; ++i)
    {
        const CItem *pContent = static_cast<const CItem*>(pCont->GetContentIndex(i));
        if (!pContent)
            continue;
        if (pContent->IsAttr(ATTR_NEWBIE | ATTR_MOVE_NEVER | ATTR_CURSED2 | ATTR_BLESSED2 | ATTR_STATIC))
            continue;
        if (pContent->IsType(IT_HAIR) || pContent->IsType(IT_BEARD))
            continue;

        ++iTotalUnits;
        iTotalWeight += static_cast<size_t>(pContent->GetWeight() / WEIGHT_UNITS);
    }
}
```

---

## 3. Memory Architecture & Relationship Preservation (`CItemMemory`)

SphereServer represents character relationships (pets, friends, combat targets, guilds, criminal flags) as `CItemMemory` items equipped on the character's `LAYER_SPECIAL`.

### Bitmask Flags (`MEMORY_TYPE`)
A single `CItemMemory` object can combine multiple bitflags:
- `MEMORY_IPET`: Active pet ownership link to master.
- `MEMORY_FRIEND`: Pet friend list.
- `MEMORY_GUILD`: Guild affiliation link.
- `MEMORY_FIGHT`: Active combat state with target.
- `MEMORY_IRRITATEDBY`: Annoyance/combat provocation.
- `MEMORY_HARMEDBY`: Took damage from source.
- `MEMORY_AGGREIVED`: Aggressor flag in combat.

### The Memory Deletion Invariant
> **RULE 3.1**: NEVER call `pMemory->Delete()` when ending combat (`Fight_Clear`, `Fight_ClearAll`) if the memory item holds non-combat relationship flags (e.g. `MEMORY_IPET`). Deleting the memory object will permanently destroy the pet/owner relationship!

#### Correct Implementation Pattern:
```cpp
void CChar::Fight_ClearMemory(CChar *pTarget)
{
    if (!pTarget)
        return;

    CItemMemory *pMemory = Memory_FindObj(pTarget->GetUID());
    if (pMemory != nullptr)
    {
        constexpr word wCombatFlags = MEMORY_FIGHT | MEMORY_IRRITATEDBY | MEMORY_HARMEDBY | MEMORY_AGGREIVED;
        const word wRemainingFlags = pMemory->GetMemoryTypes() & ~wCombatFlags;

        if (wRemainingFlags == MEMORY_NONE)
        {
            // No other relationship exists: safe to delete item
            pMemory->Delete();
        }
        else
        {
            // Preserve pet/friend/guild relationship: only clear combat flags
            pMemory->SetMemoryTypes(wRemainingFlags);
        }
    }
}
```

---

## 4. Artificial Intelligence, Decision Rates & Clamping

### Probability and Chance Calculations
Chance variables configured in `sphere.ini` or tags typically range from `0` to `100` (percentage).

> **RULE 4.1**: Never clamp maximum probability with `maximum(val, 100)`. Always cap with `minimum(val, 100)`.
> In random checks where `uiRand` is in range `[0, 99]`, compare with `uiRand < uiChance`.

#### Anti-Pattern (Dead Code Bug):
```cpp
// BUG: Clamping to at least 100 makes uiLookAroundChance >= 100.
uiLookAroundChance = maximum(uiLookAroundChance, 100);

// BUG: uiRand is 0..99, so uiRand >= 100 is NEVER true!
if (uiRand >= uiLookAroundChance)
{
    NPC_LookAround(); // Dead code! Never executed!
}
```

#### Correct Pattern:
```cpp
// SAFE: Clamp upper bound to 100
uiLookAroundChance = minimum(uiLookAroundChance, 100);

// SAFE: 0% never triggers, 100% always triggers
if (uiRand < uiLookAroundChance)
{
    if (NPC_LookAround())
        iStopWandering = 2;
}
```

### AI Ticking & Spatial Search Throttling
- AI actions (`NPC_Act_Wander`, `NPC_Act_Follow`, `NPC_Act_Fight`) execute on every tick when active.
- Expensive operations (Pathfinding, `NPC_LookAround`, `CWorldSearchHolder` scanning) must be throttled with tick intervals or random roll guards to prevent CPU spikes on high NPC density sectors.

---

## 5. Combat, Skills & Spell Pipeline

### Skill Check Mechanics
`Skill_CheckSuccess(SKILL_TYPE iSkill, int iDifficulty, bool fUseBellCurve)`:
- Supports both linear distributions and 3-dice Gaussian bell curve distributions (`fUseBellCurve = true`).
- Triggers `@SkillStart`, `@SkillSuccess`, `@SkillFail`, `@SkillGain` with accurate `CScriptTriggerArgs`.

### Spell Pipeline Order
1. **Validation & Cost Deduction**: Mana, stamina, reagents, tithing points.
2. **Pre-Cast Trigger**: `@SpellCast`. If returned `1`, abort cast.
3. **Targeting & Cast Delay**: `CLIMODE_TARG_SKILL_MAGERY`.
4. **Interruption Handling**: On taking damage while casting, check `NPCCANFIZZLEONHIT` or disturbance formulas.
5. **Dispatch & Reflection**:
   - Check `SPELLFLAG_TARG_OBJ` / `SPELLFLAG_TARG_CHAR`.
   - Magic reflection evaluation: check `local.IsSpellReflected` and `local.BypassMagicReflection`.
6. **Execution Trigger**: `@SpellEffect` / `@Effect`.
7. **Failure Cleanup**: On fizzle or abort, trigger `@SpellFail` with `local.Sound` support and clear casting flags.

---

## 6. Sector Partitioning & Environment Transitions

### Sector Lifecycle (`CSector`)
- The world map is partitioned into spatial sectors (`CSector`).
- **Sleep vs Awake**: Sectors without active players enter a sleeping state (`_IsSleeping()`) to suspend unnecessary NPC ticking and reduce CPU load.
- **Awakening**: When a player moves into a sector (`MoveCharToSector`), the sector wakes up immediately (`_GoAwake()`).

### Environmental State Synchronization
> **RULE 6.1**: When moving a player across sectors in `MoveCharToSector()`, proactively transmit updated light, weather, and season packets immediately rather than waiting for the sector's next periodic environmental tick.

```cpp
CClient *pClient = pChar->GetClientActive();
if (pClient != nullptr)
{
    pClient->addLight();
    pClient->addWeather(GetWeather());
    pClient->addSeason(GetSeason());
}
```

---

## 7. Client-Server Network & UI Synchronization

### Real-Time Clock & Rate Limiting
- Source-X uses millisecond-resolution real-time clocks (`CWorldGameTime::GetCurrentTime().GetTimeRaw()`).
- Sliding window detectors (e.g. `PingFloodMax` on packet `0x73`, walk sequence buffers) must compare timestamps using `MSECS_PER_SEC` (1000 ms), NOT game ticks.

### UI Window Lifecycles
When closing UI windows via server-side verbs (`CLOSECONTAINER`, `CLOSEPAPERDOLL`, `CLOSESTATUS`, `CLOSEVENDORMENU`):
- Verify entity validity and client ownership.
- Send the appropriate `PacketCloseUIWindow` or `PacketVendorClose` to keep the client's internal gump stack synchronized with the server state.

---

## 8. Summary Checklist for Code Reviews

When reviewing or writing SphereServer C++ code:

- [ ] **Pointer Safety**: Are all `CObjBase` / `CContainer` downcasts guarded with `dynamic_cast` or `IsChar()` / `IsItem()`?
- [ ] **Memory Invariants**: Does clearing a state (fight, criminal, party) protect composite memory flags like `MEMORY_IPET` and `MEMORY_FRIEND`?
- [ ] **Cycle Prevention**: Does container manipulation prevent circular parent-child placement?
- [ ] **Clamping & Probability**: Are chance values capped with `minimum(val, 100)` and compared with `rand < chance`?
- [ ] **Time Units**: Are timestamps and timeouts calculated in milliseconds using `MSECS_PER_SEC`?
- [ ] **RAII & Resource Cleanup**: Are heap buffers managed with `std::unique_ptr` and synchronization primitives guarded with `std::lock_guard`?
