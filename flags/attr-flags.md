# Item Attribute Flags (`ATTR_*`)

> Applied to `ATTR` property of `CItem` instances. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME attr_flags]
attr_identified         000000001   // Item has been identified via Item ID skill.
attr_decay              000000002   // Item decays when on the ground.
attr_newbie             000000004   // Stays in character's backpack upon death.
attr_move_always        000000008   // Always moveable and never decays.
attr_move_never         000000010   // Never moveable and never decays.
attr_magic              000000020   // Item has magical properties.
attr_owned              000000040   // Town owned; requires stealing to pick up.
attr_invis              000000080   // Item is invisible to non-GMs.
attr_cursed             000000100   // Cursed item; cannot be unequipped normally.
attr_blessed            000000400   // Blessed item.
attr_forsale            000001000   // Marked for sale on player/NPC vendor.
attr_stolen             000002000   // Stolen item flag (LINK = victim).
attr_static             000008000   // Saved into spherestatics.scp.
attr_exceptional        000010000   // Crafted with exceptional quality bonus.
attr_enchanted          000020000   // Enhanced via runic tool.
attr_imbued             000040000   // Modified via imbuing skill.
attr_questitem          000080000   // Quest item (cannot be dropped, traded, stolen).
attr_insured            000100000   // Item is insured against loss on death.
attr_nodrop             000200000   // Cannot be dropped on ground.
attr_notrade            000400000   // Cannot be traded in trade window.
attr_nodroptrade        000600000   // Combined no drop and no trade.
attr_lockeddown         001000000   // House locked down fixture.
attr_secure             002000000   // House secure container.
attr_reforged           004000000   // Runic reforged item.
attr_opened             008000000   // Door is currently open.
attr_canuse_paralyzed   080000000   // Item can be used while paralyzed.
```
