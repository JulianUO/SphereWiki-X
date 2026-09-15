# SphereScript — Variables, Lists & Dictionaries

> SphereScript features multiple distinct variable namespaces, dynamic array lists, and native dictionary collections, each with tailored lifetime, scope, and persistence characteristics.

---

## Variable & Collection Types at a Glance

| Syntax | Namespace / Scope | Lifetime | Persists to Worldsave? | Description |
| :--- | :--- | :--- | :---: | :--- |
| `local.X` | Function / trigger stack | Execution frame | No | Temporary work variable |
| `tag.X` / `tag0.X` | Object (`CObjBase`: char/item) | Object lifetime | **Yes** | Persistent custom property |
| `ctag.X` / `ctag0.X` | Object (`CObjBase`: char/item) | Server session / client logout | No | Client session tag (cleared on restart/logout) |
| `var.X` / `var0.X` | Global server (`g_ExprGlobals`) | Server lifetime | **Yes** (`[GLOBALS]`) | Global variable accessible from any script context |
| `serv.list.X` / `list.X` | Global dynamic list array | Server lifetime | **Yes** (`[LIST]`) | Ordered 0-indexed list/queue for strings or numbers |
| `jtag.dict.key` | Object (`CObjBase`: char/item) | Object lifetime | **Yes** | Persistent object-level dictionary collection |
| `jlocal.dict.key` | Function / trigger stack | Execution frame | No | Volatile execution-scope dictionary collection |
| `serv.jtag.dict.key` | Global server (`g_ExprGlobals`) | Server lifetime | **Yes** (`[GLOBALS]`) | Global server-level persistent dictionary collection |
| `ref1` … `ref65535` | Execution call context | Execution frame | No | Assignable game object pointer reference |
| `argn` / `argn1`…`3` | Trigger / function call | Execution frame | No | Numeric arguments passed to/from trigger or function |
| `args` | Trigger / function call | Execution frame | No | Raw string argument passed to trigger or function |
| `argo` | Trigger execution context | Current trigger | No | Event-related object pointer (item dropped, target, etc.) |
| `argv[N]` | Function call parameters | Execution frame | No | 0-indexed argument token passed to a `[FUNCTION]` |
| `def.X` / `def0.X` | Constant definitions | Server runtime | No (in scripts) | Constant declared in a `[DEFNAME]` block |
| `resdef.X` | Resource definitions | Server runtime | No (in scripts) | Numeric resource ID of an item, char, or spell |

---

## `local.X` — Local Stack Variables

```scp
[FUNCTION f_calculate_reward]
local.base = 100
local.multiplier = 3
local.reward = <eval <local.base> * <local.multiplier>>
sysmessage Reward: <dlocal.reward> gold
```

- **Scope**: Current function or trigger stack frame (`CScriptTriggerArgs`).
- **Lifetime**: Destroyed automatically when the function/trigger terminates.
- **Case-Insensitive**: `local.count` and `local.Count` access the same variable.
- **Sub-Function Isolation**: Normal function calls (`f_subfunc`) create an independent stack frame. Sub-functions cannot read or overwrite the caller's locals.
- **`CALL` Sharing**: Calling a function via `CALL f_subfunc` reuses the active trigger args frame, allowing the sub-function to read and modify the caller's `local.*` variables directly.
- **`<dlocal.X>`**: Forces decimal numeric formatting, essential when constructing dynamic property keys:
  ```scp
  local.slot = 2
  tag0.quest.<dlocal.slot>.completed = 1  // Writes tag0.quest.2.completed
  ```

---

## `tag.X` / `tag0.X` — Persistent Object Tags

```scp
// Writing tags on an object:
tag.FactionRank = 3
tag.Title = The Undaunted

// Reading tags:
sysmessage Rank: <dtag0.FactionRank> (<tag.Title>)

// Deleting a tag:
tag.FactionRank =      // Setting empty deletes the key
```

