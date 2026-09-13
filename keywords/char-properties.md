# Character Properties & Verbs Reference (`CChar`)

> Properties and verbs directly queryable or settable on character entities (`<src.PROPERTY>`, `ref1.PROPERTY`, `<name>`, `<hits>`).

---

## Vital Attributes & Stats

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `STR`, `DEX`, `INT` | R/W | Integer | Raw primary attributes. |
| `MODSTR`, `MODDEX`, `MODINT` | R/W | Integer | Temporary magical stat modifiers. |
| `HITS`, `STAM`, `MANA` | R/W | Integer | Current vital points. |
| `MAXHITS`, `MAXSTAM`, `MAXMANA` | R/W | Integer | Calculated maximum vital points. |
| `MODMAXHITS`, `MODMAXMANA`, `MODMAXSTAM` | R/W | Integer | Direct maximum stat modifiers (Source-X). |
| `ARMOR` | R/W | Integer | Effective physical defense rating. |
| `DAM` | R/W | String | Natural unarmed damage range (`DAM=5,12`). |
| `FOOD` | R/W | Integer | Hunger / satiety level (0 = starving). |
| `KARMA`, `FAME` | R/W | Integer | Alignment points (-10000 to +10000). |
| `EXP`, `LEVEL` | R/W | Integer | Experience points and level (if enabled in `sphere.ini`). |

---

## State Flags & Movement

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `P` | R/W | Point | Current coordinates (`1420,1680,10,0`). |
| `DIR` | R/W | Integer / Def | Facing direction (`0`=North, `1`=NE, `2`=East, etc.). |
| `FLAGS` | R/W | Bitmask | Character state flags (`statf_hidden`, `statf_dead`, `statf_war`, `statf_invul`, `statf_freeze`). |
| `CAN` | R | Bitmask | Movement abilities defined in CHARDEF (`mt_walk`, `mt_fly`, `mt_ghost`). Read-only in Source-X. |
| `CANMASK` | R/W | Bitmask | Per-character runtime modifier to `CAN` flags. |
| `WEIGHT` | R | Integer | Current total inventory weight carried in stones. |
| `MAXWEIGHT` | R | Integer | Maximum carry capacity before becoming overburdened. |
| `MODMAXWEIGHT` | R/W | Integer | Modifier to maximum carry weight (Source-X). |

---

## Combat & Relationships

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `ATTACKER.COUNT` | R | Integer | Number of active combat opponents. |
| `ATTACKER.MAX` | R | UID | UID of the opponent who dealt the highest total damage. |
| `ATTACKER.TARGET` | R | UID | UID of the primary target. |
| `ATTACKER.CLEAR` | W | Verb | Resets active combat attacker list. |
| `OWNER` | R/W | UID | Pet owner UID (Source-X read/write). |
| `MEMORYFINDTYPE(type)` | R | UID | Searches for specific equipped memory item (e.g. `MEMORY_IPET`). |
| `FINDLAYER(layer)` | R | UID | Returns UID of item equipped on the specified layer. |

---

## Core Verbs (Actions)

| Verb | Syntax | Description |
| :--- | :--- | :--- |
| `SYSMESSAGE` | `sysmessage [@color] text` | Sends in-game text message to the client's lower-left chat area. |
| `MESSAGE` / `SAY` | `say [@color] text` | Emits overhead speech above the character. |
| `EMOTE` | `emote [@color] text` | Emits overhead action text (e.g. `*smiles*`). |
| `GO` | `go coordinates / region` | Instantly teleports character to target. |
| `BOUNCE` | `bounce item_uid` | Places item into character's backpack, or drops on ground if full. |
| `EQUIP` | `equip item_uid` | Equips item onto the appropriate layer. |
| `UNEQUIP` | `unequip item_uid` | Moves equipped item back to backpack. |
| `KILL` | `kill` | Forces immediate character death. |
| `RESURRECT` | `resurrect` | Restores a ghost back to life. |
| `EFFECT` | `effect type, item_id, speed, loop, explode` | Renders visual particle or animation effect. |
| `SOUND` | `sound sound_id` | Plays SFX audio centered on the character. |
| `ANIM` | `anim anim_id` | Forces character body animation frame sequence. |
| `FACE` | `face target_uid / point` | Turns character to face target or coordinates. |
