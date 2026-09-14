# sphere.ini — Modular Game Engine Flags

> Configuration settings for controlling built-in and script-integrated modular game systems (Virtues, Item Insurance, Bulk Order Deeds, Player Murder, and Factions).

---

## Overview

SphereServer X provides dedicated `Engine*` configuration toggles allowing server administrators to enable or disable specific high-level game systems without altering core server functionality. All `Engine*` settings are exposed to SphereScript via `SERV.Engine*`.

---

## 1. Engine Configuration Keys

### `EngineVirtues=`
```ini
EngineVirtues=1
```
- **Type:** Integer (`0` = Disabled, `1` = Enabled)
- **Default:** `1`
- **Script Access:** `SERV.EngineVirtues`
- **Description:** Toggles the OSI Virtues system (Humility, Sacrifice, Compassion, Honor, Valor, Justice, Honesty, Spirituality), gump dialog handling (`0x12` type `0xF4`), and virtue points tracking.

---

### `EngineInsurance=`
```ini
EngineInsurance=1
```
- **Type:** Integer (`0` = Disabled, `1` = Enabled)
- **Default:** `1`
- **Script Access:** `SERV.EngineInsurance`
- **Description:** Toggles Age of Shadows item insurance (`ATTR_INSURED`). When enabled alongside `FeatureAOS`, players pay gold upon death to protect insured items from dropping into corpses.

---

### `EngineBulkOrders=`
```ini
EngineBulkOrders=1
```
- **Type:** Integer (`0` = Disabled, `1` = Enabled)
- **Default:** `1`
- **Script Access:** `SERV.EngineBulkOrders`
- **Description:** Toggles the Bulk Order Deeds (BOD) crafting contract system for Blacksmithing, Tailoring, Tinkering, and other crafting skills.

---

### `EnginePlayerMurder=`
```ini
EnginePlayerMurder=1
```
- **Type:** Integer (`0` = Disabled, `1` = Enabled)
- **Default:** `1`
- **Script Access:** `SERV.EnginePlayerMurder`
- **Description:** Toggles the OSI Player Murder reporting interface upon PvP death, murder counts decay (LTM / STM), and bounty tracking on red players.

---

### `EngineFactions=`
```ini
EngineFactions=0
```
- **Type:** Integer (`0` = Disabled, `1` = Enabled)
- **Default:** `0`
- **Script Access:** `SERV.EngineFactions`
- **Description:** Toggles the Factions PvP system (True Britannians, Council of Mages, Shadowlords, Minax), town sigil control, and faction ranks.

---

## 2. Script Usage Example

```spherescript
ON=@Death
IF (<SERV.EngineInsurance>)
    // Execute item insurance protection logic
ENDIF

IF (<SERV.EnginePlayerMurder>)
    // Trigger murder report dialog for killer
ENDIF
```
