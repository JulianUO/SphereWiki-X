# SphereScript — File Structure

> Every SphereScript file (`.scp`) follows a consistent section-based format.

---

## Anatomy of a `.scp` File

```
// Optional header comment
VERSION=X1

[SECTIONTYPE identifier]
Property1 = value
Property2 = value

ON=@TriggerName
    // trigger code
    return 0

[SECTIONTYPE identifier2]
// ...

[EOF]
```

### Required Elements

| Element | Required | Notes |
| --- | --- | --- |
| `VERSION=X1` | Recommended | Tells the parser the script targets Source-X. Must appear before the first section. |
| `[SECTIONTYPE id]` | Yes | At least one section block. |
| `[EOF]` | **Yes** | Every file **must** end with `[EOF]`. Missing it causes the parser to silently skip content. |

---

## Comments

```scp
// This is a comment — everything after // is ignored.
Property = value  // Inline comment also valid.
```

- No multi-line block comments (`/* */` style does not exist).
- `[COMMENT ...]` is a special section type that the parser ignores entirely:

```scp
[COMMENT FIXME_old_loot]
// Everything here is ignored, including "Properties" and triggers.
BUG_DATA = 1234
```

---

## Section Blocks

A section starts with `[TYPE identifier]` and ends when the next `[TYPE ...]` begins, or at `[EOF]`.

```scp
[ITEMDEF i_sword]
NAME=Sword
WEIGHT=50
...

[ITEMDEF i_shield]
NAME=Shield
...

[EOF]
```

> **No closing tag needed.** The start of the next section terminates the current one.

### Section Identifier Format

- `i_*` — items (`[ITEMDEF i_gold]`)
- `c_*` — chars (`[CHARDEF c_orc]`)
- `f_*` — functions (`[FUNCTION f_myFunc]`)
- `e_*` — events (`[EVENTS e_PlayerQuest]`)
- `t_*` — typedef or template (`[TYPEDEF t_door]`, `[TEMPLATE t_loot_orc]`)
- `d_*` — dialog (`[DIALOG d_MainMenu]`)
- `s_*` — spell (`[SPELL s_fireball]`)
- `r_*` — region type (`[REGIONTYPE r_dungeon]`)
- `skill_*` — skill override (`[SKILL skill_magery]`)
- `0x*` — hex identifier for multis (`[MULTI 0x4000]`)
- Named — defnames, regions, spawn groups: `[DEFNAME myflagset]`, `[AREADEF britain]`

---

## Property Assignment

```scp
NAME = My Item Name        // String value
WEIGHT = 100               // Numeric value
COLOR = 0x44               // Hex numeric value
FLAGS = 00001 | 00004      // Bitwise OR composition
TAG.MyCustomProp = Hello   // Custom tag
```

- **No quotes** around string values.
- **Hex values** use `0x` prefix or raw octal/hex without prefix depending on context.
- **Bitmasks** use `|` for OR composition: `ATTR = attr_magic | attr_blessed`.
- Assignments in a definition section (`[ITEMDEF]`, `[CHARDEF]`) set the **template defaults**.
  Runtime changes use the same property names but executed as verbs in trigger code.

---

## Trigger Blocks Inside Sections

Within any definition or events section, triggers are declared with `ON=@EventName`:

```scp
[ITEMDEF i_my_item]
NAME = My Item

ON=@Create
    // Fires when an instance of this item is created
    COLOR = 0x44

ON=@DClick
    // Fires when a player double-clicks this item
    SRC.SYSMESSAGE Hello!
    return 1  // Cancel default action
```

Multiple triggers of the same type within one section are **not** supported — only the last one is used. Use `[EVENTS e_*]` sections to compose behaviors.

---

## The `[PLEVEL N]` Prefix

```scp
[PLEVEL 7]
f_onserver_start
f_onserver_exit
f_onserver_save
```

`[PLEVEL N]` defines the **minimum privilege level** required to call the listed functions from the GM console (`.function_name`). Levels range from 0 (player) to 7 (owner). This section does **not** contain trigger code — it only lists function names.

---

## The `VERSION` Header

```scp
VERSION=X1
```

- Signals to Source-X parser that this is an X-branch script.
- Enables lazy `IF` evaluation, `TRY` keyword, `RESDEF` semantics, and strict object access errors.
- Without it, some X1-specific behaviors may differ.
- **Always include `VERSION=X1`** at the top of any new `.scp` file.

---

## File Organization in `spheretables.scp`

```scp
[RESOURCES]
scripts/core/sphere_defs.scp
scripts/core/sphere_defs_sphere.scp
scripts/core/sphere_defs_types.scp
// ... more files in dependency order
```

- `[RESOURCES]` lists all `.scp` files to load, **in order**.
- `DEFNAME` files must come before any scripts that use those constants.
- Folder-level wildcards are NOT supported — each file must be listed explicitly.
- The path is relative to the server executable directory.
