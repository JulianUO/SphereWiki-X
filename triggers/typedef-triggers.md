# Item Types (`TYPEDEF` / `IT_*`) & Field Mappings Reference

> Comprehensive reference of all built-in SphereServer item types (`IT_*`), their `TYPE=t_*` defnames, and the exact memory layout of the `MORE1`, `MORE2`, `MOREP`, `MOREX`, `MOREY`, `MOREZ`, `MOREM`, `TDATA1`, `TDATA2`, `TDATA3`, and `TDATA4` registers extracted directly from C++ engine source (`CItem.h`, `CItemBase.h`, `item_types.h`).

---

## 1. Register Overview

Items (`CItem`) store type-specific state inside a 14-byte contextual union:
- `MORE1` (32-bit dword): Often subdivided into `MORE1L` (low 16 bits) and `MORE1H` (high 16 bits).
- `MORE2` (32-bit dword): Often subdivided into `MORE2L` (low 16 bits) and `MORE2H` (high 16 bits).
- `MOREP` (Point coordinate structure):
  - `MOREX` (16-bit word / int16)
  - `MOREY` (16-bit word / int16)
  - `MOREZ` (8-bit byte / int8)
  - `MOREM` (8-bit byte / map index)

Static item definitions (`CItemBase`) store baseline template properties:
- `TDATA1`, `TDATA2`, `TDATA3`, `TDATA4` (32-bit dwords).

---

## 2. Complete Item Type Catalog & Field Specifications

### Containers & Lockables

| Type Name | Enum | `MORE1` | `MORE2` | `MOREP` / `MOREX,Y,Z` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_container`<br>`t_container_locked` | `IT_CONTAINER`<br>`IT_CONTAINER_LOCKED` | `m_UIDLock`: UID of matching key to unlock. | `m_dwLockComplexity`: 0-1000 lockpick / magic unlock difficulty. | — | `TDATA2`: Gump ID (`idGump`).<br>`TDATA3`: Min bounds (`dwMinXY`).<br>`TDATA4`: Max bounds (`dwMaxXY`). |
| `t_door`<br>`t_door_locked`<br>`t_door_open` | `IT_DOOR`<br>`IT_DOOR_LOCKED`<br>`IT_DOOR_OPEN` | `m_UIDLock`: Key lock code UID. | `m_dwLockComplexity`: Lockpick difficulty. | — | `TDATA1`: Low=Close sound, High=Open sound.<br>`TDATA2`: Item ID to switch into on open/close.<br>`TDATA3`: X coord offset on open.<br>`TDATA4`: Y coord offset on open. |
| `t_key`<br>`t_keyring` | `IT_KEY`<br>`IT_KEYRING` | `m_UIDLock`: Matching lock code UID. | — | — | `t_keyring` uses `TDATA2..4` container gump settings. |
| `t_portculis`<br>`t_port_locked` | `IT_PORTCULIS`<br>`IT_PORT_LOCKED` | `m_z1`: Lower closed Z coordinate. | `m_z2`: Upper open Z coordinate. | — | — |
| `t_trash_can` | `IT_TRASH_CAN` | — | — | — | `TDATA2..4`: Container gump dimensions. Deletes any item dropped on it. |

---

### Weapons, Armor & Clothing

| Type Name | Enum | `MORE1` (`MORE1L` / `MORE1H`) | `MORE2` | `MOREX, Y, Z, M` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_weapon_sword`<br>`t_weapon_fence`<br>`t_weapon_mace_smith`<br>`t_weapon_mace_sharp`<br>`t_weapon_mace_staff`<br>`t_weapon_mace_crook`<br>`t_weapon_mace_pick`<br>`t_weapon_axe`<br>`t_weapon_whip` | `IT_WEAPON_*` | `MORE1L`: Current durability (`HitsCur`).<br>`MORE1H`: Max repair durability (`HitsMax`). | `MORE2`: Spell charges. | `MOREX`: Spell ID bound to weapon.<br>`MOREY`: Spell power level (0-1000).<br>`MOREZ`: Poison level (0-100). | `TDATA2`: `REQSTR` (Strength requirement). |
| `t_weapon_bow`<br>`t_weapon_xbow`<br>`t_weapon_throwing` | `IT_WEAPON_BOW`<br>`IT_WEAPON_XBOW`<br>`IT_WEAPON_THROWING` | `MORE1L`: Current durability.<br>`MORE1H`: Max durability. | `MORE2`: Spell charges. | `MOREX`: Spell ID.<br>`MOREY`: Spell level.<br>`MOREZ`: Poison level. | `TDATA1`: Firing sound ID.<br>`TDATA2`: `REQSTR`.<br>`TDATA3`: Required ammo itemdef (`i_arrow`, `i_xbolt`).<br>`TDATA4`: Fired projectile animation itemdef. |
| `t_armor`<br>`t_armor_leather`<br>`t_armor_chain`<br>`t_armor_ring`<br>`t_armor_bone`<br>`t_shield`<br>`t_clothing`<br>`t_jewelry` | `IT_ARMOR_*`<br>`IT_SHIELD`<br>`IT_CLOTHING`<br>`IT_JEWELRY` | `MORE1L`: Current durability.<br>`MORE1H`: Max repair durability. | `MORE2`: Spell charges. | `MOREX`: Magic spell effect ID.<br>`MOREY`: Magic spell level (0-1000). | `TDATA2`: `REQSTR` (Strength requirement). |
| `t_wand` | `IT_WAND` | `MORE1L`: Current durability.<br>`MORE1H`: Max durability. | `MORE2`: Magic spell charges remaining. | `MOREX`: Spell ID.<br>`MOREY`: Spell level. | `TDATA2`: `REQSTR`. |

