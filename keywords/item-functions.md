# Item Functions & Verbs Reference (`CItem`)

> Actionable verbs and methods available on **Items, Weapons, Armor, and Containers** (`CItem`). Extracted directly from `Source-X/src/tables/CItem_functions.tbl` and `CItem.cpp`.

---

## Complete Item Verbs Catalog

| Verb / Method | Syntax | Description |
| :--- | :--- | :--- |
| `BOUNCE` | `BOUNCE [char_uid]` | Moves item into target character's backpack (or ground if full). |
| `CARVECORPSE` | `CARVECORPSE [char_uid]` | Triggers bladed corpse carve on item (`IT_CORPSE`). |
| `CONSUME` | `CONSUME [amount]` | Deducts units from item stack quantity (`AMOUNT`). |
| `CONTCONSUME` | `CONTCONSUME amount, itemdef` | Searches container and consumes matching resources. |
| `DECAY` | `DECAY` | Forces immediate natural item decay check. |
| `DESTROY` / `REMOVE` | `DESTROY` | Deletes item permanently from the world. |
| `DROP` | `DROP [X,Y,Z,Map]` | Drops item onto terrain at specified coordinates. |
| `DUPE` | `DUPE [amount]` | Creates identical duplicate instances of the item. |
| `EQUIP` | `EQUIP [char_uid]` | Equips item onto target character paperdoll layer. |
| `UNEQUIP` | `UNEQUIP` | Removes item from paperdoll layer and puts into backpack. |
| `REPAIR` | `REPAIR [skill_level]` | Restores durability hits up to `MORE1H` maximum. |
| `SMELT` | `SMELT` | Recycles metallic item back into ingot resources. |
| `USE` | `USE` | Simulates double-click usage on the item. |
| `USEDOOR` | `USEDOOR` | Toggles open/closed state on door items (`IT_DOOR`). |
