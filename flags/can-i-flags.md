# Item Capability Flags (`CAN_I_*`)

> Applied to the `CAN` property of `[ITEMDEF]` sections. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME can_i_flags]
can_i_door              000001      // Acts as an opening/closing door.
can_i_water             000002      // Requires swimming to enter tile.
can_i_platform          000004      // Walkable platform surface.
can_i_block             000008      // Impassable blocking obstacle.
can_i_climb             000010      // Climbable surface / stairs.
can_i_fire              000020      // Damaging fire/lava tile.
can_i_roof              000040      // Acts as ceiling/roof (prevents rain).
can_i_hover             000080      // Hoverable terrain.
can_i_pile              000100      // Stackable item.
can_i_dye               000200      // Can be recolored with dyes.
can_i_flip              000400      // Flips graphic direction on dclick.
can_i_light             000800      // Light source emitting illumination.
can_i_repair            001000      // Can be repaired by crafting skills.
can_i_replicate         002000      // Replicable item.
can_i_dcignorelos       004000      // Ignores LOS when double-clicked.
can_i_dcignoredist      008000      // Ignores distance when double-clicked.
can_i_blocklos          010000      // Blocks line-of-sight without blocking walking.
can_i_exceptional       020000      // Eligible for exceptional craft quality.
can_i_makersmark        040000      // Eligible to receive crafter maker's mark.
can_i_retaincolor       080000      // Retains material color upon crafting.
can_i_enchant           0100000     // Can be runic enchanted.
can_i_imbue             0200000     // Can be imbued.
can_i_recycle           0400000     // Can be recycled/smelted back to ingots.
can_i_reforge           0800000     // Can be runic reforged.
can_i_forcedc           01000000    // Bypasses pre-checks before `@DClick`.
can_i_damageable        02000000    // Shows durability bar on High Seas clients.
can_i_blocklos_height   04000000    // Blocks LOS if higher than viewer.
can_i_equiponcast       08000000    // Stays equipped while casting spells.
```
