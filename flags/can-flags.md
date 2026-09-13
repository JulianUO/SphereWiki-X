# Character Ability Flags (`CAN` / `MT_*`)

> Configures movement capabilities, anatomy, and interaction limits for monsters, NPCs, and chars. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME can_flags]
mt_male           000000   // Male gender body.
mt_ghost          000001   // Can pass through locked doors.
mt_swim           000002   // Can move on water tiles.
mt_walk           000004   // Can walk on standard land tiles.
mt_passwalls      000008   // Can pass through impassable wall tiles.
mt_fly            000010   // Can fly across terrain.
mt_fire_immune    000020   // Immune to lava/fire terrain damage.
mt_noindoors      000040   // Cannot move under roofs / indoors.
mt_hover          000080   // Can use gargoyle flight paths.
mt_equip          000100   // Can equip armor and non-weapon items.
mt_usehands       000200   // Can manipulate items: loot, equip weapons, open doors.
mt_mount          000400   // Can ride mounts.
mt_female         000800   // Female gender body.
mt_nonhum         001000   // Non-humanoid body for combat messages.
mt_run            002000   // Capable of running speed.
mt_nodclicklos    004000   // Ignores LOS when dclicking.
mt_nodclickdist   008000   // Ignores distance when dclicking.
mt_nonmover       010000   // Completely static; never moves.
mt_noblockheight  020000   // Ignores character height when checking walk tiles.
mt_statue         040000   // Acts as frozen decorative statue.
mt_nonselectable  080000   // Cannot be targeted or selected by cursor.
```
