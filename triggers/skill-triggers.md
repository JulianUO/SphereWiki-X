# Skill Triggers Reference

> Triggers executing inside `[SKILL skill_*]` blocks, controlling skill execution loops, success formulas, failure cleanup, and gain calculations.

---

## Trigger Lifecycle

```
[Character activates skill]
        │
        ▼
   @SkillStart  ────────► (return 1: aborts skill)
        │
        ▼
   @SkillStroke (Intermediate pulses / crafting swings)
        │
        ▼
 [Difficulty Check: Success or Failure?]
      ├───► Success: @SkillSuccess ───► @SkillGain
      │
      ├───► Fail:    @SkillFail    ───► @SkillGain (if fail gain enabled)
      │
      └───► Abort:   @SkillAbort   ───► (No skill gain check)
```

---

## Trigger Definitions

### `@SkillStart` / `@Start`
Fired immediately upon initiating skill usage.
- **IN**:
  - `ARGN1`: Skill number / defname.
  - `ARGN2`: Base difficulty calculated for the action.
- **OUT**:
  - `ARGN2`: Modified difficulty.
- **RET**:
  - `1`: Cancels skill activation.

### `@SkillStroke` / `@Stroke`
Fired during periodic intermediate intervals of continuous skills (e.g. Blacksmithing, Mining, Bowcrafting).
- **RET**:
  - `1`: Aborts further strokes.

### `@SkillSuccess` / `@Success`
Fired when the player successfully rolls against the skill difficulty.
- **IN**:
  - `ARGN1`: Skill number.
  - `ARGN2`: Base difficulty.
- **RET**:
  - `1`: Suppresses default success outcome and hardcoded sound/animations.

### `@SkillFail` / `@Fail`
Fired when the player fails the difficulty roll.
- **IN**:
  - `ARGN1`: Skill number.
- **RET**:
  - `1`: Suppresses failure gain check and failure messages.

### `@SkillAbort` / `@Abort`
Fired when a skill is interrupted before completion (e.g. taking damage, moving, or setting `ACTION=-1`).
- **RET**:
  - `1`: Suppresses default cancellation effects (fizzle animations).
- **Note**: Aborted skills **never** yield skill gain rolls, protecting against macro exploits.

### `@SkillGain` / `@Gain`
Fired whenever the engine evaluates if a skill should increase in value.
- **IN**:
  - `ARGN1`: Skill number.
  - `ARGN2`: Gain probability percentage.
  - `ARGN3`: Hard cap for the skill.
- **OUT**:
  - `ARGN2`: Modified gain chance.
- **RET**:
  - `1`: Prevents skill value from increasing.

### `@SkillMakeItem`
Fired when a crafting skill creates a finished item.
- **IN**:
  - `ARGO`: The newly created crafted item (`CItem`).
