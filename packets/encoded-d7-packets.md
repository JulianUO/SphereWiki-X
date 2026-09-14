# Encoded Packets Reference (`0xD7` Subcommands)

This document provides byte composition, direction, and handling specifications for encoded `0xD7` subcommands (`EXTAOS_TYPE`) in **SphereServer X**.

---

## Encoded Packets (`0xD7`) Overview

All encoded `0xD7` packets share the following header:
- `BYTE` [1]: Opcode (`0xD7`)
- `WORD` [2]: Total Packet Length (including opcode & length field)
- `DWORD` [4]: Character UID (`Serial`)
- `WORD` [2]: Subcommand ID (`SubID`)

---

## Encoded Subcommands Table

| SubID | Name | Direction | Handler | Description |
|:---:|:---|:---:|:---|:---|
| `0x0002` | HcBackup | C->S | `PacketHouseDesignBackup` | House designer: Create backup copy |
| `0x0003` | HcRestore | C->S | `PacketHouseDesignRestore` | House designer: Restore backup copy |
| `0x0004` | HcCommit | C->S | `PacketHouseDesignCommit` | House designer: Commit and construct |
| `0x0005` | HcDestroyItem | C->S | `PacketHouseDesignDestroyItem` | House designer: Remove component |
| `0x0006` | HcPlaceItem | C->S | `PacketHouseDesignPlaceItem` | House designer: Place component |
| `0x000A` | HcResponse | C->S | `PacketHouseDesignResponse` | House designer: ClassicUO response ack |
| `0x000C` | HcExit | C->S | `PacketHouseDesignExit` | House designer: Exit customization mode |
| `0x000D` | HcPlaceStair | C->S | `PacketHouseDesignPlaceStair` | House designer: Place stairs |
| `0x000E` | HcSynch | C->S | `PacketHouseDesignSync` | House designer: Synchronize state |
| `0x0010` | HcClear | C->S | `PacketHouseDesignClear` | House designer: Clear design plot |
| `0x0012` | HcSwitch | C->S | `PacketHouseDesignSwitch` | House designer: Switch active floor |
| `0x0013` | HcPlaceRoof | C->S | `PacketHouseDesignPlaceRoof` | House designer: Place roof tile |
| `0x0014` | HcDestroyRoof | C->S | `PacketHouseDesignDestroyRoof` | House designer: Remove roof tile |
| `0x0019` | SpecialMove | C->S | `PacketSpecialMove` | Weapon ability activate / deactivate |
| `0x001A` | HcRevert | C->S | `PacketHouseDesignRevert` | House designer: Revert unsaved changes |
| `0x001E` | EquipLastWeapon | C->S | `PacketEquipLastWeapon` | Re-equip last weapon macro |
| `0x0028` | GuildButton | C->S | `PacketGuildButton` | Paperdoll guild button (`@UserGuildButton`) |
| `0x0032` | QuestButton | C->S | `PacketQuestButton` | Paperdoll quest button (`@UserQuestButton`) |

---

## Detailed Byte Specifications

### `0xD7.0x05` - HcDestroyItem (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0005`)
  - `DWORD` [4]: Graphic ID of tile / item
  - `WORD` [2]: Relative X Offset
  - `WORD` [2]: Relative Y Offset
  - `WORD` [2]: Relative Z Offset / Floor

---

### `0xD7.0x06` - HcPlaceItem (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0006`)
  - `DWORD` [4]: Graphic ID of tile / item
  - `WORD` [2]: Relative X Offset
  - `WORD` [2]: Relative Y Offset
  - `WORD` [2]: Relative Z Offset / Floor

---

### `0xD7.0x0A` - HcResponse (C->S)
- **Description:** ClassicUO CustomHouseResponse acknowledgement packet.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x000A`)
  - `DWORD` [4]: Response Code / Dialog Parameters

---

### `0xD7.0x12` - HcSwitch (C->S)
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0012`)
  - `BYTE` [1]: Floor Level (`1` - `4`)

---

### `0xD7.0x19` - SpecialMove (C->S)
- **Description:** Activate or deactivate weapon special move.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0019`)
  - `BYTE` [1]: Ability ID (`1` = Primary, `2` = Secondary, `0` = Deactivate)

---

### `0xD7.0x28` - GuildButton (C->S)
- **Description:** Paperdoll guild button press. Triggers `@UserGuildButton`.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0028`)

---

### `0xD7.0x32` - QuestButton (C->S)
- **Description:** Paperdoll quest button press. Triggers `@UserQuestButton`.
- **Byte Layout:**
  - `WORD` [2]: SubID (`0x0032`)
