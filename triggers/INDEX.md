# Trigger Reference — Master Index

> Triggers in SphereServer provide the event-driven bridge between engine actions and SphereScript. This catalog documents all triggers, their calling contexts, input variables (`IN`), output variables (`OUT`), and return value codes (`RET`).

---

## Trigger Categories

| Category | File | Description |
| :--- | :--- | :--- |
| **Character Triggers** | [`char-triggers.md`](char-triggers.md) | Combat, movement, death, AI, perception, interaction, login. |
| **Item Triggers** | [`item-triggers.md`](item-triggers.md) | Equipping, double clicking, dropping, stepping, tooltips, decay timers. |
| **Skill Triggers** | [`skill-triggers.md`](skill-triggers.md) | Skill startup, stroke pulses, success, failure, abort, gain calculations. |
| **Spell Triggers** | [`spell-triggers.md`](spell-triggers.md) | Selection, pre-casting, mana deduction, effect application, fizzle. |
| **Region Triggers** | [`region-triggers.md`](region-triggers.md) | Entering, leaving, stepping across spatial zones, resource tests. |
| **Server Triggers** | [`server-triggers.md`](server-triggers.md) | Startup, shutdown, worldsave stages, account logins, char creations. |
| **Dialog Triggers** | [`dialog-triggers.md`](dialog-triggers.md) | Gump button clicks, text entries, radio selections, closures. |
| **TYPEDEF Triggers** | [`typedef-triggers.md`](typedef-triggers.md) | Specialized item type interactions (doors, containers, scrolls, keys). |

---

## Trigger Variable Summary

- `SRC`: The initiating character or object actor.
- `ARGO`: The secondary object involved (corpse, item, weapon).
- `ARGN1`, `ARGN2`, `ARGN3`: Numeric parameters (damage, spell id, distance).
- `ARGS`: Text parameters (speech, command string, target location).
- `LOCAL.*`: Local stack variables inside the trigger execution.