- **Scope**: Bound to a specific character (`CChar`) or item (`CItem`) instance.
- **Persistence**: **Saved to disk** in `sphereworld.scp` or `spherechars.scp` under the object's section.
- **Tag vs Tag0**: `tag.X` returns empty string if undefined; `tag0.X` returns `0` if undefined (ideal for numeric checks).
- `<dtag0.X>` forces decimal evaluation.

---

## `ctag.X` / `ctag0.X` — Client Session Tags (Non-Persistent)

```scp
ctag.SelectedMenuPage = 2
ctag.CraftingCategory = Swords
```

- **Scope**: Bound to a character or client.
- **Persistence**: **NOT saved to disk**. Cleared when the client disconnects or the server restarts.
- **Use Case**: Gump navigation state, temporary combat cooldowns, confirmation dialog flags.

---

## `var.X` / `var0.X` — Global Server Variables

```scp
// Setting global variables:
var.EventActive = 1
var.CurrentChampion = Sir Lancelot
var.JackpotPool = 50000

// Reading global variables anywhere:
if (<var0.EventActive> == 1)
    sysmessage The event is live! Current Champion: <var.CurrentChampion>
endif
```

- **Scope**: Server-wide global namespace (`g_ExprGlobals.m_VarGlobals`). Accessible from any script, trigger, or function across all objects.
- **Persistence**: **Saved to disk** in `sphereworld.scp` under the `[GLOBALS]` section upon server save (`SERV.SAVE`).
- **`<var.X>` vs `<var0.X>`**: `<var.X>` returns empty string if undefined; `<var0.X>` returns `0` if undefined.
- **`<dvar.X>`**: Evaluates and formats the variable as a decimal number.
- **Console Inspection**:
  ```scp
  serv.varlist       // Dumps all global variables to console
  serv.varlist log   // Dumps all global variables to log file
  ```

---

## `serv.list.X` / `list.X` — Global Dynamic Lists (Arrays)

Source-X provides high-performance dynamic lists (`CListDefMap` / `CListDefCont`) backed by `std::deque` for storing ordered sequences of numbers or strings.

```scp
// Creating and populating lists:
serv.list.ActiveMinigames.add MiningMania
serv.list.ActiveMinigames.add DungeonRush
serv.list.ActiveMinigames.add ArenaPvP

// Setting multiple comma-separated entries at once:
serv.list.HighScores.set 1500, 1200, 950, 800

// Appending multiple comma-separated entries:
serv.list.HighScores.append 650, 400
```

### List Query Syntax

| Query Syntax | Return Value | Example |
| :--- | :--- | :--- |
| `<serv.list.NAME>` | Formatted string containing all elements enclosed in `{ }` | `{"MiningMania","DungeonRush","ArenaPvP"}` |
| `<serv.list.NAME.N>` | Element at 0-based index `N` | `<serv.list.ActiveMinigames.0>` → `"MiningMania"` |
| `<serv.list.NAME.count>` | Total number of elements in the list | `<serv.list.ActiveMinigames.count>` → `3` |
| `<serv.list.NAME.findelem VAL>` | 0-based index of element matching `VAL`, or `-1` if not found | `<serv.list.ActiveMinigames.findelem DungeonRush>` → `1` |
| `<serv.list.NAME.N.findelem VAL>` | Searches for `VAL` starting from index `N` | `<serv.list.HighScores.2.findelem 800>` |

### List Mutation Verbs

