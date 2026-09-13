# SphereScript — Object Model & Explicit Reference Engine

> In SphereServer, everything in the virtual world (Characters, Items, Multis, Regions, Accounts, Server) is an Object rooted in the C++ object hierarchy. In scripts, objects are referenced through special pointers, explicit UIDs, or relationship keywords resolved by `CObjBase::r_GetRef`, `CChar::r_GetRef`, and `CItem::r_GetRef`.

---

## The Master Reference Matrix

| Keyword | Available On | Returns | C++ Source Resolver | Description |
| :--- | :--- | :--- | :--- | :--- |
| `DEFAULT` (unprefixed) | Any trigger | `this` | Current runtime object | The active object running the script. |
| `SRC` | Triggers | `CTextConsole*` | Script invocation stack | The entity initiating the action (attacker, clicker, crafter, mover). |
| `ARGO` | Triggers | `CObjBase*` | `CScriptTriggerArgs::m_pO1` | Secondary event object (dropped item, corpse on death, weapon used). |
| `ACT` | `CChar` | `CObjBase*` | `CChar::m_Act_UID` | Active target of character AI, combat, or crafting loop. |
| `NEW` | Global | `CObjBase*` | `g_World.m_uidNew` | Freshly instantiated item or character (`SERV.NEWITEM` / `SERV.NEWNPC`). |
| `LINK` | `CItem` / `CChar` | `CObjBase*` | `CObjBase::m_uidLink` | Persistent linked object (key to chest, pet to master, switch to door). |
| `OWNER` | `CChar` / `CItem` | `CChar*` | `CChar::GetOwner()` | Pet owner, hireling master, or item owner UID (R/W in Source-X). |
| `CONT` | `CItem` | `CContainer*` | `CItem::GetContainer()` | Immediate parent container holding this item. |
| `TOPCONT` | `CItem` | `CContainer*` | `CItem::GetTopContainer()` | Topmost container item in a nested container hierarchy. |
| `TOPOBJ` | `CItem` / `CObjBase` | `CObjBase*` | `CObjBase::GetTopLevelObj()` | Root character or ground item at the top of the containment tree. |
| `ROOM` | `CObjBase` | `CRegion*` | `GetTopPoint().GetRegion(REGION_TYPE_ROOM)` | Specific interior room sub-region where the object is located. |
| `SECTOR` | `CObjBase` | `CSector*` | `CObjBase::GetTopSector()` | Map sector slice (contains weather, light level, season). |
| `REGION` | `CChar` / `CItem` | `CRegion*` | `CChar::m_pArea` / `GetRegion()` | Geographic zone (`[AREADEF]`) surrounding the object. |
| `SPAWNITEM` | `CObjBase` | `CItem*` | `CObjBase::_uidSpawn` | The `t_spawn_char` or `t_spawn_item` object that spawned this entity. |
| `TYPEDEF` | `CObjBase` | `CBaseBaseDef*` | `CObjBase::Base_GetDef()` | Prototypical template definition (`[ITEMDEF]` or `[CHARDEF]`). |
| `ACCOUNT` | `CChar` (Player) | `CAccount*` | `CCharPlayer::GetAccount()` | Account owning the player character. |
| `WEAPON` | `CChar` | `CItem*` | `CChar::m_uidWeapon` | Currently wielded weapon item. |
| `FINDLAYER(N)` | `CChar` | `CItem*` | `CChar::LayerFind(layer)` | Item equipped on layer N (e.g. `findlayer(layer_pack)`). |
| `HOUSE(N)` | `CChar` (Player) | `CItemMulti*` | `CMultiStorage::GetHouseAt(N)` | N-th player house owned on the account (0-indexed). |
| `SHIP(N)` | `CChar` (Player) | `CItemShip*` | `CMultiStorage::GetShipAt(N)` | N-th ship owned on the account (0-indexed). |
| `MEMORYFINDTYPE(type)` | `CChar` | `CItemMemory*` | `CChar::Memory_FindTypes(type)` | Searches equipped memory items by type mask (`MEMORY_IPET`, `MEMORY_FIGHT`). |
| `MEMORYFIND(uid)` | `CChar` | `CItemMemory*` | `CChar::Memory_FindObj(uid)` | Searches memory object linking to a specific target UID. |
| `ATTACKER[N]` | `CChar` | `CChar*` | `CChar::m_lastAttackers[N]` | N-th active combat opponent in the attacker table. |
| `ATTACKER.MAX` | `CChar` | `CChar*` | Calculated | Opponent who dealt the highest cumulative damage. |
| `ATTACKER.LAST` | `CChar` | `CChar*` | Calculated | Opponent who attacked most recently. |
| `ATTACKER.TARGET` | `CChar` | `CChar*` | Calculated | Primary active combat target. |
| `REF1` … `REF5` | Script Stack | `CObjBase*` | Script Execution Frame | Temporary assignable script object pointers (`ref1 = <src.uid>`). |
| `UID.<uid>` | Global | `CObjBase*` | `CUID::ObjFind()` | Explicit global object lookup by hex or decimal UID. |
| `SERV` | Global | `CServer*` | `g_Serv` | Root server engine instance. |
| `DB` / `LDB` | Global | `CScriptObj*` | SQL Connection Pool | Remote MySQL or local SQLite database query interface. |
| `FILE` | Script Stack | `CSFileObj*` | File System API | Open disk file handle. |

---

## Contextual Implicit Scopes (`DEFAULT` / `this`)

The object executing the script changes depending on the block / trigger:

| Section / Trigger Context | Implicit `DEFAULT` (`<name>`, `<p>`, `<flags>`) | `SRC` Reference | `ARGO` Reference |
| :--- | :--- | :--- | :--- |
| `[ITEMDEF i_*]` / `[TYPEDEF t_*]` / Item `@Triggers` | The **`CItem` instance** | Character interacting (`CChar`) | Target / dropped object |
| `[CHARDEF c_*]` / `[EVENTS e_*]` / Char `@Triggers` | The **`CChar` instance** | Interacting / Opponent character | Contextual item or corpse |
| `[REGIONTYPE r_*]` / Region `@Triggers` | The **`CRegion` zone** | Character stepping/entering (`CChar`) | Resource bit (`CItem`) |
| `[REGIONRESOURCE mr_*]` | The **`CRegionResourceDef` resource** | Harvesting character (`CChar`) | Resource item instance |
| `[SKILL skill_*]` / Skill `@Triggers` | The **`CChar` using skill** | Interacting target | Target item / crafted item |
| `[SPELL s_*]` / Spell `@Triggers` | The **`CChar` casting / receiving** | Target or caster | Wand, scroll, or spellbook item |
| `[DIALOG d_* BUTTON]` | The **`CChar` player viewing gump** | The player (`CChar`) | — |
| `f_onserver_*` / Global hooks | **Server engine (`CServer`)** | — | Contextual client or account |

---

## Navigation & Null Safety in Source-X

> [!IMPORTANT]
> **Source-X Strict Evaluation Invariant**: In Source-X, accessing properties on an invalid object pointer throws a script execution error. Always guard lookups with `<obj.isvalid>`.

```scp
// WRONG: May error if link is not set
local.ownerName = <link.name>

// CORRECT: Verified safe lookup
if (<link.isvalid>)
    local.ownerName = <link.name>
else
    local.ownerName = Unlinked
endif

// Or with ternary inline:
local.ownerName = <qval <link.isvalid> ? <link.name> : Unlinked>
```
