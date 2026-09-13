# Agent Skills Directory (`agent-guidelines/skills/`)

This directory houses the structured skill packages for AI coding assistants and developers working on **SphereServer X (Source-X)** and **SphereScript**.

---

## 📁 Skill Catalog

```
agent-guidelines/skills/
├── cpp-coding-standards/         # C++ Core Guidelines & modern idiomatic patterns
├── cpp-header-inclusion/         # Topological header inclusion rules
├── cpp-pro/                      # C++20/23 advanced systems, SIMD & performance
├── cpp-static-thread-safety/     # Clang static thread safety annotations
├── sphereserver-crossplatform/   # Cross-platform CMake & toolchain orchestration
├── sphereserver-game-systems/    # Core C++ game objects, tick loops & memory flags
├── sphereserver-scripting-lang/  # SphereScript language specification & invariants
└── sphereserver-docs-maintenance/# Documentation audit, update & sync workflows
```

---

## 1. ⚙️ C++ Core Engine Skills

| Skill Folder | Role & Purpose |
| :--- | :--- |
| **[`cpp-pro/`](cpp-pro/SKILL.md)** | Advanced C++20/23 systems engineering, template metaprogramming, concepts, memory layout, SIMD optimization, and profiling. |
| **[`cpp-coding-standards/`](cpp-coding-standards/SKILL.md)** | Enforcement of modern C++ Core Guidelines, RAII, type safety, const correctness, and clean architecture. |
| **[`cpp-header-inclusion/`](cpp-header-inclusion/SKILL.md)** | Strict topological header layering and reordering rules to eliminate circular dependencies. |
| **[`cpp-static-thread-safety/`](cpp-static-thread-safety/SKILL.md)** | Clang static thread safety annotations (`GUARDED_BY`, `PT_GUARDED_BY`, `ACQUIRED_BEFORE`) for multi-threaded safety. |
| **[`sphereserver-crossplatform/`](sphereserver-crossplatform/SKILL.md)** | Cross-platform builds (Windows MSVC, Linux x86_64/i386/ARM64, Clang, GCC), CMake toolchains, and CI coordination. |
| **[`sphereserver-game-systems/`](sphereserver-game-systems/SKILL.md)** | Deep architectural standards for `CObjBase`, `CChar`, `CItem`, `CItemContainer`, `CItemMemory`, sectors, ticks, and network synchronization. |

---

## 2. 📜 SphereScript Scripting Skills

| Skill Folder | Role & Purpose |
| :--- | :--- |
| **[`sphereserver-scripting-lang/`](sphereserver-scripting-lang/SKILL.md)** | Complete SphereScript engineering standards covering all `[SECTION]` blocks, `@Triggers`, object pointers (`SRC`, `ARGO`, `ACT`, `NEW`, `REF1..5`, `HOLD`, `MOVINGCRATE`), dynamic tags, decimal coercion, and Source-X invariants. |

---

## 3. 📚 Documentation Maintenance Skills

| Skill Folder | Role & Purpose |
| :--- | :--- |
| **[`sphereserver-docs-maintenance/`](sphereserver-docs-maintenance/SKILL.md)** | Procedures and audit workflows for keeping `SphereWiki-X`, trigger catalogs, actionable verbs, flags, and VS Code tooling synchronized with the C++ engine core. |
