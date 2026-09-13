# Section: [EVENTS]

> `[EVENTS e_*]` defines modular sets of event triggers that can be dynamically attached to, or removed from, individual characters (`CChar`) or items (`CItem`) at runtime using the `EVENTS` property.

---

## Syntax

```scp
[EVENTS e_player_pvp_system]

ON=@GetHit
    // Triggered when character wearing or having this event takes a hit
    if (<src.isplayer>)
        tag.LastPvPAttacker = <src.uid>
        tag.LastPvPTime = <serv.time>
    endif

ON=@Death
    // Triggered when character dies
    if (<tag0.LastPvPAttacker>)
        serv.log [PvP] <name> was slain by <uid.<tag.LastPvPAttacker>.name>
    endif

ON=@Logout
    // Prevent instant logout if engaged in combat
    if (<eval <serv.time> - <tag0.LastPvPTime>> < 600)
        sysmessage You cannot safely log out while in combat cooldown!
        return 1
    endif
```

---

## Attaching and Removing Events

### Script Assignment
```scp
// Adding events dynamically:
EVENTS = +e_player_pvp_system
src.EVENTS = +e_quest_tracker

// Removing events dynamically:
EVENTS = -e_player_pvp_system
src.EVENTS = -e_quest_tracker
```

### Static Template Assignment
In `[CHARDEF]` or `[ITEMDEF]` definitions:
```scp
[CHARDEF c_guard]
TEVENTS = e_guard_ai,e_protection_aura
```

### Global Assignment (`sphere.ini`)
Configured globally in server initialization:
```ini
EventsPlayer=e_PlayerGeneric,e_PlayerQuest
EventsPet=e_NPCGeneric,e_NPCQuest
EventsItem=e_ItemDecayHandler
```

---

## Trigger Precedence

When an event fires on a character or item:
1. Triggers in the item's `[TYPEDEF]` execute first.
2. Triggers in the object's `[CHARDEF]` / `[ITEMDEF]` execute second.
3. Triggers in attached `[EVENTS]` execute in the order they were added.
4. If **any** trigger returns `1`, event execution halts immediately and the remaining event handlers in the chain are skipped.