---

### Magic, Spellbooks & Runes

| Type Name | Enum | `MORE1` | `MORE2` | `MOREP` / `MOREX,Y,Z` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_spellbook` | `IT_SPELLBOOK` | `m_spells1`: Bitmask of circles 1-4 spells present (bits 0-31). | `m_spells2`: Bitmask of circles 5-8 spells present (bits 0-31). | — | `TDATA3`: Offset (`0`).<br>`TDATA4`: Max spells (`64`). |
| `t_spellbook_necro` | `IT_SPELLBOOK_NECRO` | `m_spells1`: Bitmask of Necromancy spells present. | — | `MOREZ`: Base offset (`100`). | `TDATA3`: `101`. `TDATA4`: `17`. |
| `t_spellbook_pala` | `IT_SPELLBOOK_PALA` | `m_spells1`: Bitmask of Chivalry spells present. | — | `MOREZ`: Base offset (`200`). | `TDATA3`: `201`. `TDATA4`: `10`. |
| `t_spellbook_bushido` | `IT_SPELLBOOK_BUSHIDO` | `m_spells1`: Bitmask of Bushido spells present. | — | `MOREZ`: Base offset (`400`). | `TDATA3`: `401`. `TDATA4`: `6`. |
| `t_spellbook_ninjitsu`| `IT_SPELLBOOK_NINJITSU`| `m_spells1`: Bitmask of Ninjitsu spells present. | — | `MOREZ`: Base offset (`500`). | `TDATA3`: `501`. `TDATA4`: `8`. |
| `t_spellbook_arcanist`| `IT_SPELLBOOK_ARCANIST`| `m_spells1`: Bitmask of Spellweaving spells present. | — | `MOREZ`: Base offset (`600`). | `TDATA3`: `601`. `TDATA4`: `16`. |
| `t_spellbook_mystic`  | `IT_SPELLBOOK_MYSTIC`  | `m_spells1`: Bitmask of Mysticism spells present. | — | `MOREX`: Base offset (`677`). | `TDATA3`: `678`. `TDATA4`: `16`. |
| `t_spellbook_mastery` | `IT_SPELLBOOK_MASTERY` | `m_spells1`: Bitmask of Mastery spells present. | — | `MOREZ`: Base offset (`700`). | `TDATA3`: `701`. `TDATA4`: `44`. |
| `t_scroll` | `IT_SCROLL` | `MORE1`: (Optional) Spell ID. | `MORE2`: Spell level / strength. | `MOREX`: Spell ID to cast on use. | — |
| `t_potion` | `IT_POTION` | `m_Type`: Potion spell effect ID (`SPELL_TYPE`). | `m_dwSkillQuality`: 0-1000 strength of resulting effect. | `MOREX`: Explosion countdown timer (purple potions). | — |
| `t_rune` | `IT_RUNE` | `m_Strength`: Remaining uses before rune wears out. | — | `MOREP`: Destination coordinate point (`X,Y,Z,Map`) marked on rune. | — |
| `t_telepad`<br>`t_moongate` | `IT_TELEPAD`<br>`IT_MOONGATE` | `m_fPlayerOnly`: `1`=Player only (no NPCs except pets). | `m_fQuiet`: `1`=Silent teleportation. | `MOREP`: Target destination point (`X,Y,Z,Map`). | — |

---

### Food, Drink & Consumables

| Type Name | Enum | `MORE1` | `MORE2` | `MOREX, Y, Z, M` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_food`<br>`t_food_raw`<br>`t_fruit`<br>`t_meat_raw` | `IT_FOOD`<br>`IT_FOOD_RAW`<br>`IT_FRUIT`<br>`IT_MEAT_RAW` | `m_ridCook`: Itemdef this cooks into. | `m_MeatType`: Creature ID source of meat. | `MOREX`: Spell ID applied on eat.<br>`MOREY`: Spell level.<br>`MOREZ`: Poison skill level (0-100).<br>`MOREM`: Satiety food value to restore. | — |
| `t_drink`<br>`t_booze` | `IT_DRINK`<br>`IT_BOOZE` | `m_ridCook`: Itemdef cooks into. | `m_MeatType`: Source creature. | `MOREX`: Spell ID.<br>`MOREY`: Spell level.<br>`MOREZ`: Poison level.<br>`MOREM`: Food value restored. | — |
| `t_corpse` | `IT_CORPSE` | `m_carved`: `1` if corpse was carved with blade, `0` if intact. | `m_uidKiller`: UID of character who killed/carved corpse. | `MOREX, MOREY`: Base creature body ID (`CREID_TYPE`).<br>`MOREZ`: Facing direction (`0x80`=face down). | `TDATA2..4`: Corpse container dimensions. |

