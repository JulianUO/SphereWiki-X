# Character Status Flags (`STATF_*`)

> Applied to the `FLAGS` property of `CChar` living entities. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME stat_flags]
statf_invul             000000001   // Invulnerable to damage.
statf_dead              000000002   // Character is a ghost / dead.
statf_freeze            000000004   // Paralyzed by spell or ability.
statf_invisible         000000008   // Magically invisible.
statf_sleeping          000000010   // Unconscious / sleeping state.
statf_war               000000020   // War mode active.
statf_reactive          000000040   // Reactive armor active.
statf_poisoned          000000080   // Character is poisoned.
statf_nightsight        000000100   // Night sight spell/potion active.
statf_reflection        000000200   // Magic reflection active.
statf_polymorph         000000400   // Polymorphed into another form.
statf_incognito         000000800   // Incognito active.
statf_spiritspeak       000001000   // Can hear and speak to ghosts.
statf_insubstantial     000002000   // GM hidden / insubstantial.
statf_emoteaction       000004000   // Creature emotes actions to master.
statf_commcrystal       000008000   // Relaying speech to communication crystal.
statf_hasshield         000010000   // Currently wielding an active shield.
statf_archercanmove     000020000   // Character can fire bow while moving.
statf_stone             000040000   // Petrified to stone.
statf_hovering          000080000   // Gargoyle flight hovering.
statf_fly               000100000   // Flying animation state.
statf_statue            000200000   // Frozen as static statue frame.
statf_hallucinating     000400000   // Hallucination effect active.
statf_hidden            000800000   // Hidden via Hiding skill.
statf_indoors           001000000   // Under roof / indoors.
statf_criminal          002000000   // Criminal flag (guards will attack).
statf_conjured          004000000   // Summoned creature (decays on expiration).
statf_pet               008000000   // Pet / hireling link active.
statf_spawned           010000000   // Spawned by an automatic spawn item.
statf_saveparity        020000000   // Worldsave parity tracking flag.
statf_ridden            040000000   // Mount currently being ridden.
statf_onhorse           080000000   // Character mounted on horseback.
```
