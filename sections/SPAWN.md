# Section: [SPAWN]

> `[SPAWN s_*]` defines weighted spawn groups used by spawn items (`t_spawn_char`, `t_spawn_item`) to randomly generate diverse encounters and loot in a given area.

---

## Syntax

```scp
[SPAWN s_orc_camp]
DEFNAME = s_orc_camp
ID = c_orc, 50
ID = c_orc_archer, 25
ID = c_orc_mage, 15
ID = c_orc_lord, 10
```

---

## Directives

| Directive | Description |
| :--- | :--- |
| `ID = char_or_item_def, weight` | Adds a possible entity to the spawn table with relative probability weight. |
