# Section: [SKILL]

> `[SKILL skill_*]` configures properties, gain difficulty curves, sound/animation effects, and script triggers for each of the core Ultima Online skills.

---

## Syntax

```scp
[SKILL skill_hiding]
KEY = Hiding
TITLE = Rogue
FLAGS = SKF_SELECTABLE
DELAY = 2.0
ADV_RATE = 10.0,200.0,800.0
VALUES = 1,10,100

ON=@Start
    if (<statf_war>)
        sysmessage You cannot hide while in war mode!
        return 1
    endif

ON=@Success
    statf |= statf_hidden
    sysmessage You have hidden yourself well.
    return 1

ON=@Fail
    sysmessage You cant seem to hide here.
```

---

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `KEY` | String | Skill name keyword identifier (`Magery`, `Swordsmanship`). |
| `TITLE` | String | Paperdoll profession suffix title awarded at Grandmaster level. |
| `FLAGS` | Bitmask | Skill behavior flags (`SKF_SCRIPTED`, `SKF_FIGHT`, `SKF_MAGIC`, `SKF_CRAFT`, `SKF_IMMOBILE`, `SKF_SELECTABLE`, `SKF_GATHER`, `SKF_DISABLED`). |
| `DELAY` | Float / Ticks | Time delay in seconds before skill execution resolves. |
| `ADV_RATE` | `Low,Med,High` | Skill advancement curve defining difficulty steps to gain. |
| `STAT_STR`, `STAT_DEX`, `STAT_INT` | Percent | Percentage weight contributing to primary stat gains. |
| `GAINRADIUS` | Integer | Maximum distance to targets to qualify for skill gain rolls. |

---

## Supported Triggers

| Trigger | Description |
| :--- | :--- |
| `ON=@Start` / `ON=@SkillStart` | Fired when skill activation begins. `argn1` = skill index, `argn2` = difficulty. |
| `ON=@Stroke` / `ON=@SkillStroke` | Fired on intermediate action pulses (e.g. blacksmithing hammer swings). |
| `ON=@Success` / `ON=@SkillSuccess` | Fired when skill check passes difficulty roll. |
| `ON=@Fail` / `ON=@SkillFail` | Fired when skill check fails difficulty roll. |
| `ON=@Abort` / `ON=@SkillAbort` | Fired when skill action is cancelled before reaching completion. |
| `ON=@Gain` / `ON=@SkillGain` | Fired on skill gain check. `argn1`=skill, `argn2`=gain chance, `argn3`=skill cap. |
| `ON=@SkillMakeItem` | Fired when a crafting skill produces a target item (`argo`). |
