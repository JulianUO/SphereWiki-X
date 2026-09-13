# SphereScript — Triggers

> A trigger is a named event handler declared with `ON=@EventName` inside a section block or EVENTS section. The engine fires triggers in response to game events, passing data via `argn*`, `argo`, and `args`.

---

## Anatomy of a Trigger

```scp
ON=@DClick
    // This code runs when a player double-clicks this object.
    // SRC = the character who clicked.
    // The object itself is accessible via its own properties (NAME, UID, etc.)
    SRC.SYSMESSAGE You double-clicked <name>!
    return 1    // Cancel default action (don't open container, etc.)
```

---

## Trigger Precedence & Execution Order

When a game event fires, SphereScript looks for the trigger handler in this order:

1. **TYPEDEF** attached to the object's `TYPE` value (e.g., `[TYPEDEF t_door]`)
2. **ITEMDEF / CHARDEF** block where the object was defined
3. **EVENTS** sections attached to the object via `EVENTS=+e_something`

Multiple EVENTS sections are checked in the order they were added. Returning `1` from any handler **stops** further propagation.

> In `[EVENTS]` sections the trigger `ON=@EventName` fires even if the `[ITEMDEF]` / `[CHARDEF]` already handled it — unless the ITEMDEF returned `1`.

---

## Return Values

Most triggers accept 3 return values:

| Return | Constant | Meaning |
| --- | --- | --- |
| `return 1` | `RET_TRUE` | **Cancel** — prevent the default engine action |
| `return 0` | `RET_FALSE` | **Succeed** — continue with default action |
| `return 2` | `RET_DEFAULT` | **Default** — usually same as `return 0`; specific triggers differ |

> **No `return`** (falling off the end) is equivalent to `return 0`.

Specific trigger exceptions are documented in [`09-return-values.md`](09-return-values.md) and in each trigger's entry in [`../triggers/`](../triggers/INDEX.md).

---

## IN / OUT / RET Convention

Throughout this documentation, triggers are described with:

- **IN**: Variables set by the engine before calling the trigger (read them).
- **OUT**: Variables the engine reads back after the trigger (modify them to change behavior).
- **RET**: Effect of each possible `return N` value.

---

## Global Trigger Resolution

Triggers can also be declared globally using the `[PLEVEL]` and function naming convention. See [`../triggers/server-triggers.md`](../triggers/server-triggers.md) for `f_onserver_*`, `f_onaccount_*`, `f_onchar_*` etc.

---

## Trigger Catalog Index

| Category | Reference |
| --- | --- |
| **Character triggers** | [`../triggers/char-triggers.md`](../triggers/char-triggers.md) |
| **Item triggers** | [`../triggers/item-triggers.md`](../triggers/item-triggers.md) |
| **Skill triggers** | [`../triggers/skill-triggers.md`](../triggers/skill-triggers.md) |
| **Spell triggers** | [`../triggers/spell-triggers.md`](../triggers/spell-triggers.md) |
| **Region triggers** | [`../triggers/region-triggers.md`](../triggers/region-triggers.md) |
| **Server / global** | [`../triggers/server-triggers.md`](../triggers/server-triggers.md) |
| **Dialog (gump)** | [`../triggers/dialog-triggers.md`](../triggers/dialog-triggers.md) |
| **TYPEDEF** | [`../triggers/typedef-triggers.md`](../triggers/typedef-triggers.md) |

---

## Quick Reference — Most Used Triggers

### Character

| Trigger | Fires when | Key vars |
| --- | --- | --- |
| `@Create` | Char/item instance created | — |
| `@Click` | Single click | `src` = clicker |
| `@DClick` | Double click | `src` = clicker |
| `@Death` | Char dies | `src` = killer |
| `@Kill` | Char kills another | `src` = victim |
| `@DeathCorpse` | After death, corpse created | `argo` = corpse |
| `@Hit` | Landing a melee hit | `argo` = weapon, `argn1` = damage |
| `@GetHit` | Receiving a melee hit | `argn1` = damage, `argn2` = dam type |
| `@HitTry` | Before hit attempt | `argo` = weapon |
| `@HitMiss` | Hit attempt misses | `argo` = weapon |
| `@HitCheck` | Before each swing (X1) | — |
| `@NPCActFight` | NPC AI fight tick | `argn1` = distance, `argn2` = motivation |
| `@NPCActFollow` | NPC AI follow tick | `argn1` = fleeing, `argn2` = max dist |
| `@NPCRestock` | NPC vendor restocks | — |
| `@NPCSeeNewPlayer` | NPC notices a player | `argo` = player |
| `@NPCLookAtItem` | NPC considers picking up item | `argo` = item |
| `@NPCLookAtChar` | NPC considers targeting char | `argo` = char |
| `@LogIn` | Player logs in | — |
| `@Logout` | Player logs out | — |
| `@Step` | Char walks onto a tile | `argn1` = 1 if standing, 0 if stepping in |
| `@PersonalSpace` | Char bumps into another | `argn1` = stamina cost |
| `@RegionEnter` | Char enters a region | `argo` = region |
| `@RegionLeave` | Char leaves a region | `argo` = region |
| `@KarmaChange` | Karma changes | `argn1` = delta |
| `@FameChange` | Fame changes | `argn1` = delta |
| `@SeeCrime` | Char witnesses a crime | — |
| `@NotoSend` | Notoriety color computed | `argn1` = noto value |
| `@UserQuestButton` | Quest paperdoll button pressed | — |
| `@UserQuestArrowClick` | Arrow click | — |
| `@ContextMenuRequest` | Context menu opens | — |
| `@ContextMenuSelect` | Context menu item selected | `argn1` = menu entry ID |
| `@ClientTooltip` / `@CharClientTooltip` | Tooltip hover | — |
| `@DamageGiven` | Char deals damage | `argn1` = damage, `argn2` = dam type |
| `@Damage` | Char takes any damage | `argn1` = damage, `argn2` = dam type |
| `@PayGold` | Gold payment made | `argn1` = amount, `argn2` = type |
| `@MountRequest` | Char attempts to mount | `argo` = mount |

