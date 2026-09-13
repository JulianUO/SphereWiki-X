# Region Flags (`REGION_FLAG_*` / `REGION_ANTIMAGIC_*`)

> Configures area rules in `[AREADEF]` and `[REGIONTYPE]` sections. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME region_flags]
region_antimagic_all              000001   // All magic spells banned in this region.
region_antimagic_recall_in        000002   // Cannot recall or teleport into this region.
region_antimagic_recall_out       000004   // Cannot recall out of this region.
region_antimagic_gate             000008   // Cannot open gate travel portals into this region.
region_antimagic_teleport         000010   // Cannot cast Teleport within this region.
region_antimagic_damage           000020   // Harmful/damage magic banned.
region_flag_ship                  000040   // Region belongs to a ship multi.
region_flag_nobuilding            000080   // Player house placement prohibited.
region_flag_announce              000200   // Announces region name on entry.
region_flag_insta_logout          000400   // Instant logout allowed (inn/tavern).
region_flag_underground           000800   // Dungeon terrain (no natural weather).
region_flag_nodecay               001000   // Items on the ground never decay.
region_flag_safe                  002000   // Safe zone: immune to all attacks and harm.
region_flag_guarded               004000   // Guard protection active (`TAG.GuardOwner`).
region_flag_no_pvp                008000   // Direct PvP combat disabled.
region_flag_arena                 010000   // Free PvP arena: no murder counts or criminal flags.
region_flag_nomining              020000   // Resource mining disabled.
region_flag_walk_noblockheight    040000   // Ignores character height for walk checks.
region_flag_inherit_parent_events 0100000  // Inherits EVENTS from parent AREADEF.
region_flag_inherit_parent_flags  0200000  // Inherits FLAGS from parent AREADEF.
region_flag_inherit_parent_tags   0400000  // Inherits TAGs from parent AREADEF.
```
