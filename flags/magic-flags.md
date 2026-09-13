# Magic Engine Flags (`MAGICF_*`)

> Configures global spellcasting rules, pre-casting, disruption, and reflection in `sphere.ini` (`MagicFlags=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME magicflags]
magicf_nodirchange          00001 // Do not rotate caster to face target.
magicf_precast              00002 // Precasting: Cast spell first before target prompt appears.
magicf_ignorear             00004 // Magic spell damage bypasses armor rating entirely.
magicf_canharmself          00008 // Area and targeted harmful spells can hit the caster.
magicf_stackstats           00010 // Different stat buff/debuff spells stack instead of overwriting.
magicf_freezeoncast         00020 // Characters cannot walk/move while casting.
magicf_summonwalkcheck      00040 // Summoned creatures must pass terrain walking checks at destination.
magicf_nofieldsoverwalls    00080 // Field spells (Fire Field, Poison Field) cannot cross walls.
magicf_noanim               00100 // Suppresses casting body animation automatically.
magicf_osiformulas          00200 // Uses official OSI formulas for spell damage and duration.
magicf_nocastfrozenhands    00400 // Cannot cast while paralyzed if holding items in hands.
magicf_polymorphstats       00800 // Polymorph grants stat modifications based on creature template.
magicf_overridefields       01000 // Casting a new field spell replaces any existing field on the tile.
magicf_castparalyzed        02000 // Allows casting spells while paralyzed.
magicf_noreflectown         04000 // Caster does not reflect their own spell back onto themselves.
magicf_delreflectown        08000 // Removes magic reflection without dealing self-damage when NOREFLECTOWN is active.
```
