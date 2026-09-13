# Section: [TEMPLATE]

> `[TEMPLATE t_*]` defines composite loot, equipment, or spawn packages in SphereServer. Templates can group items with quantities, probability rolls, nested templates, and container bundling.

---

## Syntax

```scp
[TEMPLATE t_loot_orc_chief]
CONTAINER = i_backpack
ITEM = i_gold,{100 250}
ITEM = { i_ringmail_tunic 1 i_chainmail_tunic 1 0 5 }
ITEM = { i_scimitar 1 i_club 1 }
ITEM = random_potion,2
ITEM = random_scroll_circle_3
```

---

## Directives

| Directive | Description |
| :--- | :--- |
| `CONTAINER = itemdef` | Bundles subsequent items inside a newly created container item. |
| `ITEM = itemdef [amount]` | Creates the specified item with optional quantity or range `{min max}`. |
| `ITEM = { item1 w1 item2 w2 0 w3 }` | Weighted roll. A `0` entry represents a chance of no drop. |
| `ITEM = template_name` | Evaluates a nested template recursively. |
| `BUY = itemdef,amount` | Sets maximum stock quantity an NPC vendor will purchase (when `OF_VentorStockLimit` is enabled). |
| `SELL = itemdef,amount` | Sets stock quantity an NPC vendor restocks and sells. |
