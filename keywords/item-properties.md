# Item Properties & Verbs Reference (`CItem`)

> Properties and verbs queryable or settable on item entities (`<argo.PROPERTY>`, `<baseid>`, `<amount>`, `new.attr`).

---

## Core Item Properties

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `BASEID` | R | Defname | Base ITEMDEF symbolic identifier (`i_gold`, `i_sword_long`). |
| `ID` / `DISPID` | R/W | Hex / Def | Visual display artwork graphic ID. |
| `NAME` | R/W | String | Custom or default display name. |
| `AMOUNT` | R/W | Integer | Stack quantity. |
| `ATTR` | R/W | Bitmask | Attribute flags (`attr_magic`, `attr_newbie`, `attr_decay`, `attr_blessed`, `attr_questitem`). |
| `TYPE` | R/W | Defname | Item type identifier binding to `[TYPEDEF]`. |
| `COLOR` / `HUE` | R/W | Hex / Int | Artwork palette color tint. |
| `CONT` | R/W | UID | Parent container holding this item (if nested in inventory). |
| `TOPOBJ` | R | UID | Root top-level character or ground object containing this item. |
| `LAYER` | R/W | Defname | Equipment slot layer if equipped. |
| `WEIGHT` | R | Integer | Weight in stones (single item or total container contents). |
| `TIMER` | R/W | Seconds | Countdown timer until `@Timer` trigger or decay. |
| `LINK` | R/W | UID | Linked entity pointer. |
| `MORE1`, `MORE2`, `MOREP` | R/W | Data | Type-specific contextual metadata registers. |
| `MORE1L`, `MORE1H` | R/W | Integer | Low/High 16-bit words of `MORE1` (often used for item durability). |

---

## Core Item Verbs

| Verb | Syntax | Description |
| :--- | :--- | :--- |
| `REMOVE` | `remove` | Permanently deletes item from the game world. |
| `DROP` | `drop [coordinates]` | Drops item onto the ground at the current or specified position. |
| `DUPE` | `dupe [amount]` | Creates an identical clone of the item. |
| `USE` | `use` | Simulates a double-click interaction on the item. |
| `DECAY` | `decay` | Forces immediate natural item decay check. |
