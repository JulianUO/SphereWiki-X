# Combat Engine Flags (`COMBAT_*`)

> Configures global combat rules, hit animations, elemental engines, and weapon swing behavior in `sphere.ini` (`CombatFlags=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME combatflags]
combat_nodirchange          000001 // Do not rotate player to face opponent in combat.
combat_facecombat           000002 // Enforces faced combat (must face target to strike).
combat_prehit               000004 // Deals damage immediately at the start of swing anim.
combat_elemental_engine     000008 // Splits damage/resists into Physical/Fire/Cold/Poison/Energy (AOS).
combat_dclickself_unmounts  000020 // DClicking self in war mode dismounts from horse.
combat_allowhitfromship     000040 // Allows attacking targets from decks of ships.
combat_nopetdesert          000080 // Pet does not abandon owner when attacked by owner.
combat_archerycanmove       000100 // Allows firing archery weapons while moving.
combat_stayinrange          000200 // Aborts attack swing if target leaves range.
combat_stackarmor           001000 // Layers covering the same body part combine AR.
combat_nopoisonhit          002000 // Disables old 55i poison chance calculation.
combat_slayer               004000 // Enables PvM Slayer bonus damage.
combat_swing_norange        008000 // Swing begins regardless of range; damage dealt on reaching range.
combat_anim_hit_smooth      010000 // Swing animation duration matches weapon recoil delay.
combat_firsthit_instant     020000 // First hit in a fight does not wait for recoil timer.
combat_npc_bonusdamage      040000 // NPCs receive bonus damage from Tactics/Anatomy/DamageIncrease.
combat_paralyze_canswing    080000 // Characters continue swinging weapons while paralyzed.
```
