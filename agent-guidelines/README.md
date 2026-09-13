# Agent Guidelines & Skills Reference

> Architectural rules, invariants, and specialized skill packages for AI agents and scripters developing, refactoring, and maintaining SphereServer X and SphereScript.

---

## 📚 Core Documents

| Guide | Description |
| :--- | :--- |
| **[`scripting-agent-guide.md`](scripting-agent-guide.md)** | Comprehensive engineering standards and idiom rules for AI agents writing `.scp` code. |
| **[`vscode-plugin-spec.md`](vscode-plugin-spec.md)** | Syntax grammar, snippets, and tooling specification for the SphereScript VS Code extension. |

---

## 🧠 Specialized Skills Catalog (`skills/`)

All specialized skills for development, scripting, and documentation are located in **[`skills/`](skills/README.md)**:

### ⚙️ C++ Core Development
- **[`skills/cpp-pro/`](skills/cpp-pro/SKILL.md)** — Modern C++20/23, template metaprogramming, SIMD, and performance optimization.
- **[`skills/cpp-coding-standards/`](skills/cpp-coding-standards/SKILL.md)** — C++ Core Guidelines, RAII, and type safety standards.
- **[`skills/cpp-header-inclusion/`](skills/cpp-header-inclusion/SKILL.md)** — Topological header inclusion layering rules.
- **[`skills/cpp-static-thread-safety/`](skills/cpp-static-thread-safety/SKILL.md)** — Clang static thread safety annotations (`GUARDED_BY`, etc.).
- **[`skills/sphereserver-crossplatform/`](skills/sphereserver-crossplatform/SKILL.md)** — Cross-platform CMake builds and CI orchestration.
- **[`skills/sphereserver-game-systems/`](skills/sphereserver-game-systems/SKILL.md)** — Core C++ game architecture (`CObjBase`, `CChar`, `CItem`, `CItemMemory`, sectors, ticks).

### 📜 SphereScript Scripting
- **[`skills/sphereserver-scripting-lang/`](skills/sphereserver-scripting-lang/SKILL.md)** — Definitive SphereScript reference, trigger flows, pointers, and Source-X invariants.

### 📖 Documentation Maintenance
- **[`skills/sphereserver-docs-maintenance/`](skills/sphereserver-docs-maintenance/SKILL.md)** — Audit, synchronization, and update workflows for `SphereWiki-X`.
