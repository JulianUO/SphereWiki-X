# Section: [TYPEDEF]

> `[TYPEDEF t_*]` defines behavior triggers associated with a specific item type. Any item whose `TYPE` property matches the typedef automatically inherits all triggers declared in that section.

---

## Syntax

```scp
[TYPEDEF t_magic_teleport_tile]

ON=@Step
    // Fires whenever a character steps on any item with TYPE=t_magic_teleport_tile
    if (<src.ischar>)
        src.effect 3,i_fx_sparkle,6,15,1
        src.sound snd_spell_teleport
        src.p = <morep>
        return 1
    endif

ON=@DClick
    // When double clicked by a staff member
    if (<src.isgm>)
        src.sysmessage Target is currently set to: <morep>
    endif
    return 1
```

---

## Common Hardcoded & Scripted Types

SphereServer includes dozens of built-in types (e.g. `t_door`, `t_container`, `t_weapon_sword`, `t_potion`, `t_spellbook`, `t_corpse`, `t_coin`).  
Custom types can be declared for specialized shard mechanics:
- `t_socket_enhancer`
- `t_quest_item`
- `t_champion_skull`
- `t_guild_stone`

---

## Field Assignments (`MORE`, `MORE1`, `MORE2`, `MOREP`)

Different item types utilize the `MORE*` fields for distinct engine properties:
- **`t_door`**: `MORE1` holds the open/closed graphic offset.
- **`t_container`**: `MOREZ` can store item limits; `TDATA2` holds open/close sound.
- **`t_spawn_char`**: `MORE1` (or `SPAWNID` in X1) stores the char template to spawn; `MORE2` is spawn radius; `MOREP` stores spawn counts.
- **`t_telepad`**: `MOREP` stores the destination `X,Y,Z,Map`.
