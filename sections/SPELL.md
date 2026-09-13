# Section: [SPELL]

> `[SPELL s_*]` configures spell parameters, reagent costs, target requirements, visual effects, and script triggers for Magery, Necromancy, Chivalry, Bushido, Ninjitsu, Spellweaving, and Mysticism spells.

---

## Syntax

```scp
[SPELL s_flame_strike]
DEFNAME = s_flame_strike
NAME = Flame Strike
SOUND = snd_spell_flame_strike
RUNES = KSS
CAST_TIME = 2.5
RESOURCES = 1 i_reag_spider_silk, 1 i_reag_sulfur_ash
REROLL = 100.0
FLAGS = spellflag_harm | spellflag_targ_obj | spellflag_fx_targ | spellflag_damage
LAYER = layer_spell_stats
EFFECT_ID = i_fx_flame_strike
DURATION = 0
MANAUSE = 40
SKILLREQ = Magery 70.0

ON=@Success
    // Executed right before spell effect applies

ON=@Effect
    // Executed when spell effect hits target
    // argn1 = spell number
    // argn2 = caster power
```

---

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `NAME` | String | Spell name. |
| `SOUND` | Defname / Int | SFX played upon casting or detonation. |
| `RUNES` | String | Magery rune letters spoken by the caster (`VAS FLAM`, `IN LOR`). |
| `CAST_TIME` | Float | Cast duration in seconds before targeting prompt appears. |
| `RESOURCES` | List | Reagents deducted upon casting initiation. |
| `MANAUSE` | Integer | Mana points deducted upon successful cast. |
| `SKILLREQ` | Skill List | Minimum skill level required to cast. |
| `FLAGS` | Bitmask | Spell behavior flags (`SPELLFLAG_HARM`, `SPELLFLAG_TARG_CHAR`, `SPELLFLAG_TARG_XYZ`, `SPELLFLAG_SCRIPTED`, `SPELLFLAG_AREA`). |
| `LAYER` | Defname | Status memory layer equipped if the spell applies a continuous buff/debuff (`LAYER_SPELL_STATS`, `LAYER_SPELL_POISON`). |
| `EFFECT_ID` | Itemdef | Graphic artwork ID spawned at target during effect execution. |
| `EFFECT` | `Min,Max` | Numeric power or damage formula. |
| `DURATION` | Seconds/Formula| Lifetime of the spell effect memory object. |

---

## Supported Triggers

| Trigger | Description |
| :--- | :--- |
| `ON=@Select` | Fired when the spell is chosen from spellbook/wand. `argn1`=spell, `argn2`=mana, `argn3`=test flag. |
| `ON=@Cast` / `ON=@Start` | Fired when casting begins. `argn1`=spell, `argn2`=difficulty, `argn3`=delay ticks. |
| `ON=@Success` | Fired when casting finishes successfully before effect dispatch. |
| `ON=@Effect` | Fired when the spell impact hits the target. `argn1`=spell, `argn2`=power. |
| `ON=@Fail` | Fired when casting fizzles or is aborted. |