---

### Flora, Resources & Farming

| Type Name | Enum | `MORE1` | `MORE2` | `MOREX, Y, Z, M` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_crops`<br>`t_foliage` | `IT_CROPS`<br>`IT_FOLIAGE` | `m_Respawn_Sec`: Plant respawn/growth time in seconds. | `m_ridFruitOverride`: Override for harvested fruit. | `MOREX`: Harvested fruit yield quantity. | `TDATA1`: Itemdef to reset to upon harvest.<br>`TDATA2`: Itemdef to grow further into.<br>`TDATA3`: Itemdef reaped for fruit. |
| `t_tree`<br>`t_rock`<br>`t_water`<br>`t_grass` | `IT_TREE`<br>`IT_ROCK`<br>`IT_WATER`<br>`IT_GRASS` | `m_ridRes`: Resource definition (`[REGIONRESOURCE]`). | — | — | — |
| `t_ore` | `IT_ORE` | — | — | — | `TDATA1`: Target ingot itemdef (`i_ingot_iron`, `i_ingot_gold`). |
| `t_ingot` | `IT_INGOT` | — | — | — | `TDATA1`: Min mining skill to smelt.<br>`TDATA2`: Max mining skill for 100% yield. |

---

### Multis, Ships & Structures

| Type Name | Enum | `MORE1` | `MORE2` | `MOREX, Y, Z, M` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_multi`<br>`t_multi_custom`<br>`t_ship` | `IT_MULTI`<br>`IT_MULTI_CUSTOM`<br>`IT_SHIP` | `m_UIDCreator`: UID of character who placed house/ship. | `_eMovementType`: Ship speed mode (0=Stop, 1=One tile, 2=Normal). | `MOREX`: Pilot UID.<br>`MOREY`: Face direction.<br>`MOREZ`: Move direction.<br>`MOREM`: Anchored flag (`0` / `1`). | — |
| `t_ship_plank` | `IT_SHIP_PLANK` | `m_UIDLock`: Key lock code UID. | `m_dwLockComplexity`: Lock complexity. | `MOREX`: Type to become (`IT_SHIP_SIDE` or `IT_SHIP_SIDE_LOCKED`). | — |
| `t_ship_tiller` | `IT_SHIP_TILLER` | `m_UIDLock`: Key code of the ship. | — | — | `LINK`: UID of the ship multi object. |
| `t_ship_hold`<br>`t_ship_hold_lock` | `IT_SHIP_HOLD`<br>`IT_SHIP_HOLD_LOCK` | `m_UIDLock`: Lock code UID. | `m_dwLockComplexity`: Lockpick complexity. | — | `TDATA2..4`: Hold container gump settings. |

