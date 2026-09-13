# NPC AI Flags (`NPC_AI_*`)

> Configures advanced artificial intelligence features in `sphere.ini` (`NPCAIFlags=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME npcaiflags]
npc_ai_path             0001 // Enables multi-threaded pathfinding engine.
npc_ai_food             0002 // Enables basic foraging search for food when hungry.
npc_ai_extra            0004 // Makes humanoid NPCs equip weapons in combat / torches at night.
npc_ai_alwaysint        0008 // Pathfinding treats all NPCs with high intelligence.
npc_ai_intfood          0010 // Enables advanced intelligent food search.
npc_ai_combat           0040 // Makes NPCs cast beneficial spells on allies in combat.
npc_ai_looting          0100 // Makes NPCs loot nearby items and corpses.
npc_ai_moveobstacles    0200 // NPCs with mt_usehands move blocking items out of their way.
npc_ai_persistentpath   0400 // NPCs persistently chase targets even if temporarily unreachable.
npc_ai_threat           0800 // NPCs prioritize attacking opponents with higher threat values.
```
