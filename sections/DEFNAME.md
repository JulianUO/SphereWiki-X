# Section: [DEFNAME]

> `[DEFNAME name]` defines a global preprocessor symbol table containing named constants, bitmasks, string constants, formulas, or color palettes.

---

## Syntax

```scp
[DEFNAME server_constants]
max_party_members       10
default_bank_capacity   125
pvp_cooldown_seconds    120

[DEFNAME hue_colors]
color_sysmsg_good       044
color_sysmsg_bad        020
color_sysmsg_info       038a

[DEFNAME weighted_loot_pools]
loot_rare_gems          { i_gem_ruby 1 i_gem_diamond 1 i_gem_star_sapphire 1 }
```

---

## Accessing Defnames

| Macro | Evaluates To | Example |
| :--- | :--- | :--- |
| `<def.name>` | Full raw string value of the defname constant. | `<def.color_sysmsg_good>` → `044` |
| `<def0.name>` | First token / word of the defname value. | `<def0.loot_rare_gems>` → `i_gem_ruby` |
| `<RESDEF.defname>` | **Resource ID** of an ITEMDEF, CHARDEF, or SPELL. | `<RESDEF.i_gold>` → integer ID |

---

## Source-X Defname Changes (X1 Invariant)

- In legacy 0.56 versions, `<DEF.i_gold>` was often used to retrieve the numeric identifier of a resource definition. In **Source-X (X1)**:
  - `<DEF.symbol>` is strictly used for constants declared in `[DEFNAME]` blocks.
  - `<RESDEF.resource_def>` must be used to retrieve resource definition numbers (e.g. `ID = <RESDEF.i_dagger>`).
- Use `[RESDEFNAME name]` to create aliases for resource defnames.
