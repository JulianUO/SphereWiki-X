# sphere.ini — Client Expansion & Feature Flags

> Bitmasks defining enabled expansions, client packet capabilities, and graphical assets communicated during login handshakes (`GetPacketFlag()`).

---

## Overview

SphereServer X configures expansion feature bitmasks independently using dedicated `Feature*` load keys. These flags control client packet capabilities communicated via packet `0xB9` (`Features`) and packet `0xA9` (`CharList`), while exposing runtime status to SphereScript via `SERV.Feature*`.

---

## 1. Expansion Feature Keys

### `FeatureT2A=` (The Second Age)
```ini
FeatureT2A=001|002
```
- `0x01` (`FEATURE_T2A_UPDATE`): Enables T2A map, regions, and update packets.
- `0x02` (`FEATURE_T2A_CHAT`): Enables legacy in-game chat client button.

### `FeatureLBR=` (Lord Blackthorn's Revenge)
```ini
FeatureLBR=001|002
```
- `0x01` (`FEATURE_LBR_UPDATE`): Enables LBR monsters, skills, and map updates.
- `0x02` (`FEATURE_LBR_SOUND`): Enables LBR MP3 audio soundtrack.

### `FeatureAOS=` (Age of Shadows)
```ini
FeatureAOS=001|002|004|008
```
- `0x01` (`FEATURE_AOS_UPDATE_A`): Enables AOS monsters, map, skills, and necro/paladin classes.
- `0x02` (`FEATURE_AOS_UPDATE_B`): Enables AOS tooltips, fightbook, and 6th character slot screen.
- `0x04` (`FEATURE_AOS_POPUP`): Enables NPC / item context menus (Popup menus).
- `0x08` (`FEATURE_AOS_DAMAGE`): Enables AOS floating damage numbers.

### `FeatureSE=` (Samurai Empire)
```ini
FeatureSE=001|002
```
- `0x01` (`FEATURE_SE_UPDATE`): Enables Samurai Empire skills, map, and ninja/samurai classes.
- `0x02` (`FEATURE_SE_NINJASAM`): Enables SE Bushido / Ninjitsu combat mechanics and parry formulas.

### `FeatureML=` (Mondain's Legacy)
```ini
FeatureML=001
```
- `0x01` (`FEATURE_ML_UPDATE`): Enables Elven race, ML skills, spells, and housing tiles.

### `FeatureSA=` (Stygian Abyss)
```ini
FeatureSA=001|002
```
- `0x01` (`FEATURE_SA_UPDATE`): Enables Gargoyle race, Mysticism spellbook, and SA housing items.
- `0x02` (`FEATURE_SA_MOVEMENT`): Enables Stygian Abyss new movement protocol packet (`0xF0`).

### `FeatureHS=` (High Seas)
```ini
FeatureHS=001
```
- `0x01` (`FEATURE_HS_UPDATE`): Enables High Seas galleons, boat wheel movement (`0xBF.0x33`), and sea market content (bit `0x20000` in packet `0xB9`).

### `FeatureTOL=` (Time of Legends)
```ini
FeatureTOL=001|002
```
- `0x01` (`FEATURE_TOL_UPDATE`): Enables Time of Legends expansion content (bit `0x400000` in packet `0xB9`).
- `0x02` (`FEATURE_TOL_VIRTUALGOLD`): Enables virtual gold storage system.

### `FeatureEJ=` (Endless Journey)
```ini
FeatureEJ=001
```
- `0x01` (`FEATURE_EJ_UPDATE`): Enables Endless Journey free account bit (`0x800000` in packet `0xB9`).

### `FeatureExtra=` (Custom House Tiles & Client Assets)
```ini
FeatureExtra=001|002|004|008|010|020
```
- `0x01` (`FEATURE_EXTRA_CRYSTAL`): Unlocks ML crystal custom housing tiles (`0x0200`).
- `0x02` (`FEATURE_EXTRA_GOTHIC`): Unlocks SA Gothic custom housing tiles (`0x40000`).
- `0x04` (`FEATURE_EXTRA_RUSTIC`): Unlocks SA Rustic custom housing tiles (`0x80000`).
- `0x08` (`FEATURE_EXTRA_JUNGLE`): Unlocks TOL Jungle custom housing tiles (`0x100000`).
- `0x10` (`FEATURE_EXTRA_SHADOWGUARD`): Unlocks TOL Shadowguard custom housing tiles (`0x200000`).
- `0x20` (`FEATURE_EXTRA_ROLEPLAYFACES`): Unlocks Enhanced Client extra roleplay faces (`0x2000`).

---

## 2. Script Access & Engine Integration

All feature flags are exposed to SphereScript via `SERV.Feature*`:
```spherescript
ON=@Login
IF (<SERV.FeatureAOS> & 01)
    SRC.SYSMESSAGE AOS expansion features are active on this server.
ENDIF

IF (<SERV.FeatureHS> & 01)
    SRC.SYSMESSAGE High Seas naval mechanics are active.
ENDIF
```

---

## 3. Login Packet Flag Bitmask Mapping (`0xB9`)

| Flag Bit | Feature / Expansion | Config Key |
|:---:|:---|:---|
| `0x000001` | T2A Full | `FeatureT2A & 0x01` |
| `0x000002` | T2A Chat | `FeatureT2A & 0x02` |
| `0x000004` | LBR Sound | `FeatureLBR & 0x02` |
| `0x000008` | LBR Full | `FeatureLBR & 0x01` |
| `0x000010` | AOS Full / Necro / Paladin | `FeatureAOS & 0x01` |
| `0x000040` | SE Ninjitsu / Samurai | `FeatureSE & 0x02` |
| `0x000080` | ML Elven Race | `FeatureML & 0x01` |
| `0x000200` | Crystal Housing | `FeatureExtra & 0x01` |
| `0x002000` | KR Roleplay Faces | `FeatureExtra & 0x20` |
| `0x008000` | Live (Non-Trial) Account | `GetAccount()->GetPriv()` |
| `0x010000` | SA Gargoyle Race | `FeatureSA & 0x01` |
| `0x020000` | High Seas | `FeatureHS & 0x01` |
| `0x040000` | Gothic Housing | `FeatureExtra & 0x02` |
| `0x080000` | Rustic Housing | `FeatureExtra & 0x04` |
| `0x100000` | Jungle Housing | `FeatureExtra & 0x08` |
| `0x200000` | Shadowguard Housing | `FeatureExtra & 0x10` |
| `0x400000` | Time of Legends | `FeatureTOL & 0x01` |
| `0x800000` | Endless Journey | `FeatureEJ & 0x01` |
