# Section: [MULTI]

> `[MULTI 0x*]` defines multi-component tile objects such as player houses, castles, pirate ships, dragon galleons, and large static multi-structures in SphereServer.

---

## Syntax

```scp
[MULTI 0x4000]
DEFNAME = m_small_stone_and_plaster_house
NAME = Small Stone and Plaster House
TYPE = t_multi
VALUE = 43800
CAN = can_i_roof

// Component coordinate mapping: item_id, rel_x, rel_y, rel_z
COMPONENT = 0675,0,0,0
COMPONENT = 0677,-1,0,0
COMPONENT = 0679,-2,0,0
```

---

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `DEFNAME` | Defname | Symbolic identifier for the multi structure. |
| `NAME` | String | Display name of the multi structure. |
| `TYPE` | Defname | Set to `t_multi`, `t_multi_custom`, or `t_multi_addon`. |
| `VALUE` | Integer | Base gold cost for deed purchasing. |
| `CAN` | Bitmask | Item capabilities (`CAN_I_ROOF`, `CAN_I_DOOR`, `CAN_I_PLATFORM`). |
| `COMPONENT` | `ID,X,Y,Z` | Coordinate offset entry for static tile parts making up the multi. |

---

## Multi Subclasses: Houses vs Ships

In Source-X, multis are split into two specialized C++ runtime classes:
- **Houses (`CItemMulti` / `CItemMultiCustom`)**: Manages moving crates (`MOVINGCRATE`), secure containers (`SECURECONTAINER`), lockdowns (`LOCKDOWN`), house signs (`SIGN`), addons, and permission lists (co-owners, friends, access, bans).
- **Ships (`CItemShip` / `CCMultiMovable`)**: Manages ship holds/hatches (`HOLD` / `HATCH`), tillerman (`TILLER`), planks (`PLANK`), pilot wheels (`PILOT`), anchor, and navigation triggers (`@ShipMove`, `@ShipStop`, `@ShipTurn`).

> For complete specifications, container structures, and verbs for both classes, see **[`MULTI-CONTAINERS.md`](MULTI-CONTAINERS.md)**.
