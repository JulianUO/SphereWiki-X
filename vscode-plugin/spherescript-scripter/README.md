# SphereScript Extension for Visual Studio Code

Modern, full-featured SphereScript language support for Visual Studio Code, optimized for **SphereServer X (Source-X)** and the broader SphereServer scripting community.

---

## Features

- **Full Syntax Highlighting**: Comprehensive TextMate grammar covering all `[SECTION]` blocks (`ITEMDEF`, `CHARDEF`, `FUNCTION`, `EVENTS`, `TYPEDEF`, `DIALOG`, etc.), `ON=@Triggers`, engine keywords, bitmasks, intrinsic evaluators (`eval`, `muldiv`, `qval`, `between`), and macros (`<...>`).
- **Code Snippets**: Fast scaffold templates for `itemdef`, `chardef`, `func`, `events`, `typedef`, `dialog`, `forcont`, and `if/elif/else` blocks.
- **Smart Auto-Formatting**: Automatic indentation formatting respecting SphereServer indentation conventions.
- **Source-X Invariants**: Full support for modern Source-X keywords (`isvalid`, `RESDEF`, `TRY`, `MODMAXHITS`, `FLOATVAL`, `BCRYPTHASH`, etc.).

---

## Installation

1. Clone or copy the `spherescript-scripter` directory to your VS Code extensions folder:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\spherescript-scripter`
   - **Linux / macOS**: `~/.vscode/extensions/spherescript-scripter`
2. Restart or reload Visual Studio Code.
3. Open any `.scp` or `.dic` script file.

---

## 🎖️ Credits & Acknowledgements

This extension is maintained by the community and builds upon decades of passionate development, tooling, and syntax definitions:

### VS Code Extension Authors & Maintainers
- **RayIde** — Author and principal maintainer/editor who designed, consolidated, and maintained this VS Code extension package for modern Sphere scripting.
- **Sphere Community Contributors** — Scripters and developers who contributed syntax patterns and snippet templates.

### Original Engine Creators & Core Developers
- **Gray (Menace)** — Original creator and visionary behind SphereServer (originally GrayWorld / TUS).
- **Core Developers & Maintainers**: Shadowalker, Ran, Kell, Furio, Khaos, Nazghul, Cesar, Ben, Ellessar, XuGar, Coruja, and the Sphere Community contributors who maintained and evolved the engine across versions 0.51 through 0.56 and the modern Source-X branch.

### Original SCP Syntax & Tooling Pioneers
- **Sphere Community Scripters & Tool Authors**: Special tribute to the creators of the original TextMate, Sublime Text, UltraEdit, Notepad++, and early VS Code syntax packages (`scp.tmbundle`, `vscode-spherescript`, and community grammars by Braker, Gim-Zu, ShiryuX, m0nkey_d_luffy, and countless shard developers).

### Documentation & Wiki Contributors
- **The SphereWiki Team**: Contributors to `wiki.spherecommunity.net` whose extensive documentation and tutorials established the foundation of SphereScript reference.