### Item

| Trigger | Fires when | Key vars |
| --- | --- | --- |
| `@Create` | Item created | — |
| `@Click` | Single click | `src` = clicker |
| `@DClick` | Double click | `src` = clicker |
| `@AfterClick` | After single click label drawn | — |
| `@Step` / `@ItemStep` | Char steps on item | `argn1` = 1 standing, 0 stepping |
| `@DropOn_Char` / `@ItemDropOn_Char` | Item dropped on char | `argo` = item dropped, `src` = dropper |
| `@DropOn_Item` / `@ItemDropOn_Item` | Item dropped on item | `argo` = item where dropped |
| `@DropOn_Self` / `@ItemDropOn_Self` | Item dropped on itself | `argo` = item |
| `@DropOn_Ground` / `@ItemDropOn_Ground` | Item dropped on ground | `args` = new position (X1: fired BEFORE P is set) |
| `@Pickup_Self` | Item picked up (on item with trigger) | `src` = who picks up |
| `@itemEquip` | Item equipped | `src` = char equipping |
| `@itemUnEquip` | Item unequipped | `src` = char unequipping |
| `@itemPickup_Stack` | Item stack split/picked up | — |
| `@Destroy` | Item destroyed | — |
| `@Timer` | Item's timer expires | — |
| `@ClientTooltip` / `@ItemClientTooltip` | Tooltip hover (X1) | — |

### Skill

| Trigger | Fires when | Key vars |
| --- | --- | --- |
| `@SkillStart` / `@Start` | Skill begins | `argn1` = skill, `argn2` = difficulty |
| `@SkillStroke` / `@Stroke` | Intermediate skill pulse | — |
| `@SkillSuccess` / `@Success` | Skill succeeds | `argn1` = skill, `argn2` = difficulty |
| `@SkillFail` / `@Fail` | Skill fails | — |
| `@SkillAbort` / `@Abort` | Skill interrupted/cancelled | — |
| `@SkillGain` / `@Gain` | Skill gain roll | `argn1` = skill, `argn2` = gain chance, `argn3` = cap |
| `@SkillMakeItem` | Crafting skill creates an item | `argo` = item created |

### Spell

| Trigger | Fires when | Key vars |
| --- | --- | --- |
| `@SpellSelect` / `@Select` | Spell selected to cast | `argn1` = spell, `argn2` = mana, `argn3` = test-only flag |
| `@SpellCast` / `@Start` | Spell cast initiated | `argn1` = spell, `argn2` = difficulty, `argn3` = delay ticks, `argo` = scroll/wand |
| `@SpellSuccess` / `@Success` | Spell cast succeeds pre-effect | `argn1` = spell, `argn2` = skill level |
| `@SpellEffect` / `@Effect` | Spell effect fires | `argn1` = spell, `argn2` = skill level |
| `@SpellFail` / `@Fail` | Spell fails/fizzles | `argn1` = spell |
| `@SpellInterrupt` | Spell interrupted (e.g., by damage) | `src` = interrupter |

### Region

| Trigger | Fires when | Key vars |
| --- | --- | --- |
| `@Enter` | Char enters region | `src` = char |
| `@Leave` | Char leaves region | `src` = char |
| `@Step` | Char steps in region | `src` = char |
| `@ResourceTest` | Resource gather test | `src` = player |
| `@ResourceFound` | Resource found | `argo` = resource gem |
| `@RegionResourceGather` | Resource gathered amount | `argn1` = amount |

### Server (Global Functions)

See [`../triggers/server-triggers.md`](../triggers/server-triggers.md) for:
- `f_onserver_start` / `f_onserver_exit`
- `f_onserver_save` / `f_onserver_save_ok` / `f_onserver_save_fail` / `f_onserver_save_finished`
- `f_onserver_timer`
- `f_onaccount_connect` / `f_onaccount_login` / `f_onaccount_create` / `f_onaccount_delete` / `f_onaccount_pwchange`
- `f_onchar_create_init` / `f_onchar_create` / `f_onchar_delete`
- `f_oncommand` (override `.command`)
- `f_onserver_blockip` / `f_onserver_connectreq_ex` / `f_onserver_connection_acquired`
