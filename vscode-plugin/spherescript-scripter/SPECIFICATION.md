# VS Code SphereScript Extension Specification

> Technical specification for the SphereScript extension (`spherescript-scripter`), edited by **RayIde** and the Sphere Community, providing syntax highlighting, code snippets, bracket matching, and trigger autocompletion for SphereServer X.

---

## Extension Architecture

- **Identifier**: `spherescript-scripter`
- **Publisher**: `SphereCommunity`
- **Author / Last Editor**: **RayIde**
- **Language ID**: `spherescript`
- **File Extensions**: `.scp`, `.dic`
- **Grammar Format**: TextMate JSON (`syntaxes/spherescript.tmLanguage.json`)
- **Location**: `SphereWiki-X/vscode-plugin/spherescript-scripter/`

---

## Token Highlighting Rules

1. **Section Headers**: `^\[([A-Za-z0-9_]+)(\s+[^\]]+)?\]$` → `entity.name.section.spherescript`
2. **Triggers**: `^\s*ON\s*=\s*@?([A-Za-z0-9_]+)` → `entity.name.function.trigger.spherescript`
3. **Control Flow Keywords**: `\b(if|elif|else|endif|for|endfor|while|enddo|doswitch|return)\b` → `keyword.control.spherescript`
4. **Core Verbs & Functions**: `\b(serv|uid|src|argo|act|new|ref[1-5]|bounce|equip|unequip|remove|sysmessage|say|emote|sdialog|dialogclose|effect|sound|anim|go)\b` → `support.function.spherescript`
5. **Expression Macros**: `<([^>]+)>` → `meta.expression.spherescript`
6. **Comments**: `//.*$` → `comment.line.double-slash.spherescript`
7. **Numbers & Hex**: `\b0[xX][0-9a-fA-F]+\b|\b\d+\b` → `constant.numeric.spherescript`

---

## Snippets Catalog

- `itemdef`: Full item definition template.
- `chardef`: Monster / NPC template.
- `func`: Procedural function block with args.
- `events`: Modular event collection.
- `typedef`: Type definition template with triggers.
- `dialog`: Layout, Text, and Button gump scaffold.
- `forcont`: Container iteration loop.
