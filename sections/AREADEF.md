# Section: [AREADEF] & [ROOMDEF]

> `[AREADEF defname]` and `[ROOMDEF defname]` define named geographic bounding boxes, towns, dungeons, wilderness zones, and interior rooms across map planes in SphereServer.

---

## Syntax

```scp
[AREADEF a_britain]
NAME = Britain
GROUP = Towns
P = 1495,1628,10,0
RECT = 1420,1540,1720,1780,0
FLAGS = region_flag_guarded | region_flag_safe
EVENTS = r_default,r_britain_guards
TAG.GuardOwner = britain_town

[ROOMDEF r_lord_british_throne_room]
NAME = Lord British's Throne Room
RECT = 1520,1610,1540,1630,0
FLAGS = region_flag_safe
```

---

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `NAME` | String | Region name announced on entry (if `region_flag_announce` is set). |
| `GROUP` | String | Category grouping (`Towns`, `Dungeons`, `Wilderness`). |
| `P` | `X,Y,Z,Map` | Default center / recall destination coordinate point for the region. |
| `RECT` | `X1,Y1,X2,Y2,Map` | Bounding rectangle coordinates. An area can have multiple `RECT` lines. |
| `FLAGS` | Bitmask | Region rules (`region_flag_guarded`, `region_flag_safe`, `region_antimagic_all`). |
| `EVENTS` | List | Attached `[REGIONTYPE r_*]` trigger sets. |
| `TAG.*` | Custom | Custom tags (e.g. `TAG.GuardOwner`, `TAG.Music`). |
