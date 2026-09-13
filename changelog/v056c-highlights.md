# SphereServer 0.56c Pre-Release Highlights

> Extracted from `Changelog-56c-PreRelease.txt`. Highlights attacker combat tracking, spell layers, and item modifications.

---

## Notable Additions & Changes

- **`Attacker` Combat Engine**: Deprecated `MEMORY_WAR_TARG` in favor of dynamic `ATTACKER` target arrays on characters.
- **Spell Layers**: Explicitly assigned `LAYER=layer_spell_*` to Magery, Necromancy, Chivalry, Spellweaving, and Mysticism spells.
- **Mount Syntax**: Updated `MOUNT` verb to require invocation on the rider passing the mount UID.
- **Dynamic Context Menus**: Extended support for `@ContextMenuRequest` and `@ContextMenuSelect`.
