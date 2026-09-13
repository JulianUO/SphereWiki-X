# Section: [REGIONRESOURCE]

> `[REGIONRESOURCE mr_*]` defines individual gatherable natural resources (such as iron ore, valorite ore, oak logs, fish, sand) available within harvestable terrain tiles.

---

## Syntax

```scp
[REGIONRESOURCE mr_ore_iron]
AMOUNT = 8,12
REAP = i_ore_iron
REAPAMOUNT = 1,3
SKILL = 0.0,60.0
REGEN = 60*10

ON=@ResourceTest
    // Optional check before extraction
    if (<src.isgm>)
        return 0
    endif

ON=@ResourceFound
    // argo = resource bit
```

---

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `AMOUNT` | `Min,Max` | Number of resource units available in a single harvest tile before depletion. |
| `REAP` | Itemdef | The actual item spawned into player pack on harvest (`i_ore_iron`, `i_log`). |
| `REAPAMOUNT` | `Min,Max` | Units harvested per successful skill swing. |
| `SKILL` | `Min,Max` | Minimum and maximum skill level range needed to harvest this resource. |
| `REGEN` | Seconds / Ticks | Time required for a depleted spot to regenerate full capacity. |
