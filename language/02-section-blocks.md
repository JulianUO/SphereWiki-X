# SphereScript — Section Blocks Overview

> Every `.scp` file is partitioned into top-level section blocks delimited by square brackets `[SECTIONTYPE identifier]`. This document explains each section type, its role in the Sphere engine, and where it fits in the object model.

---

## Complete Table of Section Types

| Section Type | Target Subsystem | Primary Role | Trigger Support |
| :--- | :--- | :--- | :--- |
| `[ITEMDEF i_*]` | Items (`CItem`) | Defines base template properties for items (weapons, armor, containers, statics). | Yes (`@Create`, `@DClick`, etc.) |
| `[CHARDEF c_*]` | Chars (`CChar`) | Defines base template properties for NPCs, creatures, mounts, body definitions. | Yes (`@Create`, `@NPCAct*`, etc.) |
| `[FUNCTION f_*]` | Runtime Verbs | Reusable script functions, callable by scripts or GM console. | No (Executes procedural statements) |
| `[EVENTS e_*]` | Dynamic Hook Set | Collection of event triggers that can be dynamically assigned to Chars/Items via `EVENTS=+e_*`. | Yes (Full trigger set) |
| `[TYPEDEF t_*]` | Item Type Definitions | Reusable behavior triggers assigned to all items sharing a specific `TYPE=t_*`. | Yes (Item triggers) |
| `[DEFNAME name]` | Preprocessor Table | Global key-value dictionary of named constants, aliases, formulas, or colors. | No (Data definitions only) |
| `[DIALOG d_*]` | Client UI Gumps | Custom server-rendered visual gumps (menus, dialogs, buttons, text entries). | Yes (`[DIALOG d_X BUTTON]`, `ON=1`, etc.) |
| `[TEMPLATE t_*]` | Spawning & Loot | Composite bundles of items/NPCs with random rolls, amounts, and nesting. | No (Data template syntax) |
| `[SKILL skill_*]` | Skills Engine | Configuration and scripting for the 55+ standard Ultima Online skills. | Yes (`@Start`, `@Success`, `@Fail`, etc.) |
| `[SPELL s_*]` | Magic System | Configuration for standard and custom magic spells across circles and schools. | Yes (`@Select`, `@Cast`, `@Effect`, etc.) |
| `[MULTI 0x*]` | Multi-Tile Structures | Houses, boats, ships, and multi-component composite structures. | No (Coordinates/Component map) |
| `[REGIONTYPE r_*]` | Spatial Triggers | Defines triggers and behavior for specific regions/areas (guarded, dungeon, pvp). | Yes (`@Enter`, `@Leave`, `@Step`, etc.) |
| `[REGIONRESOURCE]` | Gathering System | Ore, wood, fish resources harvestable within regions matching specific terrain. | Yes (`@ResourceTest`, `@ResourceFound`) |
| `[AREADEF name]` | World Geometry | Map region bounding box definition with flags, events, and climate. | No (Can attach `EVENTS=r_*`) |
| `[ROOMDEF name]` | Interior Geometry | Sub-region inside an Area (e.g. specific building room or cellar). | No (Can attach `EVENTS=r_*`) |
| `[SPAWN s_*]` | Spawn Generator | Spawning tables combining NPC/Item definitions with weights. | No (Spawn definitions) |
| `[SKILLMENU sm_*]` | Legacy Craft Menus | Old-style text/gump menus for selecting crafting items. | No (Menu item pairs) |
| `[SKILLCLASS name]` | Character Class Cap | Caps and stat/skill gain modifiers for specific classes. | No (Class attributes) |
| `[NAMES n_*]` | Name Generator | Lists of names randomly picked by `#NAMES_*` macros on NPC creation. | No (String list) |
| `[PLEVEL N]` | Access Control | Security tier requirement (0 to 7) for executing GM console functions. | No (Function list) |
| `[COMMENT name]` | Parser Nullifier | Completely ignored block for scratch notes or disabled code blocks. | No (Ignored) |
| `[EOF]` | Parser Sentinel | Mandated terminating token for every script file. | No |

---

## Detailed Section Breakdown

### 1. Game Object Templates (`[ITEMDEF]`, `[CHARDEF]`, `[MULTI]`)
These blocks define the prototypical defaults for objects created in the world.
- When an object is instantiated via `SERV.NEWITEM i_sword` or `.add c_orc`, it inherits all properties configured in its definition.
- Properties set in the definition block (like `WEIGHT`, `ARMOR`, `DAM`, `STR`, `DEX`) serve as baseline constants unless overridden on the instance.

### 2. Behavioral Hooks (`[EVENTS]`, `[TYPEDEF]`, `[REGIONTYPE]`)
These define event-driven handlers (`ON=@Trigger`).
- `[EVENTS]`: Dynamically attached to living characters (`CChar`) or items (`CItem`). Multiple event sets can be stacked on one object (`EVENTS=+e_pvp,+e_quest`).
- `[TYPEDEF]`: Attached implicitly via an item's `TYPE` property. Whenever any item has `TYPE=t_door`, it automatically inherits all `ON=@DClick` triggers defined in `[TYPEDEF t_door]`.
- `[REGIONTYPE]`: Attached to map sectors or area definitions (`EVENTS=r_dungeon`).

### 3. Procedural Logic (`[FUNCTION]`)
Functions allow creating custom verbs. They can be invoked in two ways:
- **As an execution verb**: `f_my_func 10,20` (acts on the default object in scope).
- **As an expression modifier**: `<f_my_func 10,20>` (returns a string or evaluated value).

### 4. User Interface (`[DIALOG]`)
Dialog definitions use a multi-part structure:
1. `[DIALOG d_name]`: Layout coordinates, background gumps, text blocks, buttons, and radio controls.
2. `[DIALOG d_name TEXT]`: Raw string table used by numeric text placeholders.
3. `[DIALOG d_name BUTTON]`: Event handlers for button clicks (`ON=0` for cancel/close, `ON=1` for button ID 1).

### 5. Engine Tables (`[DEFNAME]`, `[NAMES]`, `[PLEVEL]`)
- `[DEFNAME]` creates compile-time/parse-time lookup constants. It supports numbers, hex bitmasks, arrays, strings, and weighted random blocks.
- `[NAMES]` provides pools of naming strings for NPC creation.
- `[PLEVEL]` defines the minimum GM rank needed to execute commands from console.

---

> For dedicated specifications and all supported properties for each block, see [`../sections/`](../sections/ITEMDEF.md).
