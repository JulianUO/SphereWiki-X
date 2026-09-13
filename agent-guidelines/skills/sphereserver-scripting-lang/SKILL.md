---
name: sphereserver-scripting-lang
description: Comprehensive SphereScript language reference, memory models, object hierarchies, and engineering quality standards for SphereServer X (Source-X), covering section blocks ([ITEMDEF], [CHARDEF], [FUNCTION], [EVENTS], [TYPEDEF], [DIALOG], [MULTI]), triggers, object pointers (src, argo, act, new, ref, hold, movingcrate), variables (local, tag0, ctag0, var, def), control flow, and Source-X invariants.
metadata:
  target: SphereWiki-X
---

# SphereScript Language & Quality Standards (SphereServer X)

This skill provides the definitive specification, memory models, object relationships, architectural invariants, and coding standards for SphereServer X (`Source-X`).

---

## 1. Top-Level Section Blocks

| Section | Role | Example |
| :--- | :--- | :--- |
| `[ITEMDEF i_*]` | Base item template (durability, weights, values) | `[ITEMDEF i_sword_fire]` |
| `[CHARDEF c_*]` | Base creature/NPC template (stats, body, brain) | `[CHARDEF c_orc_shaman]` |
| `[FUNCTION f_*]` | Custom verbs and callable subroutines | `[FUNCTION f_heal_player]` |
| `[EVENTS e_*]` | Dynamic trigger collections attached to entities | `[EVENTS e_pvp_system]` |
| `[TYPEDEF t_*]` | Behavior triggers bound to an item `TYPE` | `[TYPEDEF t_magic_portal]` |
| `[DEFNAME ...]` | Named constants, bitmasks, and lookup tables | `[DEFNAME pvp_settings]` |
| `[DIALOG d_*]` | Custom graphical client gump menus | `[DIALOG d_quest_log]` |
| `[TEMPLATE t_*]` | Multi-item loot, spawn, and equipment packages | `[TEMPLATE t_loot_dragon]` |
| `[MULTI 0x*]` | House and ship multi-component structures | `[MULTI 0x4000]` |
| `[REGIONTYPE r_*]` | Spatial triggers and resource gathering pools | `[REGIONTYPE r_dungeon]` |
| `[REGIONRESOURCE]` | Harvestable natural resource definitions | `[REGIONRESOURCE mr_ore_iron]` |
| `[SKILL skill_*]` | Skill definition, delay, and gain triggers | `[SKILL skill_magery]` |
| `[SPELL s_*]` | Spell definition, reagents, mana, and triggers | `[SPELL s_flame_strike]` |
| `[PLEVEL N]` | Access tier (0-7) for GM dot-commands | `[PLEVEL 2]` |
| `[EOF]` | **Mandatory** terminating token of every `.scp` file | `[EOF]` |

---

## 2. Object Pointers & Multi Storage Reference Engine

### 2.1 Core Entity Navigation
- `DEFAULT` (`this`): The active object running the trigger (`CChar`, `CItem`, or `CRegion`).
- `SRC`: The actor/initiator of the event.
- `ARGO`: The secondary object involved (corpse, dropped item, weapon, trade box).
- `ACT`: Character's active AI or skill target (`CChar::m_Act_UID`).
- `NEW`: Freshly instantiated item or NPC (`SERV.NEWITEM` / `SERV.NEWNPC`).
- `LINK`: Persistent linked object pointer (`CObjBase::m_uidLink`).
- `OWNER`: Character or pet owner UID (Read/Write in Source-X).
- `CONT` / `TOPCONT` / `TOPOBJ`: Immediate container, top container, and root top-level object.
- `REF1` … `REF5`: Fast assignable script pointers (`ref1 = <src.uid>`).

