# Damage Type Flags (`DAM_*`)

> Passed in `ARGN2` during `@GetHit`, `@Damage`, and `@Hit`. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME dam_flags]
dam_god                 00001   // Unblockable true damage (bypasses all defenses).
dam_physical            00002   // Standard physical strike damage.
dam_magic               00004   // Generic magical spell damage.
dam_poison              00008   // Poison-based elemental damage.
dam_fire                00010   // Fire-based elemental damage.
dam_energy              00020   // Energy-based elemental damage.
dam_general             00080   // Full body area damage.
dam_acidic              00100   // Acid damage (damages armor durability).
dam_cold                00200   // Cold-based elemental damage.
dam_slash               00400   // Slashing weapon damage.
dam_pierce              00800   // Piercing weapon damage.
dam_nodisturb           02000   // Damage does not disturb/interrupt spellcasting.
dam_noreveal            04000   // Damage does not reveal hidden attacker.
dam_nounparalyze        08000   // Damage does not break paralysis.
dam_fixed               010000  // Damage is not recalculated by armor / resistances.
dam_breath              020000  // Damage originated from Dragon breath attack.
dam_thrown              040000  // Damage originated from monster Throw action.
dam_reactive            080000  // Damage reflected by Reactive Armor.
```
