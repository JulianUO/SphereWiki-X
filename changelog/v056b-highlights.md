# SphereServer 0.56b Pre-Release Highlights

> Extracted from `Changelog-56b-PreRelease.txt`. Focuses on multi-threading, container iteration loops, random macros, and memory safety.

---

## Notable Additions & Changes

- **Container Iteration**: Added `FORCONT` loop syntax with optional recursion depth parameter.
- **Random Macro `<R>`**: Added `<R>` / `<R10>` / `<R1,10>` as fast native shortcuts for `<eval rand(...)>`.
- **Advanced Pathfinding**: Multi-threaded NPC pathfinding and hunger-driven food foraging AI.
- **Dynamic Sectors**: Memory optimizations ensuring unneeded map sectors do not consume RAM.
- **Skill Gain Trigger `@SkillGain`**: Added explicit gain interceptor triggers with difficulty and cap parameters.
- **Skill Abort Trigger `@SkillAbort`**: Added cancellation event protecting against macro skill-gain exploits.
