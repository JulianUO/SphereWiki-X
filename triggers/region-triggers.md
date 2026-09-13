# Region Triggers Reference

> Triggers executing inside `[REGIONTYPE r_*]` sections attached to `[AREADEF]` zones, `[ROOMDEF]` interiors, or map sectors.

---

## Implicit & Explicit Object References in Region Triggers

> [!IMPORTANT]
> **Implicit Context (`DEFAULT` / `this`)**: Inside any region trigger (`@Enter`, `@Exit`, `@Step`, `@CliPeriodic`, `@RegPeriodic`), the **DEFAULT active object** running the script is the **`CRegion` itself**.
> 
> This means any unprefixed property query refers directly to the Region:
> - `<name>`: Name of the region (e.g. `Britain`, `Despise Dungeon`).
> - `<group>`: Category group of the region (e.g. `Towns`, `Dungeons`).
> - `<flags>`: The `REGION_FLAG_*` and `REGION_ANTIMAGIC_*` bitmasks.
> - `<p>`: Safe center coordinate point of the region (`X,Y,Z,Map`).
> - `<tag.CustomTag>` / `<tag0.CustomTag>`: Custom tags stored on the region.
> - `<def.X>`: Region local definitions.

| Reference | Target Meaning | Object Type | Notes |
| :--- | :--- | :--- | :--- |
| `DEFAULT` (unprefixed) | **The Region itself** | `CRegion` | Accesses `<name>`, `<flags>`, `<p>`, `<tag.*>`, `<rect>`. |
| `SRC` | **The Character** entering, leaving, or stepping | `CChar` | The player or NPC triggering the spatial event (`<src.name>`, `<src.p>`, `<src.isplayer>`). |
| `ARGO` | **Contextual Secondary Object** | Contextual | In `@ResourceFound`, `ARGO` is the resource bit item (`CItem`). |
| `SECTOR` | **The Sector** where the event occurred | `CSector` | Accesses `<sector.light>`, `<sector.season>`, `<sector.weather>`. |

---

## Complete Trigger Specifications

### `@Enter`
Fired when a living entity enters the boundaries of the region.
- **Scope / References**:
  - `DEFAULT`: The `CRegion` being entered (`<name>`, `<flags>`, `<tag0.GuardOwner>`).
  - `SRC`: The character (`CChar`) entering the region.
- **RET**:
  - `1`: Blocks entry! Prevents character from entering the region (teleports back or blocks movement).
  - `0` / `2`: Standard entry proceeds normally.

```scp
[REGIONTYPE r_guarded_city]
ON=@Enter
    if (<src.isplayer>)
        src.sysmessage @044 Welcome to <name>, guarded by the city watch!
    endif
```

### `@Exit` / `@Leave`
Fired when a character departs the region boundaries.
- **Scope / References**:
  - `DEFAULT`: The `CRegion` being exited.
  - `SRC`: The character (`CChar`) departing.
- **RET**:
  - `1`: Prevents exit (holds character inside region).
  - `0`: Standard exit.

### `@Step`
Fired on every movement step taken inside the region boundaries.
- **Scope / References**:
  - `DEFAULT`: The `CRegion`.
  - `SRC`: The walking character (`CChar`).
  - `ARGN1`: `1` if standing still/turning, `0` if stepping into a new coordinate tile.
- **RET**:
  - `1`: Blocks step; movement cancelled.
  - `0`: Allows step.

### `@CliPeriodic`
Fired periodically for each active client connected within the region.
- **Scope / References**:
  - `DEFAULT`: The `CRegion`.
  - `SRC`: The client character (`CChar`).

### `@RegPeriodic`
Regional periodic tick fired for the region as a whole (runs even if 1 or multiple players are inside).
- **Scope / References**:
  - `DEFAULT`: The `CRegion`.

---

## Resource Gathering Triggers (in `REGIONTYPE` and `REGIONRESOURCE`)

### `@ResourceTest`
Fired for every harvestable resource in a `REGIONTYPE` to check if player meets requirements to harvest from the spot.
- **Scope / References**:
  - `DEFAULT`: The `CRegionResourceDef` resource definition (`<amount>`, `<reap>`, `<skill>`).
  - `SRC`: The harvesting character (`CChar`).
- **RET**:
  - `1`: Treats this resource as unavailable at this location (skips to next resource).
  - `0`: Resource is available for harvesting.

### `@ResourceFound`
Fired after a resource bit has been found and created in the world.
- **Scope / References**:
  - `DEFAULT`: The `CRegionResourceDef`.
  - `SRC`: The harvesting player (`CChar`).
  - `ARGO`: The resource bit item instance (`CItem`).
- **RET**:
  - `1`: Removes resource bit and reports no resource found.
  - `0`: Allows harvesting.

### `@ResourceGather`
Fired when player gathers the resource, determining the extracted yield.
- **Scope / References**:
  - `DEFAULT`: The `CRegionResourceDef`.
  - `SRC`: The harvesting character (`CChar`).
  - `ARGN1`: Harvest amount being yielded.
- **OUT**:
  - `ARGN1`: Modified yield amount.
