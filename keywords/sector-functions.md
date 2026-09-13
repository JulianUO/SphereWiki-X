# Sector Functions Reference (`SECTOR.*`)

> Sector actionable verbs and methods from `CSector_functions.tbl` (Source-X).  
> Sectors represent individual map partitions (64x64 tiles) handling weather, lighting, NPC sleep/wake cycles, spawning, and container restocks.

---

## Sector Action Verbs Table

| Verb / Method | Arguments | Returns | Description |
| :--- | :--- | :---: | :--- |
| `ALLCHARS <command>` | `command` | &mdash; | Executes `<command>` on all active characters (`CChar`) in the sector. |
| `ALLCHARSIDLE <command>` | `command` | &mdash; | Executes `<command>` on all idle/sleeping characters in the sector. |
| `ALLCLIENTS <command>` | `command` | &mdash; | Executes `<command>` on all connected player clients (`CClient`) with characters in this sector. |
| `ALLITEMS <command>` | `command` | &mdash; | Executes `<command>` on all top-level world items (`CItem`) in the sector. |
| `AWAKE` | *none* | &mdash; | Wakes up the sector if it is currently sleeping, enabling NPC active processing and AI cycles. |
| `DRY` | *none* | &mdash; | Clears weather effects in the sector, setting weather state to dry. |
| `LIGHT [N]` | `level` (0..30) | &mdash; | Overrides sector light level (0 = bright sunlight, 30 = pitch dark). Requires `AllowLightOverride=1` in `sphere.ini`. Omitting or passing `-1` restores default world light. |
| `RAIN [type]` | `[type]` | &mdash; | Sets weather in sector to rain (optional intensity/type argument). |
| `RESPAWN [A]` | `['A']` | &mdash; | Respawns dead NPCs in this sector. If argument starts with `A` (e.g. `RESPAWN A`), triggers a global respawn across all world sectors. |
| `RESTOCK [A]` | `['A']` | &mdash; | Restocks vendor inventories and spawner timers in this sector. If argument starts with `A` (`RESTOCK A`), triggers restock across all world sectors. |
| `SEASON <season_id>` | `0..4` | &mdash; | Changes visual client season in the sector (`0` = Spring, `1` = Summer, `2` = Autumn, `3` = Winter, `4` = Desolation). |
| `SLEEP [force]` | `[0/1]` | &mdash; | Puts the sector into sleep state if no players are present. If called with argument `1`, forces sleep without checking player proximity constraints. |
| `SNOW` | *none* | &mdash; | Sets weather in sector to snow. |

---

## Sector Properties Reference

| Property | Access | Description |
| :--- | :---: | :--- |
| `ISDARK` | R | Returns `1` if sector lighting is considered dark (light level > threshold). |
| `ISNIGHT` | R | Returns `1` if world clock corresponds to nighttime in this sector. |
| `ITEMCOUNT` | R | Total count of top-level items located in this sector. |
| `CHARCOUNT` | R | Total count of living characters located in this sector. |
| `CLIENTS` | R | Number of connected player clients currently inside this sector. |
| `COLDCHANCE` | R/W | Percentage chance of cold/snow weather. |
| `RAINCHANCE` | R/W | Percentage chance of precipitation. |
| `LOC` | R | Point coordinates (`X,Y,M`) of sector anchor. |

---

## Practical Examples

### Iterate and Broadcast to Sector
```spherescript
// Message all players in current sector
SECTOR.ALLCLIENTS SYSMESSAGE @026 The ground trembles beneath your feet!

// Clean unowned decaying items in the sector
SECTOR.ALLITEMS f_cleanup_unlinked_items

// Force sector weather update
SECTOR.RAIN
SECTOR.LIGHT 25
```
