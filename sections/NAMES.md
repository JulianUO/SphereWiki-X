# Section: [NAMES]

> `[NAMES n_*]` defines lists of character names randomly selected during NPC instantiation via `#NAMES_*` macros.

---

## Syntax

```scp
[NAMES n_human_male]
Aaron
Alan
Alexander
Arthur
Brian
Cedric
Daniel
Edward
Geoffrey
```

---

## Usage in [CHARDEF]

```scp
[CHARDEF c_blacksmith]
NAME = #NAMES_HUMANMALE the Blacksmith
ID = c_man
```
