# Section: [CHARDEF]

> The `[CHARDEF c_*]` section defines templates for living entities in SphereServer: NPCs, monsters, animals, vendors, guards, mounts, and default player bodies.

---

## Syntax

```scp
[CHARDEF defname]
ID = body_graphic_id
NAME = Character Name
ICON = paperdoll_icon_id
SOUND = snd_monster_orc1
CAN = mt_walk | mt_run | mt_usehands
DAM = min_damage,max_damage
ARMOR = armor_rating
DESIRES = i_gold,t_meat
AVERSIONS = r_civilization
FOODTYPE = 50 t_meat_raw
BLOODCOLOR = 020

// Stats & Skills
STR = {100 120}
DEX = {90 105}
INT = {35 50}
MAXHITS = {120 150}

TACTICS = {60.0 80.0}
WRESTLING = {55.0 75.0}
MAGICRESISTANCE = {50.0 65.0}

// AI & Behavior
NPC = brain_monster
FAME = {1000 2000}
KARMA = {-2000 -3000}

// Equipment / Loot Templates
CONTAINER = i_backpack
ITEMNEWBIE = i_shirt
ITEMNEWBIE = i_pants
ITEM = i_gold,{50 100}

// Triggers
ON=@Create
    NPC = brain_monster
    COLOR = 0

ON=@NPCSeeNewPlayer
    // AI reaction to seeing a player
```

---

## Standard Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `ID` | Hex / Defname | Body artwork graphic ID (`c_man`, `c_woman`, `011` for dread spider). |
| `NAME` | String | Character name. Supports `#NAMES_HUMANMALE` generator macros and titles. |
| `ICON` | Hex | Gump icon displayed in status windows or tracking dialogs. |
| `SOUND` | Defname / Int | Base sound defname played on movement, hit, hurt, or death. |
| `CAN` | Bitmask | Movement capabilities (`mt_walk`, `mt_run`, `mt_fly`, `mt_swim`, `mt_ghost`, `mt_usehands`, `mt_mount`). |
| `NPC` | Defname / Int | Brain type controlling automated decision loops (`brain_monster`, `brain_animal`, `brain_vendor`, `brain_healer`, `brain_guard`). |
| `STR`, `DEX`, `INT` | Range / Int | Core primary statistics (`{100 120}`). |
| `MAXHITS`, `MAXSTAM`, `MAXMANA` | Range / Int | Explicit maximum vital attributes. |
| `DAM` | `Min,Max` | Base unarmed attack damage range. |
| `ARMOR` | Integer | Natural base defense / armor value. |
| `FOODTYPE` | List | Food capacity and acceptable edible item types (`50 t_meat_raw,t_fish`). |
| `DESIRES` | List | Item/creature types the AI is attracted to (for foraging, wandering, or breeding). |
| `AVERSIONS` | List | Regions, items, or entity types the AI actively flees or avoids. |
| `FAME`, `KARMA` | Range / Int | Alignment values rewarded on kill. |
| `TSPEECH` | Speech List | Attached `[SPEECH spk_*]` tables for NPC conversation parsing. |
| `TEVENTS` | Event List | Attached `[EVENTS e_*]` sets. |
| `ITEMNEWBIE` | Item Def | Creates newbie (blessed/non-droppable) item in inventory on spawn. |
| `ITEM` | Item Def | Creates standard droppable loot in inventory on spawn. |
| `BLOODCOLOR` | Hex / Int | Hue of blood puddles spawned on taking damage. |

---

## Supported Triggers

| Trigger | Description |
| :--- | :--- |
| `ON=@Create` | Executed immediately when the character instance is spawned. |
| `ON=@Click` / `ON=@DClick` | Single / Double-click interactions. |
| `ON=@GetHit` | Character receives a weapon, combat, or environmental hit. |
| `ON=@Hit` | Character successfully lands a melee or ranged swing. |
| `ON=@HitTry` | Character prepares to swing weapon / unarmed. |
| `ON=@HitMiss` | Character's swing misses the target. |
| `ON=@Death` | Character's hitpoints drop to 0. |
| `ON=@DeathCorpse` | Character corpse is instantiated in the world. |
| `ON=@Kill` | Character delivers the killing blow to an enemy. |
| `ON=@NPCActFight` | NPC combat decision tick (spells, breath, weapons, fleeing). |
| `ON=@NPCActFollow` | NPC movement follow tick (pathfinding to master or target). |
| `ON=@NPCSeeNewPlayer` | NPC enters visual range of a new player character. |
| `ON=@NPCLookAtChar` | NPC scans surrounding sector for valid targets. |
| `ON=@NPCLookAtItem` | NPC scans surrounding ground for items to forage / loot. |
| `ON=@NPCRestock` | NPC vendor inventory refresh timer triggers. |
