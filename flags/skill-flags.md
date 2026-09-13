# Skill Configuration Flags (`SKF_*`)

> Configures skill properties in `[SKILL skill_*]` sections. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME skill_flags]
SKF_SCRIPTED      0001   // Fully scripted skill (no hardcoded C++ mechanics).
SKF_FIGHT         0002   // Combat skill; maintains active fight mode.
SKF_MAGIC         0004   // Magic casting skill.
SKF_CRAFT         0008   // Crafting skill; compatible with craft engine functions.
SKF_IMMOBILE      0010   // Character cannot move while performing skill.
SKF_SELECTABLE    0020   // Can be activated directly from client skill list.
SKF_NOMINDIST     0040   // Can harvest/use on the exact tile character stands upon.
SKF_NOANIM        0080   // Suppresses hardcoded body animations.
SKF_NOSFX         0100   // Suppresses hardcoded sound effects.
SKF_RANGED        0200   // Ranged combat skill (e.g. Archery, Throwing).
SKF_GATHER        0400   // Resource gathering skill (Mining, Lumberjacking, Fishing).
SKF_DISABLED      0800   // Skill cannot be used by characters.
```
