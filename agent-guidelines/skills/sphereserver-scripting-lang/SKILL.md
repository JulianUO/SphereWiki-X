---
name: sphereserver-scripting-lang
description: Comprehensive SphereScript language reference and engineering standard for SphereServer X (Source-X), covering section blocks ([ITEMDEF], [CHARDEF], [FUNCTION], [EVENTS], [TYPEDEF], [DIALOG], [MULTI]), triggers, object pointers (src, argo, act, new, ref, hold, movingcrate), variables (local, tag0, ctag0, var, def), control flow, and Source-X invariants.
metadata:
  origin: UOAscension
---

# SphereScript Language & Quality Standards (SphereServer X)

This skill provides the definitive specification, memory models, object relationships, and coding patterns for SphereServer X (`Source-X`) within the UOAscension project.

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

### Core Entity Navigation
- `DEFAULT` (`this`): The active object running the trigger (`CChar`, `CItem`, or `CRegion`).
- `SRC`: The actor/initiator of the event.
- `ARGO`: The secondary object involved (corpse, dropped item, weapon, trade box).
- `ACT`: Character's active AI or skill target (`CChar::m_Act_UID`).
- `NEW`: Freshly instantiated item or NPC (`SERV.NEWITEM` / `SERV.NEWNPC`).
- `LINK`: Persistent linked object pointer (`CObjBase::m_uidLink`).
- `OWNER`: Character or pet owner UID (Read/Write in Source-X).
- `CONT` / `TOPCONT` / `TOPOBJ`: Immediate container, top container, and root top-level object.
- `REF1` … `REF5`: Fast assignable script pointers (`ref1 = <src.uid>`).

### Multi & Dedicated Container Storage
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

## 3. Strict Source-X Invariants & Quality Standards

1. **Object Null Safety**: Always verify `<obj.isvalid>` before accessing member properties.
2. **Arithmetic & Percentage Precision**: Always wrap calculations in `<eval ...>` or `<muldiv value, percent, 100>`.
3. **Decimal Indirection**: Use `<dlocal.X>` and `<dtag0.X>` when referencing variable keys dynamically.
4. **Dialog Flow**: Reset session state (`ctag.X`), close conflicting menus (`dialogclose`), and invoke `f_ResendDialog` to prevent gump desyncs.
5. **Dynamic Dictionary Reflection**: Use `<def.Table_<dlocal.idx>>` to eliminate large `if/elif` blocks.
6. **File Formatting**: Latin-1 / ANSI encoding, tab indentation, and terminating `[EOF]`.