| Verb Syntax | Operation Description |
| :--- | :--- |
| `serv.list.NAME = VAL` | Clears list and initializes it with single element `VAL` |
| `serv.list.NAME.add VAL` | Pushes element `VAL` to the end of the list |
| `serv.list.NAME.set V1, V2, ...` | Clears list and populates with comma-separated elements |
| `serv.list.NAME.append V1, V2, ...` | Appends comma-separated elements to the end of the list |
| `serv.list.NAME.N = VAL` | Overwrites the element at 0-based index `N` with `VAL` |
| `serv.list.NAME.N.insert VAL` | Inserts `VAL` at index `N`, shifting subsequent elements right |
| `serv.list.NAME.N.remove` | Deletes the element at index `N` |
| `serv.list.NAME.clear` | Deletes the entire list from memory |
| `serv.list.NAME.sort [type]` | Sorts the list. Types: `asc` (default), `desc`, `iasc` (case-insensitive), `idesc` |

### Server List Administration Verbs

```scp
serv.printlists        // Dumps all global lists and their contents to console
serv.printlists log    // Dumps all global lists to log file
serv.clearlists        // Deletes all lists across the server
serv.clearlists arena* // Deletes only lists matching the mask "arena*"
```

---

## Native Dictionaries (`JTAG`, `JLOCAL`, `SERV.JTAG`)

Source-X features built-in dictionary / hashmap collections (`CDictionaryMap`) providing $O(1)$ key-value lookup and manipulation with case-insensitive keys.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SPHEREX DICTIONARY SCOPES                       │
├──────────────────┬───────────────────────┬─────────────────────────────┤
│ Scope Prefix     │ Storage Target        │ Persistence & Lifecycle     │
├──────────────────┼───────────────────────┼─────────────────────────────┤
│ JTAG.dict.key    │ CObjBase (Char/Item)  │ Persists to worldsave files │
│ JLOCAL.dict.key  │ CScriptTriggerArgs    │ Cleared on function exit    │
│ SERV.JTAG.dict.key│ CExprGlobals         │ Persists to [GLOBALS]       │
└──────────────────┴───────────────────────┴─────────────────────────────┘
```

### 1. Object Dictionaries (`JTAG`)
Stores structured key-value maps directly on characters or items. Persists across server restarts in `sphereworld.scp`.

```scp
// Writing to character object dictionary:
src.jtag.combat_stats.crits = 15
src.jtag.combat_stats.dodges = 8
src.jtag.combat_stats.total_damage = 4520

// Reading:
sysmessage Critical hits: <dsrc.jtag.combat_stats.crits>
```

### 2. Execution Stack Dictionaries (`JLOCAL`)
Provides structured temporary maps for complex script logic, loot generation, or dialog builders without polluting the global scope or leaking memory.

```scp
[FUNCTION f_calculate_loot_drop]
jlocal.loot.gold = 500
jlocal.loot.gems = 12
jlocal.loot.special_scroll = s_flamestrike

if (<jlocal.loot.gold> > 100)
    serv.newitem i_gold, <jlocal.loot.gold>, <src.findlayer.21.uid>
endif
// jlocal.loot is automatically freed when f_calculate_loot_drop finishes!
```

### 3. Global Server Dictionaries (`SERV.JTAG`)
Stores server-wide structured configuration and dynamic tables. Persists automatically in `sphereworld.scp` under `[GLOBALS]`.

```scp
// Setting global configuration maps:
serv.jtag.shard_config.motd = Welcome to UO Ascension!
serv.jtag.shard_config.pvp_enabled = 1
serv.jtag.shard_config.exp_multiplier = 2

// Querying:
if (<serv.jtag.shard_config.pvp_enabled> == 1)
    sysmessage PvP is active!
