# SphereScripting Quality Standards & Architecture Guide

> Comprehensive engineering standard for AI agents authoring, refactoring, and maintaining SphereScript in **SphereServer X (Source-X)**.

---

## 1. Core Interpreter & Memory Invariants (C++ Engine)

### 1.1 Strict Object Validity (`ISVALID`)
> **INVARIANT 1.1**: The Source-X script interpreter enforces strict null safety. Accessing any property or verb on an invalid or unassigned pointer (e.g. `<ref1.hits>` when `ref1` is null) produces a script error.

```scp
// ❌ WRONG: Causes runtime error if link or ref is not set
local.ownerName = <link.name>
if (<ref1.hits> < 50)

// ✅ CORRECT: Explicitly verified with ISVALID
if (<link.isvalid>)
    local.ownerName = <link.name>
endif

if (<ref1.isvalid>) && (<ref1.hits> < 50)
    // Short-circuit lazy evaluation guarantees safe execution
endif
```

### 1.2 Mathematical Arithmetic & Evaluation (`<eval>`, `<muldiv>`)
> **INVARIANT 1.2**: SphereScript strings are not automatically cast to integers in assignments. All arithmetic must be enclosed in `<eval ...>` or `<muldiv ...>`.

```scp
// ❌ WRONG: Produces string concatenation "10+5"
tag.count = <tag.count>+5

// ✅ CORRECT:
tag.count = <eval <tag.count> + 5>

// ✅ CORRECT for percentages: Prevents 32-bit integer overflow
local.bonus = <muldiv <argn1>, 25, 100>
```

### 1.3 Decimal Indirection in Dynamic Tag Keys (`<dlocal.X>`, `<dtag0.X>`)
> **INVARIANT 1.3**: When embedding variables inside another tag or definition name, always force decimal evaluation using the `d` prefix (`<dlocal.X>`, `<dtag0.X>`).

```scp
// ❌ WRONG: Parser treats <local.i> literally inside the key
tag0.quest.<local.i>.complete = 1

// ✅ CORRECT:
tag0.quest.<dlocal.i>.complete = 1
local.propName = <def.ItemProp<local.ItemType>_<dlocal.GetProp>>
```

### 1.4 Resource ID vs Constant Lookups (`RESDEF` vs `DEF`)
> **INVARIANT 1.4**: In Source-X, use `<RESDEF.name>` to retrieve the integer resource ID of an item/char/spell definition, and `<DEF.name>` strictly for constants declared in `[DEFNAME]` blocks.

---

## 2. Idiomatic UOAscension Scripting Patterns

### 2.1 Dialog Management & Packet Safety
When opening or updating custom client gumps (`[DIALOG d_*]`):
1. Clear temporary transient session state (`ctag.quest`, `ctag.view`).
2. Close any existing conflicting dialogs before rendering new ones (`dialogclose d_OldMenu`).
3. Use `f_ResendDialog d_Menu` or `trysrc <uid> f_resenddialog d_Menu` to ensure packet delivery without client desync.

```scp
[FUNCTION f_OpenQuestLog]
ctag.quest
ctag.view
dialogclose d_QuestNPCs
f_ResendDialog d_QuestPlayers
```

### 2.2 Tag Architecture & Namespace Segmentation
Organize custom persistent data on characters and items using structured dot-hierarchies:
- **Quest System**: `tag0.quests` (total count), `tag0.quest.<slot>.id`, `tag0.quest.<slot>.complete`, `tag0.quest.<slot>.quester`.
- **Combat & Sockets**: `tag0.Faction`, `tag.HitSpecialMove`, `tag0.SkillMod`, `tag0.SkillMod<skill_id>`, `TAG.LastHit`.
- **Housing**: `tag0.HouseCustom`, `tag0.MovingCrate`.

### 2.3 Dynamic DEFNAME Reflection
Avoid massive, repetitive `if/elif/else` switch trees by leveraging dynamic DEFNAME dictionary reflection:

```scp
// Data Definition:
[DEFNAME item_properties_weapons]
ItemPropWeaponAmount        10
ItemPropWeapon_1            1,IncreaseDam,10,35
ItemPropWeapon_2            2,HitLightning,5,20

// Dynamic Execution Loop:
while (<local.LuckProps> > 0)
    local.GetProp = <r1,<def.ItemProp<local.ItemType>Amount>>
    local.Flag = <f_GetARGV 0 <def.ItemProp<local.ItemType>_<dlocal.GetProp>>>
    if (<local.UsedProps> & <local.Flag>)
        continue
    endif
    args = <def.ItemProp<local.ItemType>_<dlocal.GetProp>>
    uid.<uid>.<argv[1]> = <r<argv[2]>,<argv[3]>>
    local.UsedProps |= <argv[0]>
    local.LuckProps -= 1
enddo
```

### 2.4 User Feedback & Message Formatting
- Use `@,,1` for standard shard system messages with client-configured text colors.
- Use explicit hues (`@044` for positive/green, `@020` for errors/red, `@038a` for info).
- Write user-facing strings in Spanish following the project convention.

```scp
src.sysmessage @,,1 Has alcanzado el limite de amigos (<ddef.UOA_HouseMaxFriends>).
src.sysmessage @020 No tienes suficiente oro para completar la transaccion.
```

### 2.5 Multi & Ship Storage Referencing
- **Houses**: Always reference dedicated storage via `<ref1.movingcrate.uid>`, `<ref1.sign.uid>`, or iterate over `<ref1.coowners>`, `<ref1.friends>`, `<ref1.lockdowns>`, `<ref1.securecontainers>`.
- **Ships**: Reference ship hold storage via `<ship.hold.uid>` or `<ship.hatch.uid>`, tillerman via `<ship.tiller.uid>`, and planks via `<ship.plank.<idx>.uid>`.

---

## 3. Code Checklist for Scripters & Agents

Before finalizing any `.scp` script:
- [ ] File begins with header comment and `VERSION=X1`.
- [ ] File ends with `[EOF]`.
- [ ] All loops have safety exit bounds (no potential infinite loops).
- [ ] All arithmetic operations are wrapped in `<eval>` or `<muldiv>`.
- [ ] All dynamic array/tag indices use decimal `d` formatting (`<dlocal.X>`).
- [ ] All entity pointer queries (`link`, `owner`, `argo`, `ref*`) are guarded with `ISVALID`.
- [ ] File is encoded in **ANSI / Latin-1** (ISO-8859-1).
- [ ] Indentation uses **tabs**.