### 2.2 Multi & Dedicated Container Storage
- **Houses (`CItemMulti` / `CItemMultiCustom`)**:
  - `MOVINGCRATE`: Dedicated container holding items during house customization or redeeding (`<ref1.movingcrate.uid>`, `ref1.TRANSFERMOVINGCRATETOBANK`).
  - `SIGN`: House sign object (`IT_SIGN_GUMP`).
  - `SECURECONTAINER(N)`: N-th secured container (`ATTR_SECURE`).
  - `LOCKDOWN(N)`: N-th locked down item (`ATTR_LOCKEDDOWN`).
  - `ADDON(N)`: N-th addon structure (`IT_MULTI_ADDON`).
  - Permissions: `Coowners`, `Friends`, `Accesses`, `Bans`, `Vendors` (`<ref1.IsOwner>`, `<ref1.GetCoownerPos>`, `ref1.AddCoowner`).
- **Ships (`CItemShip` / `CCMultiMovable`)**:
  - `HOLD` / `HATCH`: The physical ship hold storage container (`IT_SHIP_HOLD`, `IT_SHIP_HOLD_LOCK`) (`<ship.hold.uid>`).
  - `TILLER`: Tillerman object (`IT_SHIP_TILLER`) (`<ship.tiller.uid>`).
  - `PLANK(N)`: N-th ship gangplank item (`<ship.plank.<idx>.uid>`).
  - `PILOT`: Ship pilot wheel (`IT_PILOT`).
  - `ANCHOR`: Anchor state (`0`=up, `1`=down).
  - Triggers: `@ShipMove`, `@ShipStop`, `@ShipTurn`.

---

## 3. Core Interpreter & Memory Invariants (C++ Engine)

### 3.1 Strict Object Validity (`ISVALID`)
> **INVARIANT 3.1**: The Source-X script interpreter enforces strict null safety. Accessing any property or verb on an invalid or unassigned pointer (e.g. `<ref1.hits>` when `ref1` is null) produces a script error.

```scp
// ❌ WRONG: Causes runtime error if link or ref is not set
local.ownerName = <link.name>
if (<ref1.hits> < 50)

// ✅ CORRECT: Explicitly verified with ISVALID
if (<link.isvalid>)
    local.ownerName = <link.name>
endif

if (<ref1.isvalid>) && (<ref1.hits> < 50)
    // Short-circuit lazy evaluation guarantees safe execution
endif
```

### 3.2 Mathematical Arithmetic & Evaluation (`<eval>`, `<muldiv>`)
> **INVARIANT 3.2**: SphereScript strings are not automatically cast to integers in assignments. All arithmetic must be enclosed in `<eval ...>` or `<muldiv ...>`.

```scp
// ❌ WRONG: Produces string concatenation "10+5"
tag.count = <tag.count>+5

// ✅ CORRECT:
tag.count = <eval <tag.count> + 5>

// ✅ CORRECT for percentages: Prevents 32-bit integer overflow
local.bonus = <muldiv <argn1>, 25, 100>
```

### 3.3 Decimal Indirection in Dynamic Tag Keys (`<dlocal.X>`, `<dtag0.X>`)
> **INVARIANT 3.3**: When embedding variables inside another tag or definition name, always force decimal evaluation using the `d` prefix (`<dlocal.X>`, `<dtag0.X>`).

```scp
// ❌ WRONG: Parser treats <local.i> literally inside the key
tag0.quest.<local.i>.complete = 1

// ✅ CORRECT:
tag0.quest.<dlocal.i>.complete = 1
local.propName = <def.ItemProp<local.ItemType>_<dlocal.GetProp>>
```

### 3.4 Resource ID vs Constant Lookups (`RESDEF` vs `DEF`)
> **INVARIANT 3.4**: In Source-X, use `<RESDEF.name>` to retrieve the integer resource ID of an item/char/spell definition, and `<DEF.name>` strictly for constants declared in `[DEFNAME]` blocks.

---

## 4. Idiomatic Scripting Patterns

### 4.1 Dialog Management & Packet Safety
When opening or updating custom client gumps (`[DIALOG d_*]`):
1. Clear temporary transient session state (`ctag.quest`, `ctag.view`).
2. Close any existing conflicting dialogs before rendering new ones (`dialogclose d_OldMenu`).
3. Use `f_ResendDialog d_Menu` or `trysrc <uid> f_resenddialog d_Menu` to ensure packet delivery without client desync.

```scp
[FUNCTION f_OpenQuestLog]
ctag.quest
ctag.view
dialogclose d_QuestNPCs
f_ResendDialog d_QuestPlayers
```

