# Terrain & Static Tile Flags (`TILEF_*`)

> Extracted from client art mul data files, representing terrain and static object physics. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME tile_flags]
tilef_background        000000001   // Black void / background space.
tilef_weapon            000000002   // Weapon tile.
tilef_transparent       000000004   // See-through transparent tile.
tilef_translucent       000000008   // Semi-translucent material.
tilef_wall              000000010   // Impassable wall obstacle.
tilef_damaging          000000020   // Lava / fire damaging terrain.
tilef_impassable        000000040   // Impassable mountain/rock terrain.
tilef_wet               000000080   // Water / ocean / mud tile.
tilef_surface           000000200   // Walkable or placeable surface (table).
tilef_bridge            000000400   // Bridge surface.
tilef_stackable         000000800   // Item can be stacked.
tilef_window            000001000   // Window fixture.
tilef_noshoot           000002000   // Blocks projectile weapons.
tilef_internal          000010000   // Internal client asset (hair, beard).
tilef_foliage           000020000   // Tree leaves / foliage.
tilef_map               000100000   // Map terrain.
tilef_container         000200000   // Container object.
tilef_wearable          000400000   // Wearable equipment.
tilef_lightsource       000800000   // Emits light radius.
tilef_animated          001000000   // Has animated frames.
tilef_hoverover         002000000   // Hoverable terrain.
tilef_armor             008000000   // Armor / shield fixture.
tilef_roof              010000000   // Roof fixture.
tilef_door              020000000   // Door fixture.
tilef_stairback         040000000   // Climbable rear stairs.
tilef_stairright        080000000   // Climbable right stairs.
```
