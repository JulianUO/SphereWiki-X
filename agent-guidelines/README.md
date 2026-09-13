# Agent Guidelines & Specialized Skills Reference

> Architectural rules, invariants, and specialized skill packages for AI agents and scripters developing, refactoring, and maintaining SphereServer X and SphereScript.

---

## 🧠 Specialized Skills Catalog (`skills/`)

All specialized skills for development, scripting, and documentation are organized directly inside **[`skills/`](skills/README.md)**:

### 📜 SphereScript Scripting
- **[`skills/sphereserver-scripting-lang/`](skills/sphereserver-scripting-lang/SKILL.md)** — Definitive SphereScript reference, trigger flows, object pointers (`SRC`, `ARGO`, `ACT`, `NEW`, `REF1..5`, `HOLD`, `MOVINGCRATE`), memory models, dynamic tags, decimal coercion, and Source-X invariants.

### ⚙️ C++ Core Development
- **[`skills/cpp-pro/`](skills/cpp-pro/SKILL.md)** — Modern C++20/23, template metaprogramming, SIMD, and performance optimization.
- **[`skills/cpp-coding-standards/`](skills/cpp-coding-standards/SKILL.md)** — C++ Core Guidelines, RAII, and type safety standards.
- **[`skills/cpp-header-inclusion/`](skills/cpp-header-inclusion/SKILL.md)** — Topological header inclusion layering rules.
- **[`skills/cpp-static-thread-safety/`](skills/cpp-static-thread-safety/SKILL.md)** — Clang static thread safety annotations (`GUARDED_BY`, etc.).
- **[`skills/sphereserver-crossplatform/`](skills/sphereserver-crossplatform/SKILL.md)** — Cross-platform CMake builds and CI orchestration.
- **[`skills/sphereserver-game-systems/`](skills/sphereserver-game-systems/SKILL.md)** — Core C++ game architecture (`CObjBase`, `CChar`, `CItem`, `CItemMemory`, sectors, ticks).

### 📖 Documentation Maintenance
- **[`skills/sphereserver-docs-maintenance/`](skills/sphereserver-docs-maintenance/SKILL.md)** — Audit, synchronization, and update workflows for keeping `SphereWiki-X` aligned with the C++ engine core.
