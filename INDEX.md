# SphereScript Language Reference — Index

> **Source**: SphereServer X (Source-X)  
> **Original Reference**: [SphereWiki](https://wiki.spherecommunity.net/index.php?title=Main_Page)  
> **Changelog**: [Source-X/Changelog.txt](../Source-X/Changelog.txt)

This is the complete SphereScript language reference for SphereServer X. It documents every section block, trigger, variable, keyword, flag and operator available in SphereScript as of version X1+.

---

## 📖 Language Reference

| Doc | Content |
| --- | --- |
| [00 — Overview](language/00-overview.md) | What is SphereScript, version history, file encoding |
| [01 — File Structure](language/01-file-structure.md) | `.scp` file anatomy, sections, comments, VERSION, EOF |
| [02 — Section Blocks](language/02-section-blocks.md) | All `[BLOCK]` types and their roles |
| [03 — Triggers](language/03-triggers.md) | `ON=@Event` system, trigger call order, return values |
| [04 — Variables, Lists & Dictionaries](language/04-variables.md) | `local`, `tag`, `ctag`, `var`, `list`, `jtag`, `jlocal`, `serv.jtag`, `ref`, `argo`, `argn`, `args`, `def` |
| [05 — Operators & Expressions](language/05-operators-expressions.md) | `<eval>`, `<feval>`, `<muldiv>`, `<qval>`, `<r>`, string ops |
| [06 — Control Flow](language/06-control-flow.md) | `if/elif/else/endif`, `for`, `while`, `forcont`, `doswitch` |
| [07 — Functions](language/07-functions.md) | `[FUNCTION]` blocks, `argv`, `return`, calling conventions |
| [08 — Object References](language/08-objects.md) | `src`, `act`, `argo`, `new`, `uid.X`, `ref1-5`, `link` |
| [09 — Return Values](language/09-return-values.md) | `return 0/1/2` semantics, trigger-specific meanings |

---

## 🧱 Section Block Reference

| Block | Doc |
| --- | --- |
| `[ITEMDEF i_*]` | [sections/ITEMDEF.md](sections/ITEMDEF.md) |
| `[CHARDEF c_*]` | [sections/CHARDEF.md](sections/CHARDEF.md) |
| `[FUNCTION f_*]` | [sections/FUNCTION.md](sections/FUNCTION.md) |
| `[EVENTS e_*]` | [sections/EVENTS.md](sections/EVENTS.md) |
| `[TYPEDEF t_*]` | [sections/TYPEDEF.md](sections/TYPEDEF.md) |
| `[DEFNAME ...]` | [sections/DEFNAME.md](sections/DEFNAME.md) |
| `[DIALOG d_*]` | [sections/DIALOG.md](sections/DIALOG.md) |
| `[TEMPLATE t_*]` | [sections/TEMPLATE.md](sections/TEMPLATE.md) |
| `[SKILL skill_*]` | [sections/SKILL.md](sections/SKILL.md) |
| `[SPELL s_*]` | [sections/SPELL.md](sections/SPELL.md) |
| `[MULTI 0x*]` | [sections/MULTI.md](sections/MULTI.md) |
| Multi Storage (Houses & Ships) | [sections/MULTI-CONTAINERS.md](sections/MULTI-CONTAINERS.md) |
| `[REGIONTYPE r_*]` | [sections/REGIONTYPE.md](sections/REGIONTYPE.md) |
| `[REGIONRESOURCE]` | [sections/REGIONRESOURCE.md](sections/REGIONRESOURCE.md) |
| `[NAMES]` | [sections/NAMES.md](sections/NAMES.md) |
| `[PLEVEL N]` | [sections/PLEVEL.md](sections/PLEVEL.md) |
| `[AREADEF]` / `[ROOMDEF]` | [sections/AREADEF.md](sections/AREADEF.md) |
| `[SPAWN]` | [sections/SPAWN.md](sections/SPAWN.md) |
| `[SKILLMENU]` / `[SKILLCLASS]` | [sections/SKILL.md](sections/SKILL.md) |

---

## ⚡ Trigger Catalog

| Category | Doc |
| --- | --- |
| Char triggers | [triggers/char-triggers.md](triggers/char-triggers.md) |
| Item triggers | [triggers/item-triggers.md](triggers/item-triggers.md) |
| Skill triggers | [triggers/skill-triggers.md](triggers/skill-triggers.md) |
| Spell triggers | [triggers/spell-triggers.md](triggers/spell-triggers.md) |
| Region triggers | [triggers/region-triggers.md](triggers/region-triggers.md) |
| Server / global triggers | [triggers/server-triggers.md](triggers/server-triggers.md) |
| Dialog triggers | [triggers/dialog-triggers.md](triggers/dialog-triggers.md) |
| TYPEDEF triggers | [triggers/typedef-triggers.md](triggers/typedef-triggers.md) |

---

## 🔑 Keyword & Action Verbs Reference

| Object / System | Doc |
| --- | --- |
| Base Objects (`CObjBase.*`) | [keywords/objbase-functions.md](keywords/objbase-functions.md) |
| Characters (`CHAR.*` / `CChar.*`) | [keywords/char-properties.md](keywords/char-properties.md) • [keywords/char-functions.md](keywords/char-functions.md) |
| Items (`ITEM.*` / `CItem.*`) | [keywords/item-properties.md](keywords/item-properties.md) • [keywords/item-functions.md](keywords/item-functions.md) |
| Client Sockets (`CClient.*`) | [keywords/client-functions.md](keywords/client-functions.md) |
| Map Sectors (`SECTOR.*`) | [keywords/sector-functions.md](keywords/sector-functions.md) |
| Adventuring Parties (`PARTY.*`) | [keywords/party-functions.md](keywords/party-functions.md) |
| Guild & Town Stones (`STONE.*`) | [keywords/stone-functions.md](keywords/stone-functions.md) |
| Global Verbs & Evaluators (`CScriptObj`) | [keywords/scriptobj-functions.md](keywords/scriptobj-functions.md) |
| Server (`SERV.*`) | [keywords/serv-properties.md](keywords/serv-properties.md) |
| Regions (`REGION.*`) | [keywords/region-properties.md](keywords/region-properties.md) |
| Accounts (`ACCOUNT.*`) | [keywords/account-properties.md](keywords/account-properties.md) |
| File I/O (`FILE.*`) | [keywords/file-object.md](keywords/file-object.md) |

---

## 🏳️ Flags & Bitmasks

| Flag group | Doc |
| --- | --- |
| ATTR flags (items) | [flags/attr-flags.md](flags/attr-flags.md) |
| STATF flags (chars) | [flags/stat-flags.md](flags/stat-flags.md) |
| CAN flags (chars — MT_*) | [flags/can-flags.md](flags/can-flags.md) |
| CAN_I flags (items) | [flags/can-i-flags.md](flags/can-i-flags.md) |
| COMBAT flags | [flags/combat-flags.md](flags/combat-flags.md) |
| MAGIC flags | [flags/magic-flags.md](flags/magic-flags.md) |
| SPELL flags | [flags/spell-flags.md](flags/spell-flags.md) |
| REGION flags | [flags/region-flags.md](flags/region-flags.md) |
| SKILL flags (SKF_*) | [flags/skill-flags.md](flags/skill-flags.md) |
| NPC AI flags | [flags/npc-ai-flags.md](flags/npc-ai-flags.md) |
| DAM flags (damage types) | [flags/dam-flags.md](flags/dam-flags.md) |
| MEMORY flags | [flags/memory-flags.md](flags/memory-flags.md) |
| LAYER definitions | [flags/layers.md](flags/layers.md) |
| PRIV flags | [flags/priv-flags.md](flags/priv-flags.md) |
| TILE flags | [flags/tile-flags.md](flags/tile-flags.md) |
| RACIAL flags | [flags/racial-flags.md](flags/racial-flags.md) |
| OPTION flags (OF_*) | [flags/option-flags.md](flags/option-flags.md) |
| EXPERIMENTAL flags (EF_*) | [flags/experimental-flags.md](flags/experimental-flags.md) |

---

## ⚙️ sphere.ini Reference

| Doc | Content |
| --- | --- |
| [sphere-ini/README.md](sphere-ini/README.md) | Overview, structure, loading order |
| [sphere-ini/core-settings.md](sphere-ini/core-settings.md) | Network, world, performance settings |
| [sphere-ini/features-flags.md](sphere-ini/features-flags.md) | Features=, FeaturesLogin=, FeaturesExtra= |
| [sphere-ini/combat-magic.md](sphere-ini/combat-magic.md) | CombatFlags=, MagicFlags=, ParryFlags= |
| [sphere-ini/engine-flags.md](sphere-ini/engine-flags.md) | EngineVirtues=, EngineInsurance=, EngineBulkOrders= |
| [sphere-ini/resources-maps.md](sphere-ini/resources-maps.md) | Map sizes, mul/uop paths, resource definitions |

---

## 🌐 Network Packets Reference

| Doc | Content |
| --- | --- |
| [packets/README.md](packets/README.md) | Overview of network protocol, packet types, and byte order |
| [packets/standard-packets.md](packets/standard-packets.md) | Standard packets (`0x00` - `0xFF`), byte layouts & handlers |
| [packets/extended-bf-packets.md](packets/extended-bf-packets.md) | Extended `0xBF` subcommands (Party, Tooltips, Macros, Precast) |
| [packets/encoded-d7-packets.md](packets/encoded-d7-packets.md) | Encoded `0xD7` subcommands (Custom Housing, Special Moves) |

---

## 📜 Changelog Reference

| Version | Doc |
| --- | --- |
| 0.51–0.54 | [changelog/v051-v054.md](changelog/v051-v054.md) |
| 0.55 | [changelog/v055.md](changelog/v055.md) |
| 0.56b pre-release highlights | [changelog/v056b-highlights.md](changelog/v056b-highlights.md) |
| 0.56c pre-release highlights | [changelog/v056c-highlights.md](changelog/v056c-highlights.md) |
| X branch (current) | [changelog/vX-current.md](changelog/vX-current.md) |

---

## 🤖 Agent Guidelines & Specialized Skills

| Section / Skill | Description |
| --- | --- |
| [agent-guidelines/README.md](agent-guidelines/README.md) | Overview of agent architecture and rules |
| **[agent-guidelines/skills/](agent-guidelines/skills/README.md)** | **Directory of all specialized development, scripting & doc skills** |
| ↳ [sphereserver-scripting-lang](agent-guidelines/skills/sphereserver-scripting-lang/SKILL.md) | Definitive SphereScript reference, quality standards, triggers & invariants |
| ↳ [sphereserver-docs-maintenance](agent-guidelines/skills/sphereserver-docs-maintenance/SKILL.md) | Audit & synchronization workflow for documentation |
| ↳ [cpp-pro](agent-guidelines/skills/cpp-pro/SKILL.md) | Modern C++20/23, template metaprogramming & SIMD |
| ↳ [cpp-coding-standards](agent-guidelines/skills/cpp-coding-standards/SKILL.md) | C++ Core Guidelines & RAII safety standards |
| ↳ [cpp-header-inclusion](agent-guidelines/skills/cpp-header-inclusion/SKILL.md) | Topological header inclusion layering rules |
| ↳ [cpp-static-thread-safety](agent-guidelines/skills/cpp-static-thread-safety/SKILL.md) | Clang static thread safety annotations |
| ↳ [sphereserver-crossplatform](agent-guidelines/skills/sphereserver-crossplatform/SKILL.md) | Cross-platform CMake builds (Windows/Linux/ARM) |
| ↳ [sphereserver-game-systems](agent-guidelines/skills/sphereserver-game-systems/SKILL.md) | Core C++ objects, tick loops & memory architecture |

---

## 🛠️ Developer Tools & Extensions

| Tool | Location | Description |
| --- | --- | --- |
| **SphereScript VS Code Extension** | [vscode-plugin/spherescript-scripter/](vscode-plugin/spherescript-scripter/) | Syntax highlighter, formatter, and snippets for VS Code |

---

## 🎖️ Credits & Acknowledgements

- **[CREDITS.md](CREDITS.md)** — Complete recognition and credits to Gray (Menace), core developers, the Sphere Community, wiki authors, and syntax pioneers.