### 4.2 Tag Architecture & Namespace Segmentation
Organize custom persistent data on characters and items using structured dot-hierarchies:
- **Quest System**: `tag0.quests` (total count), `tag0.quest.<slot>.id`, `tag0.quest.<slot>.complete`, `tag0.quest.<slot>.quester`.
- **Combat & Sockets**: `tag0.Faction`, `tag.HitSpecialMove`, `tag0.SkillMod`, `tag0.SkillMod<skill_id>`, `TAG.LastHit`.
- **Housing**: `tag0.HouseCustom`, `tag0.MovingCrate`.

### 4.3 Dynamic DEFNAME Reflection
Avoid massive, repetitive `if/elif/else` switch trees by leveraging dynamic DEFNAME dictionary reflection:

```scp
// Data Definition:
[DEFNAME item_properties_weapons]
ItemPropWeaponAmount        10
ItemPropWeapon_1            1,IncreaseDam,10,35
ItemPropWeapon_2            2,HitLightning,5,20

// Dynamic Execution Loop:
while (<local.LuckProps> > 0)
    local.GetProp = <r1,<def.ItemProp<local.ItemType>Amount>>
    local.Flag = <f_GetARGV 0 <def.ItemProp<local.ItemType>_<dlocal.GetProp>>>
    if (<local.UsedProps> & <local.Flag>)
        continue
    endif
    args = <def.ItemProp<local.ItemType>_<dlocal.GetProp>>
    uid.<uid>.<argv[1]> = <r<argv[2]>,<argv[3]>>
    local.UsedProps |= <argv[0]>
    local.LuckProps -= 1
enddo
```

### 4.4 User Feedback & Message Formatting
- Use `@,,1` for standard shard system messages with client-configured text colors.
- Use explicit hues (`@044` for positive/green, `@020` for errors/red, `@038a` for info).

```scp
src.sysmessage @,,1 Limite alcanzado (<ddef.MaxFriends>).
src.sysmessage @020 No tienes suficiente oro para completar la transaccion.
```

### 4.5 Sub-Function Calling & Local Scope Sharing (`CALL` Keyword)
> **INVARIANT 4.5**: Standard function calls (`f_subfunc`) instantiate a new `CScriptTriggerArgs` frame where `local.*` variables from the caller are NOT accessible. Conversely, invoking a sub-function with the `CALL` keyword (`CALL f_subfunc` or `CALL <ref>.f_subfunc`) **reuses the active `CScriptTriggerArgs` scope**:
> 1. All `local.*` variables from the calling function are **inherited, visible, and directly modifiable** in the called sub-function.
> 2. Any `local.*` variable modified or created inside the sub-function **persists back in the calling function** upon return.
> 3. Used heavily for modular gump construction (`qDialogs.scp`, `AchievementsMenu.scp`) to decompose large UI pages into reusable sub-renderers without passing dozens of parameters.

```scp
[FUNCTION f_Achievements_Render]
local.Width = 599
local.Height = 432
resizepic 36 36 3500 <local.Width> <local.Height>
// CALL passes local.Width and other active locals directly to the sub-function:
CALL f_Achievement_DrawGeneral
CALL f_Achievement_DrawSlayer

[FUNCTION f_Achievement_DrawGeneral]
// Reads caller's local.Width directly without parameter declaration:
dhtmlgump 80 100 <eval <local.Width> - 100> 25 0 0 General Achievements
```

---

## 5. Code Quality Checklist for Scripters & Agents

Before finalizing any `.scp` script:
- [ ] File begins with header comment and `VERSION=X1`.
- [ ] File ends with `[EOF]`.
- [ ] All loops have safety exit bounds (no potential infinite loops).
- [ ] All arithmetic operations are wrapped in `<eval>` or `<muldiv>`.
- [ ] All dynamic array/tag indices use decimal `d` formatting (`<dlocal.X>`).
- [ ] All entity pointer queries (`link`, `owner`, `argo`, `ref*`) are guarded with `ISVALID`.
- [ ] File is encoded in **ANSI / Latin-1** (ISO-8859-1).
- [ ] Indentation uses **tabs**.
