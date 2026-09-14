# Extended Packets Reference (`0xBF` Subcommands)

This document provides byte composition, direction, and handling specifications for multiplexed extended `0xBF` subcommands (`EXTDATA_TYPE`) in **SphereServer X**.

---

## Extended Packets (`0xBF`) Overview

All extended `0xBF` packets share the following header:
- `BYTE` [1]: Opcode (`0xBF`)
- `WORD` [2]: Total Packet Length (including opcode & length field)
- `WORD` [2]: Subcommand ID (`SubID`)

---

## Extended Subcommands Table

| SubID | Name | Direction | Handler | Description |
|:---:|:---|:---:|:---|:---|
| `0x0005` | ScreenSize | C->S | `PacketScreenSize` | Client screen resolution report |
| `0x0006` | Party | Both | `PacketPartyMessage` | Party management & messages |
| `0x0007` | ArrowClick | C->S | `PacketArrowClick` | Quest / tracking arrow click |
| `0x0009` | WrestleDisarm | C->S | `PacketWrestleDisarm` | Wrestling disarm macro |
| `0x000A` | WrestleStun | C->S | `PacketWrestleStun` | Wrestling stun macro |
| `0x000B` | Language | C->S | `PacketLanguage` | Client language report |
| `0x000C` | StatusClose | C->S | `PacketStatusClose` | Status window closed notification |
| `0x000E` | Animate | C->S | `PacketAnimationReq` | Emote / animation request |
| `0x000F` | ClientInfo | C->S | `PacketClientInfo` | Extended client flags |
| `0x0010` | OldAosTooltipInfo | Both | `PacketAosTooltipInfo` | Single-item AOS tooltip |
| `0x0013` | PopupReq | C->S | `PacketPopupReq` | Context menu request |
| `0x0014` | PopupDisplay | S->C | `PacketPopupDisplay` | Context menu options display |
| `0x0015` | PopupSelect | C->S | `PacketPopupSelect` | Context menu option selection |
| `0x001A` | ChangeStatLock | C->S | `PacketChangeStatLock` | Stat lock state change |
| `0x001C` | SpellSelect | C->S | `PacketSpellSelect` | Spellbook spell precast |
| `0x001E` | HouseDesignReq | C->S | `PacketHouseDesignReq` | Custom house designer open request |
| `0x0024` | AntiCheat | C->S | `PacketAntiCheat` | Samurai Empire heartbeat |
| `0x002C` | BandageMacro | C->S | `PacketBandageMacro` | Auto-bandage macro |
| `0x002D` | TargetedSpell | C->S | `PacketTargetedSpell` | Assistant targeted spell macro |
| `0x002E` | TargetedSkill | C->S | `PacketTargetedSkill` | Assistant targeted skill macro |
| `0x0030` | TargetByResource | C->S | `PacketTargetByResource` | Assistant target by resource type |
| `0x0032` | GargoyleFly | C->S | `PacketGargoyleFly` | Gargoyle flying mode toggle |
| `0x0033` | WheelBoatMove | C->S | `PacketWheelBoatMove` | High Seas boat wheel movement |

---

## Detailed Byte Specifications

### `0xBF.0x05` - ScreenSize (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0005`)
  - `WORD` [2]: Screen Width (Pixels X)
  - `WORD` [2]: Screen Height (Pixels Y)

---

### `0xBF.0x0B` - Language (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x000B`)
  - `STRING` [4]: 3-letter uppercase ASCII language code (e.g. "ENU", "ESP", "DEU")

---

### `0xBF.0x13` - PopupReq (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0013`)
  - `DWORD` [4]: Target Entity UID (`Serial`)

---

### `0xBF.0x14` - PopupDisplay (S->C)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0014`)
  - `WORD` [2]: Header Tag (`0x0001`)
  - `DWORD` [4]: Target Entity UID (`Serial`)
  - `BYTE` [1]: Menu Entry Count
  - *Per Entry:*
    - `WORD` [2]: Option Tag / Command ID
    - `WORD` [2]: Cliloc Text ID
    - `WORD` [2]: Flags (`0x01` = Disabled, `0x02` = Colorized)

---

### `0xBF.0x1C` - SpellSelect (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x001C`)
  - `WORD` [2]: Unknown (`0x0001`)
  - `WORD` [2]: Spell ID (`SPELL_TYPE`)

---

### `0xBF.0x2D` - TargetedSpell (C->S)
- **Description:** Sent by Razor and assistants to cast a spell directly onto a target.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x002D`)
  - `WORD` [2]: Spell ID
  - `BYTE` [1]: Target Type (`0` = Object UID, `1` = Location Point)
  - `DWORD` [4]: Target Object UID (`Serial`)
  - *If Target Type == 1:*
    - `WORD` [2]: X Coordinate
    - `WORD` [2]: Y Coordinate
    - `WORD` [2]: Z Coordinate
    - `WORD` [2]: Graphic Tile ID

---

### `0xBF.0x2E` - TargetedSkill (C->S)
- **Description:** Sent by Razor and assistants to use a skill directly onto a target.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x002E`)
  - `WORD` [2]: Skill ID (`0` = LastSkill)
  - `DWORD` [4]: Target Object UID (`Serial`)

---

### `0xBF.0x30` - TargetByResource (C->S)
- **Description:** Sent by assistants to select a harvest resource target automatically.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0030`)
  - `BYTE` [1]: Resource Type (`0` = Ore, `1` = Wood, `2` = Fish)
