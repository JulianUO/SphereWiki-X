# Standard Packets Reference (`0x00` - `0xFF`)

This document provides byte composition, direction, and handling specifications for core Ultima Online network packets in **SphereServer X**.

---

## Core Packets Table

| Opcode | Name | Direction | Length | Description |
|:---:|:---|:---:|:---:|:---|
| `0x00` | CreateCharacter | C->S | 104 | Legacy character creation request |
| `0x02` | WalkRequest | C->S | 7 | Movement request and fastwalk sequence |
| `0x03` | TalkRequest | C->S | Variable | ASCII speech or text command |
| `0x05` | AttackReq | C->S | 5 | Target entity to attack |
| `0x06` | DoubleClick | C->S | 5 | Double-click object / entity (`Serial`) |
| `0x07` | PickupItem | C->S | 7 | Lift item from ground or container |
| `0x08` | DropItem | C->S | 15 | Drop item to ground or container |
| `0x09` | SingleClick | C->S | 5 | Single-click object / entity (`Serial`) |
| `0x12` | ExtCmd | C->S | Variable | Legacy skill / spell command string |
| `0x13` | EquipItem | C->S | 10 | Equip item onto body layer |
| `0x20` | PlayerUpdate | S->C | 19 | Character position, direction, hue, graphic |
| `0x3F` | StaticUpdate / UltimaLive | Both | Variable | [UOAscension Fork Extension](file:///C:/Users/jrnic/Documents/UOAscension-IA/Source-X/ultimalive) UltimaLive map streaming |
| `0x6C` | Target | Both | 19 | Target cursor dialogue / selection |
| `0x80` | AccountLogin | C->S | 62 | Initial account credentials login |
| `0x8C` | ConnectRelay | S->C | 11 | Redirect client to Game Server IP / Port |
| `0x91` | GameLogin | C->S | 65 | Game server entry handshake |
| `0xA9` | CharList | S->C | Variable | Character list and feature flags |
| `0xB9` | Features | S->C | 3 / 5 | Expansion feature flags bitmask |
| `0xEF` | NewSeed | C->S | 21 | Encryption seed & client version (ClassicUO) |
| `0xF0` | WalkNew | C->S | Variable | Stygian Abyss movement request |
| `0xF9` | GlobalChat | Both | Variable | SA Global Chat & XML contact lists |

---

## Detailed Byte Specifications

### `0x00` - CreateCharacter (C->S)
- **Length:** 104 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x00`)
  - `DWORD` [4]: Pattern / Key (`0xEDFFFFFF`)
  - `DWORD` [4]: Client Flag
  - `DWORD` [4]: Profession / Slot ID
  - `STRING` [30]: Character Name
  - `STRING` [30]: Password
  - `BYTE` [1]: Gender (0 = Male, 1 = Female)
  - `BYTE` [1]: Strength
  - `BYTE` [1]: Dexterity
  - `BYTE` [1]: Intelligence
  - `BYTE` [1]: Skill 1 ID
  - `BYTE` [1]: Skill 1 Value
  - `BYTE` [1]: Skill 2 ID
  - `BYTE` [1]: Skill 2 Value
  - `BYTE` [1]: Skill 3 ID
  - `BYTE` [1]: Skill 3 Value
  - `WORD` [2]: Skin Hue
  - `WORD` [2]: Hair Style
  - `WORD` [2]: Hair Hue
  - `WORD` [2]: Facial Hair Style
  - `WORD` [2]: Facial Hair Hue
  - `WORD` [2]: Location Index
  - `WORD` [2]: Slot / Unknown

---

### `0x02` - WalkRequest (C->S)
- **Length:** 7 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x02`)
  - `BYTE` [1]: Direction (0-7, bit `0x80` = Running)
  - `BYTE` [1]: Fastwalk Sequence Number
  - `DWORD` [4]: Fastwalk Key / Client Time

---

### `0x03` - TalkRequest (C->S)
- **Length:** Variable
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x03`)
  - `WORD` [2]: Packet Length
  - `BYTE` [1]: Speech Type (0 = Normal, 1 = Yell, 2 = Whisper, 6 = System)
  - `WORD` [2]: Text Hue
  - `WORD` [2]: Font Style
  - `STRING` [N]: Null-terminated ASCII text string

---

### `0x05` - AttackReq (C->S)
- **Length:** 5 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x05`)
  - `DWORD` [4]: Target Victim UID (`Serial`)

---

### `0x06` - DoubleClick (C->S)
- **Length:** 5 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x06`)
  - `DWORD` [4]: Target Object / Entity UID (`Serial`)

---

### `0x07` - PickupItem (C->S)
- **Length:** 7 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x07`)
  - `DWORD` [4]: Item UID (`Serial`)
  - `WORD` [2]: Stack Amount

---

### `0x08` - DropItem (C->S)
- **Length:** 15 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x08`)
  - `DWORD` [4]: Item UID (`Serial`)
  - `WORD` [2]: X Coordinate
  - `WORD` [2]: Y Coordinate
  - `BYTE` [1]: Z Coordinate
  - `DWORD` [4]: Destination Container UID (`0xFFFFFFFF` for ground)

---

### `0x09` - SingleClick (C->S)
- **Length:** 5 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x09`)
  - `DWORD` [4]: Target Entity UID (`Serial`)

---

### `0x13` - EquipItem (C->S)
- **Length:** 10 bytes
- **Direction:** Client to Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x13`)
  - `DWORD` [4]: Item UID (`Serial`)
  - `BYTE` [1]: Body Layer (`1` - `25`)
  - `DWORD` [4]: Character UID (`Serial`)

---

### `0x6C` - Target (Both)
- **Length:** 19 bytes
- **Direction:** Client <-> Server
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0x6C`)
  - `BYTE` [1]: Target Type (`0` = Object, `1` = Location)
  - `DWORD` [4]: Target Cursor ID
  - `BYTE` [1]: Target Flags (`0` = Harmful, `1` = Helpful, `2` = Neutral)
  - `DWORD` [4]: Target Serial / UID
  - `WORD` [2]: X Coordinate
  - `WORD` [2]: Y Coordinate
  - `WORD` [2]: Z Coordinate
  - `WORD` [2]: Graphic / Tile ID

---

### `0xEF` - NewSeed (C->S)
- **Length:** 21 bytes
- **Direction:** Client to Server
- **Description:** Encryption seed & version handshake sent by ClassicUO and modern clients.
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0xEF`)
  - `DWORD` [4]: Encryption Seed
  - `DWORD` [4]: Client Version Major
  - `DWORD` [4]: Client Version Minor
  - `DWORD` [4]: Client Version Revision
  - `DWORD` [4]: Client Version Patch / Build

---

### `0xF9` - GlobalChat (Both)
- **Length:** Variable
- **Direction:** Client <-> Server
- **Description:** Stygian Abyss global chat & XML contact list protocol.
- **Byte Layout:**
  - `BYTE` [1]: Opcode (`0xF9`)
  - `WORD` [2]: Packet Length
  - `BYTE` [1]: Flag / Unknown
  - `BYTE` [1]: Action (`1` = MessageSend, `2` = FriendRemove, `3` = FriendAddTarg, `4` = StatusToggle)
  - `BYTE` [1]: Stanza / Tab ID
  - `STRING` [N]: XML payload ASCII string
