# Spell Triggers Reference

> Triggers executing inside `[SPELL s_*]` blocks or on characters receiving magical effects.

---

## Spell Pipeline

```
[Cast Spell Request]
        │
        ▼
   @SpellSelect  ────────► (return 1: cannot select spell)
        │
        ▼
   @SpellCast    ────────► (return 1: cast fails; mana/reagents spared)
        │
 [Cast Delay / Targeting Prompt]
        │
        ▼
   @SpellSuccess ────────► (return 1: spell fails right before effect)
        │
        ▼
   @SpellEffect  ────────► (return 1: cancel effect / return 0: scripted mode)
```

---

## Trigger Definitions

### `@SpellSelect` / `@Select`
Fired when a spell is selected from a spellbook, scroll, or wand.
- **IN**:
  - `ARGN1`: Spell ID.
  - `ARGN2`: Mana cost.
  - `ARGN3`: `1` if test query (`CanCast`), `0` if actual cast attempt.
  - `ARGO`: Object magic is cast from (wand, scroll, spellbook, or character itself).
- **OUT**:
  - `ARGN1`, `ARGN2`.
- **RET**:
  - `1`: Spell cannot be selected.
  - `0`: Allows spell selection and skips further hardcoded tests.
  - `2`: Standard validation checks.

### `@SpellCast` / `@Start`
Fired when casting begins and cast delay starts.
- **IN**:
  - `ARGN1`: Spell ID.
  - `ARGN2`: Casting difficulty.
  - `ARGN3`: Cast delay in tenths of a second (ticks).
  - `ARGO`: Casting source item.
- **OUT**:
  - `ARGN1`, `ARGN2`, `ARGN3`.
- **RET**:
  - `1`: Aborts casting immediately.

### `@SpellSuccess` / `@Success`
Fired when casting is successfully completed right before effect dispatch.
- **IN**:
  - `ARGN1`: Spell ID.
  - `ARGN2`: Effective skill level of caster.
  - `ARGO`: Source item.
- **OUT**:
  - `ARGN2`.
- **RET**:
  - `1`: Spell fails.

### `@SpellEffect` / `@Effect`
Fired when the spell impact hits the targeted character, item, or location.
- **IN**:
  - `ARGN1`: Spell ID.
  - `ARGN2`: Skill level of caster.
  - `ARGO`: Source item.
- **OUT**:
  - `ARGN1`, `ARGN2`.
- **RET**:
  - `1`: Cancels spell effect completely.
  - `0`: For spells with `SPELLFLAG_SCRIPTED`, succeeds but suppresses hardcoded C++ mechanics.
  - `2`: Executes hardcoded engine spell logic.

### `@SpellFail` / `@Fail`
Fired when spellcasting fizzles.
- **IN**:
  - `ARGN1`: Spell ID.
  - `ARGO`: Source item.
- **RET**:
  - `1`: Fails silently (no fizzle sound, reagents/mana not lost).
  - `0`: Suppresses hardcoded fizzle.
  - `2`: Standard hardcoded fizzle.
