# Region Properties Reference (`REGION.*`)

> Properties queryable on geographic zones or the character's active region context (`<region.PROPERTY>`).

---

## Properties

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `REGION.NAME` | R | String | Name of the active region (e.g. `Britain`, `Despise Dungeon`). |
| `REGION.GROUP` | R | String | Category group of the region (`Towns`, `Dungeons`). |
| `REGION.FLAGS` | R/W | Bitmask | Region rules bitmask (`region_flag_safe`, `region_flag_guarded`, `region_flag_no_pvp`). |
| `REGION.TAG.*` | R/W | Custom | Custom region tags (e.g. `<region.tag.guardowner>`). |
| `REGION.UID` | R | UID | UID of dynamic region owner (if inside a ship or house multi). |
