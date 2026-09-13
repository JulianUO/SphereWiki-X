# Section: [REGIONTYPE]

> `[REGIONTYPE r_*]` defines environmental behavior, magic restrictions, resource harvesting pools, and entry/exit triggers for map sectors and geographic zones.

---

## Syntax

```scp
[REGIONTYPE r_dungeon]
RESOURCES = mr_nothing
FLAGS = region_flag_underground | region_antimagic_recall_in | region_antimagic_gate

ON=@Enter
    // Triggered when any char steps into this region
    if (<src.isplayer>)
        src.sysmessage @020 You feel a cold, ominous chill in the air...
    endif

ON=@Leave
    // Triggered when leaving this region

ON=@Step
    // Triggered on every step inside this region
```

---

## Properties & Directives

| Directive | Description |
| :--- | :--- |
| `FLAGS` | Bitmask defining regional environment rules (`region_flag_safe`, `region_flag_guarded`, `region_flag_no_pvp`, `region_antimagic_all`). |
| `RESOURCES` | List of `[REGIONRESOURCE]` defnames harvestable via Mining, Lumberjacking, or Fishing within this region. |

---

## Supported Triggers

| Trigger | Description |
| :--- | :--- |
| `ON=@Enter` | Living character enters the region boundaries. `SRC` = character. |
| `ON=@Leave` | Living character exits the region boundaries. `SRC` = character. |
| `ON=@Step` | Character takes a step inside the region. `SRC` = character. |
| `ON=@CliProc` | Client packet interception within the region. |
| `ON=@ResourceTest` | Checks whether player meets skill requirements for regional harvesting. |
| `ON=@ResourceFound` | Harvest spot yields a resource bit (`argo`). |
