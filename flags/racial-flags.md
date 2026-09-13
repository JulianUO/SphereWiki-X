# Racial Ability Flags (`RACIALF_*`)

> Configures passive racial traits for Humans, Elves, and Gargoyles in `sphere.ini` (`RacialFlags=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME racialflags]
racialf_human_strongback      0001 // Increases human carry capacity (+60 stones).
racialf_human_tough           0002 // Faster HP regeneration (+2 Hit Point Regeneration).
racialf_human_workhorse       0004 // Bonus yield when gathering lumber, ore, and hides.
racialf_human_jackoftrades    0008 // Untrained skills calculated with minimum 20.0 ability.
racialf_elf_nightsight        0010 // Permanent night sight vision.
racialf_elf_difftrack         0020 // Increases difficulty to be tracked while hidden.
racialf_elf_wisdom            0040 // Max mana bonus (+20 Mana Increase).
racialf_garg_fly              0080 // Enables gargoyle flight ability book.
racialf_garg_berserk          0100 // Berserk mode: Bonus damage and spell damage as HP drops.
racialf_garg_deadlyaim        0200 // Throwing skill minimum 20.0 when untrained.
racialf_garg_mysticinsight    0400 // Mysticism skill minimum 30.0 when untrained.
```
