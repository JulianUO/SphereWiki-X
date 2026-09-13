# Memory Flags (`MEMORY_*`)

> Configures relationship memory bitmasks stored on `CItemMemory` objects on `LAYER_SPECIAL`. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME mem_flags]
memory_sawcrime      00001   // Witnessed character commit a criminal act.
memory_ipet          00002   // Pet link to master (LINK = owner).
memory_fight         00004   // Active combat engagement.
memory_iaggressor    00008   // Marked as the initiator/aggressor in combat.
memory_harmedby      00010   // Was attacked / damaged by target.
memory_irritatedby   00020   // Snooped by or provoked by target.
memory_speak         00040   // Spoke with target or was tamed.
memory_aggreived     00080   // Was innocent victim of attack.
memory_guard         00100   // Guard this specific item.
memory_guild         00400   // Guild affiliation link.
memory_town          00800   // Town affiliation link.
memory_friend        04000   // Pet friend list authorization.
```

> [!CAUTION]
> When clearing combat states, never delete memory items holding persistent non-combat flags such as `MEMORY_IPET` or `MEMORY_FRIEND`.
