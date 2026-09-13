# SphereScript — Overview

> **Source-X version**: X1+  
> **Reference**: [SphereWiki](https://wiki.spherecommunity.net/index.php?title=Main_Page)  
> **Changelog**: see [`../../Source-X/Changelog.txt`](../../../Source-X/Changelog.txt) and [`../changelog/`](../changelog/README.md)

---

## What is SphereScript?

**SphereScript** is the scripting language embedded in SphereServer (and its fork **Source-X**), the server emulator for *Ultima Online*. It is a line-oriented, interpreted language with:

- **No strict types** — all values are strings internally; numeric interpretation is on-demand.
- **Object-oriented access** — every game entity (char, item, region, server) exposes properties and verbs through dot notation.
- **Event-driven execution** — scripts react to engine events via `ON=@TriggerName` blocks.
- **Section-based files** — `.scp` files are structured as `[SECTION_TYPE identifier]` blocks.

SphereScript is **not** a general-purpose language. It is designed specifically to extend SphereServer behavior without modifying C++ source code.

---

## Version History

| Branch | Key changes |
| --- | --- |
| **0.51–0.54** | Original Sphere scripting (ITEMDEF, CHARDEF, basic triggers) |
| **0.55** | EVENTS sections, TYPEDEF, extended trigger set, FILE object |
| **0.56a–0.56d** | DIALOG (gumps), SPAWN, REGIONRESOURCE, MULTIDEF, extended flags |
| **X1 (Source-X)** | Lazy `IF` evaluation, `TRY`, `RESDEF` vs `DEF`, `RESOURCEINDEX`, strict object validity, `REFx` invalid access errors, `ISVALID`, many new triggers |
| **X1+ (ongoing)** | `ModMaxHits/Mana/Stam`, new combat/magic flags, EF_* flags, `@ClientTooltip` changes, `SPEECHCOLOROVERRIDE`, etc. |

> See [`../changelog/`](../changelog/README.md) for the full version-by-version list of scripting-relevant changes.

---

## File Format

SphereScript files use the `.scp` extension. Key rules:

- **Encoding**: ANSI / Latin-1 (ISO-8859-1). UTF-8 may cause issues with non-ASCII characters in item names, NPC speech, etc.
- **Line endings**: CRLF (Windows) or LF (Linux/macOS) — both accepted.
- **Comments**: `//` to end of line. No block comments.
- **Case insensitivity**: Keywords and property names are case-insensitive. `ITEMDEF`, `itemdef`, `ItemDef` are equivalent.
- **Whitespace**: Tabs or spaces for indentation. The parser ignores leading whitespace.
- **Continuation**: No explicit line continuation character — each statement is one line.

---

## Relationship to C++ Core

SphereScript can **read and modify** the internal state of C++ objects through exposed properties and verbs. Some properties are **read-only** (R), some **write-only** (W), most are **read-write** (R/W).

When a trigger `return 1` cancels an action, it directly prevents the corresponding C++ code from executing. This is the primary mechanism for overriding hardcoded behavior.

> **Important**: Sphere executes scripts synchronously on the game tick. Long loops or infinite recursion will freeze the server.

---

## Script Loading Order

Scripts are declared in `spheretables.scp` (in the `[RESOURCES]` section). Loading order matters:
1. `DEFNAME` blocks (constants) should load before code that references them.
2. `ITEMDEF`/`CHARDEF` definitions should load before templates and events that reference them.
3. `EVENTS` and `TYPEDEF` can be forward-referenced as long as they load before first use at runtime.

Global events are declared in `sphere.ini`:
```
EventsPlayer=e_SomePlayerEvent,e_AnotherEvent
EventsPet=e_NPCGeneric,e_NPCQuest
EventsItem=e_SomeItemEvent
EventsRegion=e_SomeRegionEvent
```

---

## Encoding Best Practice

- `.scp` files: **ANSI / Latin-1** (ISO-8859-1) — standard for non-ASCII characters in player-facing speech/names.
- `.md` documentation files: **UTF-8**.
- Never mix encodings within a single `.scp` file.
