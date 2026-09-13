# Section: [ITEMDEF]

> The `[ITEMDEF i_*]` section defines item prototypes and static templates for all physical objects, equipment, weapons, armor, containers, and special items in SphereServer.

---

## Syntax

```scp
[ITEMDEF defname]
ID = graphic_id
NAME = Item Name
TYPE = item_type
VALUE = gold_value
WEIGHT = weight_in_tenths
LAYER = equipment_layer
ARMOR = armor_value
DAM = min_damage,max_damage
REQSTR = required_strength
SKILLMAKE = skill_required skill_level, resource_amount resource_def

// Triggers
ON=@Create
    ATTR = attr_magic
    COLOR = 044

ON=@DClick
    SRC.SYSMESSAGE You clicked this item!
    return 1
```

---

## Standard Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `ID` | Hex / Defname | Base artwork/graphic ID from client art files (`0e85`, `i_gold`). |
| `NAME` | String | Base name of the item. Can include `%s` formatters or `<macro>` substitutions. |
| `TYPE` | Defname | Item type identifier (`t_weapon_sword`, `t_armor`, `t_container`, `t_door`). Binds to `[TYPEDEF]`. |
| `VALUE` | Integer | Vendor buy/sell baseline gold value. |
| `WEIGHT` | Decimal/Int | Weight in stones (in tenths of stone: `10` = 1.0 stone). |
| `LAYER` | Defname / Int | Equipment slot layer (`layer_hand1`, `layer_chest`, etc.) if wearable. |
| `ARMOR` | Integer | Defense rating provided when equipped. |
| `DAM` | `Min,Max` | Damage roll for weapons (`DAM=10,25`). |
| `REQSTR` | Integer | Minimum strength stat needed to equip or lift. |
| `RESOURCES` | List | Material composition for crafting/smelting (`RESOURCES=10 i_ingot_iron`). |
| `SKILLMAKE` | List | Required skill and components for craft engines (`SKILLMAKE=Blacksmithing 50.0, 10 i_ingot_iron`). |
| `CAN` | Bitmask | Item abilities / capabilities (`can_i_dye`, `can_i_repair`, `can_i_flip`). |
| `ATTR` | Bitmask | Default attributes (`attr_magic`, `attr_newbie`, `attr_blessed`, `attr_decay`). |
| `TDATA1` … `TDATA4` | Contextual | Subsystem-specific metadata based on `TYPE` (e.g. key locks, container sound, spellbook circles). |
| `SPEED` | Integer | Attack speed delay factor for weapons. |
| `TWOHANDS` | Boolean | `Y`/`N` or `1`/`0`: Declares weapon as two-handed equipment. |
| `RANGE` | `Min,Max` | Striking or throwing range (`RANGE=1,10` for bows). |
| `TEVENTS` | Event List | Pre-attached `[EVENTS e_*]` sets. |
| `CATEGORY` | String | Axis GM tool category grouping. |
| `SUBSECTION` | String | Axis GM tool sub-category grouping. |
| `DESCRIPTION` | String | Axis GM tool item label. |

---

## Supported Triggers

| Trigger | Description |
| :--- | :--- |
| `ON=@Create` | Executed immediately when an instance of the item is spawned. |
| `ON=@Click` | Single-click info / label request. |
| `ON=@DClick` | Double-click / usage interaction. |
| `ON=@AfterClick` | Fired after the standard client label packet is composed. |
| `ON=@DropOn_Item` | An item is dropped on this item (if container). |
| `ON=@DropOn_Char` | Dropped onto a character. |
| `ON=@DropOn_Self` | Dropped onto this item. |
| `ON=@DropOn_Ground` | Dropped onto the terrain. |
| `ON=@ItemEquip` | Equipped onto a character. |
| `ON=@ItemUnEquip` | Removed from an equipment layer. |
| `ON=@Pickup_Self` | Lifted from ground or container. |
| `ON=@Step` | Walked onto by a living entity. |
| `ON=@Destroy` | Cleaned up or removed from the world. |
| `ON=@Timer` | Ticking countdown reaches 0 (`TIMER=0`). |
| `ON=@ClientTooltip` | Extended AOS tooltip packet generation. |
