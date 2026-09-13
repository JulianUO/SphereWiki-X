# Individual Spell Flags (`SPELLFLAG_*`)

> Configures individual spell behavior in `[SPELL s_*]` sections. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME spell_flags]
spellflag_dir_anim         00000001   // Plays directed projectile casting animation.
spellflag_targ_item        00000002   // Spell targets an item.
spellflag_targ_char        00000004   // Spell targets a living character.
spellflag_targ_obj         00000006   // Spell targets either an item or character.
spellflag_targ_xyz         00000008   // Spell targets a coordinate point on ground.
spellflag_harm             00000010   // Spell is harmful / aggressive act.
spellflag_fx_bolt          00000020   // Renders bolt particle effect towards target.
spellflag_fx_targ          00000040   // Renders visual effect centered on target.
spellflag_field            00000080   // Creates an environmental field (fire, poison, energy).
spellflag_summon           00000100   // Summons a temporary creature or item.
spellflag_good             00000200   // Beneficial spell (heal, cure, buff).
spellflag_resist           00000400   // Can be resisted via Magic Resistance skill.
spellflag_targ_noself      00000800   // Caster cannot target themselves.
spellflag_freezeoncast     00001000   // Caster is frozen for the duration of this spell.
spellflag_disabled         00008000   // Spell cannot be cast at all.
spellflag_scripted         00010000   // Spell is fully scripted in `@Effect`.
spellflag_playeronly       00020000   // NPCs will not cast this spell via AI.
spellflag_nounparalyze     00040000   // Does not remove paralysis from the victim.
spellflag_no_castanim      00080000   // Suppresses casting body animation.
spellflag_targ_no_player   00100000   // Cannot target players.
spellflag_targ_no_npc      00200000   // Cannot target NPCs.
spellflag_noprecast        00400000   // Disables precasting for this specific spell.
spellflag_nofreezeoncast   00800000   // Disables freeze on cast for this specific spell.
spellflag_area             01000000   // Area of effect spell (uses LOCAL.AreaRadius).
spellflag_poly             02000000   // Polymorphs the caster.
spellflag_targ_dead        04000000   // Targets ghosts / corpses (e.g. Resurrection).
spellflag_damage           08000000   // Deals damage (uses LOCAL.DamageType).
spellflag_bless            010000000  // Beneficial stat modification.
spellflag_curse            020000000  // Harmful stat curse.
spellflag_heal             040000000  // Restores hitpoints.
```
