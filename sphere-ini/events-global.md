# sphere.ini — Global Event Listeners

> Automatic event assignments attached implicitly to every instantiated entity across the world.

---

## Global Event Settings

```ini
// Automatically attached to every living player character
EventsPlayer=e_PlayerGeneric,e_PlayerQuest

// Automatically attached to every NPC, creature, and pet
EventsPet=e_NPCGeneric,e_NPCQuest

// Automatically attached to every dynamic item
EventsItem=e_ItemGeneric

// Automatically attached to every map region
EventsRegion=r_default
```

### Execution Behavior
- Global events execute in the order listed.
- If any trigger in a global event returns `1`, execution stops and the action is blocked globally for that entity type.