---

### Spawn Generators & World Items

| Type Name | Enum | `MORE1` | `MORE2` | `MOREX, Y, Z, M` | `TDATA1..4` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `t_spawn_char`<br>`t_spawn_item` | `IT_SPAWN_CHAR`<br>`IT_SPAWN_ITEM` | `MORE1`: Template / Char ID to spawn. | `MORE2`: Spawn radius distance in tiles. | `MOREX`: Min time between spawns (minutes).<br>`MOREY`: Max time between spawns (minutes).<br>`MOREZ`: Max count of active spawned entities. | — |
| `t_figurine`<br>`t_eq_horse` | `IT_FIGURINE`<br>`IT_EQ_HORSE` | `m_ID`: Creature body ID (`CREID_TYPE`) spawned on activation. | `m_UID`: Stored offline creature UID (if stabled). | — | `TDATA2`: `REQSTR` required to mount.<br>`TDATA3`: Creature ID (`CREID_TYPE`). |
| `t_map` | `IT_MAP` | `MORE1L`: Top world Y coord.<br>`MORE1H`: Left world X coord. | `MORE2L`: Bottom world Y coord.<br>`MORE2H`: Right world X coord. | `MOREZ`: `1` if map pins are glued/locked.<br>`MOREM`: Map plane index. | — |
| `t_eq_memory_obj` | `IT_EQ_MEMORY_OBJ` | `MORE1L`: Memory action type (`NPC_MEM_ACT_TYPE`).<br>`MORE1H`: Skill index trained. | — | `MOREP`: Coordinate location where memory event occurred.<br>`LINK`: Linked entity UID. | — |
| `t_stone_guild`<br>`t_stone_town` | `IT_STONE_GUILD`<br>`IT_STONE_TOWN` | `m_iAlign`: Alignment type (`0`=Standard, `1`=Order, `2`=Chaos). | `m_iAccountGold`: Gold balance deposited in stone account. | — | — |
| `t_musical` | `IT_MUSICAL` | — | — | — | `TDATA1`: SFX played on success (`iSoundGood`).<br>`TDATA2`: SFX played on failure (`iSoundBad`). |
| `t_light_lit`<br>`t_light_out` | `IT_LIGHT_LIT`<br>`IT_LIGHT_OUT` | — | — | `MOREX`: Out of charges flag (`1`=yes).<br>`MOREY`: Fuel charges remaining.<br>`MOREZ`: Light rotation pattern index. | `TDATA3`: Itemdef to toggle into when clicked on/off. |
| `t_trap`<br>`t_trap_active`<br>`t_trap_inactive` | `IT_TRAP`<br>`IT_TRAP_ACTIVE`<br>`IT_TRAP_INACTIVE` | `m_AnimID`: Graphic ID shown when sprung. | `m_iDamage`: Base trap damage. | `MOREX`: Active dangerous duration (seconds).<br>`MOREY`: Idle reset duration.<br>`MOREZ`: `1` if periodic cycling trap. | — |
| `t_switch` | `IT_SWITCH` | `m_SwitchID`: Next graphic state when toggled. | — | `MOREX`: `1` if activated by stepping on it.<br>`MOREY`: Delay before activation.<br>`LINK`: Target item to trigger. | — |
| `t_archery_butte` | `IT_ARCHERY_BUTTE` | `m_ridAmmoType`: Arrow or bolt currently embedded in target. | `m_iAmmoCount`: Count of ammo items stuck in butte. | — | — |
| `t_loom` | `IT_LOOM` | `m_ridCloth`: Cloth itemdef loaded in loom. | `m_iClothQty`: Quantity of cloth loaded. | — | — |
| `t_bee_hive` | `IT_BEE_HIVE` | `m_iHoneyCount`: Accumulated units of honey. | — | — | — |