endif
```

### Native Dictionary Methods

All three scopes (`JTAG`, `JLOCAL`, `SERV.JTAG`) support Python-like dictionary operations:

| Method / Property | Return Type | Description | Example |
| :--- | :---: | :--- | :--- |
| `<dict.COUNT>` | Integer | Number of key-value pairs stored in the dictionary | `<src.jtag.combat_stats.COUNT>` |
| `<dict.ISEMPTY>` | Boolean (`0`/`1`) | `1` if dictionary has 0 keys, `0` otherwise | `<jlocal.loot.ISEMPTY>` |
| `<dict.HASKEY key>` | Boolean (`0`/`1`) | `1` if `key` exists in the dictionary, `0` otherwise | `<serv.jtag.config.HASKEY motd>` |
| `<dict.KEYS>` | String | Comma-separated list of all keys in the dictionary | `<src.jtag.combat_stats.KEYS>` → `crits,dodges,total_damage` |
| `<dict.VALUES>` | String | Comma-separated list of all values in the dictionary | `<src.jtag.combat_stats.VALUES>` → `15,8,4520` |
| `dict.REMOVE key` / `DELETE key` | Verb | Deletes specific key from dictionary | `src.jtag.combat_stats.REMOVE crits` |
| `dict.CLEAR` | Verb | Wipes all entries in the dictionary | `src.jtag.combat_stats.CLEAR` |

---

## `ref1` … `ref65535` — Object References

```scp
ref1 = <src.uid>
ref2 = <src.findlayer.21.uid>

<ref1.name> says hello!
ref2.color = 044
```

- **Scope**: Temporary object pointer index (1 through 65535).
- **Validation**: Always verify `<ref1.isvalid>` before accessing properties on unverified references to avoid runtime errors.

---

## `argn*`, `args`, `argo`, `argv` — Trigger & Function Arguments

| Variable | Type | In/Out | Description |
| :--- | :--- | :---: | :--- |
| `argn` / `argn1` | Integer | IN / OUT | First numerical argument of the trigger or function |
| `argn2` | Integer | IN / OUT | Second numerical argument (e.g. damage type flags) |
| `argn3` | Integer | IN / OUT | Third numerical argument (e.g. spell or skill info) |
| `args` | String | IN / OUT | String argument passed to trigger or function |
| `argo` | Object UID | IN / OUT | Context-dependent game object (dropped item, target entity) |
| `argv[N]` | String/Int | IN | N-th 0-based token from comma-separated `args` parameter list |

---

## `def.*` vs `resdef.*` — Constants & Resource Definitions

```scp
[DEFNAME server_tuning]
max_level       100
default_hue     0481

// Accessing:
local.max = <def.max_level>          // Returns "100"
local.itemid = <resdef.i_gold>       // Returns integer resource ID of i_gold
```

- `<def.SYMBOL>`: Retrieves string constant declared in `[DEFNAME]`.
- `<def0.SYMBOL>`: Retrieves the first token/word of the constant.
- `<resdef.SYMBOL>`: Retrieves the internal numeric resource ID of an item, character, or spell definition.

---

## Common Scope Pitfalls & Best Practices

### 1. Arithmetic requires `<eval>`
```scp
// ❌ WRONG: Performs string concatenation "10+5"
tag.count = <tag.count>+5

// ✅ CORRECT: Evaluates mathematical expression
tag.count = <eval <tag.count> + 5>
```

### 2. Dynamic Keys require `<dlocal.*>` / `<dtag0.*>`
```scp
// ❌ WRONG: Evaluates token literally inside key
tag0.quest.<local.step>.status = 1

// ✅ CORRECT: Formats as decimal integer first
tag0.quest.<dlocal.step>.status = 1
```

### 3. Choosing the Right Storage Mechanism

| Scenario | Recommended Type | Rationale |
| :--- | :--- | :--- |
| Quest progress on a player | `tag0.X` or `jtag.quest.X` | Must persist across restarts and logout. |
| Temporary math calculation in trigger | `local.X` or `jlocal.math.X` | Fast, clean, automatically garbage collected. |
| Global server event state & timer | `var0.X` or `serv.jtag.event.X` | Accessible from every script; saved to `sphereworld.scp`. |
| Queue of waiting tournament players | `serv.list.TourneyQueue` | Requires ordered indexing, insertion, and sorting. |
| Complex multi-field entity data | `jtag.entity_data.X` | Grouped key-value mapping with dictionary methods (`KEYS`, `HASKEY`). |

