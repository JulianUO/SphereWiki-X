# SphereScript — Variables & Scope

> SphereScript has several distinct variable namespaces, each with different lifetime, scope, and persistence characteristics.

---

## Variable Types at a Glance

| Syntax | Namespace | Lifetime | Persists to save? | Description |
| --- | --- | --- | --- | --- |
| `local.X` | Function/trigger stack | Current call only | No | Temporary work variable |
| `tag.X` / `tag0.X` | Object (char/item) | Object lifetime | **Yes** | Persistent custom property |
| `ctag.X` / `ctag0.X` | Object (char/item) | Server session | No | Session-only tag (lost on logout/restart) |
| `var.X` / `var0.X` | Global server | Server session | No | Global variable accessible from anywhere |
| `ref1` … `ref5` | Current call context | Current call only | No | Assignable object reference |
| `argn` / `argn1` / `argn2` / `argn3` | Trigger/function call | Current call | No | Numeric arguments from trigger/caller |
| `args` | Trigger/function call | Current call | No | String argument |
| `argo` | Trigger context | Current trigger | No | Object argument (item in drop, etc.) |
| `argv[N]` | Function call | Current call | No | N-th argument passed to a `[FUNCTION]` |
| `def.X` / `def0.X` | DEFNAME block | Entire session | No (in scripts) | Constant defined in `[DEFNAME]` |

---

## `local.X` — Local Variables

```scp
[FUNCTION f_example]
local.count = 0
local.name = Hero
local.count += 1
sysmessage Count is <local.count>
```

- Scoped to the current **function or trigger invocation**.
- Destroyed when the function/trigger returns.
- **Cannot** be accessed from called sub-functions — each call has its own stack frame.
- Name is case-insensitive: `local.Count` and `local.count` are the same.
- `<dlocal.X>` reads the value and forces **decimal numeric interpretation** (useful as dynamic index):

```scp
local.idx = 3
tag0.quest.<dlocal.idx>.complete = 1   // Sets tag0.quest.3.complete
```

---

## `tag.X` / `tag0.X` — Persistent Object Tags

```scp
tag.QuestProgress = 5        // Set (write)
<tag.QuestProgress>          // Read → "5"
tag.QuestProgress += 1       // Increment
tag.QuestProgress =          // Clear (set empty)
```

- Stored **on a char or item object**.
- **Persist to save files** (`sphereworld.scp`, `spherechars.scp`).
- `tag.X` and `tag0.X` are **identical** — the `0` suffix is a legacy notation. Same storage.
- `<dtag0.X>` forces decimal numeric read (avoids string concatenation pitfalls):

```scp
// WRONG — reads tag0.quest.local.x literally:
<tag0.quest.<local.x>.id>

// CORRECT — evaluates local.x as decimal first:
<tag0.quest.<dlocal.x>.id>
```

- Setting a tag to empty string effectively **deletes** it:
  ```scp
  tag.MyProp =         // Clears the tag
  ```

### `TAG.OVERRIDE.*` — Special Override Tags

Some engine properties can be overridden per-object using specific `TAG.OVERRIDE.*` or `TAG.*` names defined by the core. See [`keywords/char-properties.md`](../keywords/char-properties.md) and [`keywords/item-properties.md`](../keywords/item-properties.md) for the full list.

---

## `ctag.X` / `ctag0.X` — Session Tags (Non-Persistent)

```scp
ctag.CurrentTarget = <src.uid>   // Set
<ctag.CurrentTarget>             // Read
```

- Same as `tag` but **NOT saved to disk**.
- Lost when the server restarts or the character logs out (depending on implementation).
- Useful for session state: current dialog context, temporary cooldowns, UI state.
- `ctag0.X` and `ctag.X` are identical.

---

## `var.X` / `var0.X` — Global Server Variables

```scp
var.WorldClock = <new.uid>      // Set globally
<var0.WorldClock>               // Read from anywhere
```

- Accessible from **any script context**, on any object.
- Not tied to any specific object.
- **Not persisted to save** by default (unless using `var0.*` and explicitly saved).
- Use `var` for server-wide state like timers, world events, flags.

---

## `ref1` … `ref5` — Object References

```scp
ref1 = <src.uid>         // Assign UID of src to ref1
<ref1.name>              // Access name of that object
ref1.color = 0x44        // Modify property on referenced object

ref2 = <findlayer.layer_pack.uid>
forcont <ref2.uid>
    // iterate pack contents
endfor
```

- `ref1` through `ref5` hold **UIDs of game objects**.
- Once assigned, all `<ref1.PROPERTY>` accesses operate on that object.
- Assigning an invalid UID is valid (ref becomes invalid, accessing it returns error in X1).
- Use `<ref1.isvalid>` to check before accessing.
- Useful to avoid repeated lookups of the same object.

---

## `argn`, `argn1`, `argn2`, `argn3` — Numeric Trigger Arguments

Each trigger defines which `argn*` variables are set as **IN** (read from engine) and which can be modified as **OUT** (written back to engine):

```scp
ON=@GetHit
    // argn1 = damage being applied (IN/OUT)
    // argn2 = damage type flags (IN/OUT)
    if <argn2> & dam_fire
        argn1 -= <muldiv <argn1>,25,100>  // -25% fire damage
    endif
```

- `argn` is an alias for `argn1`.
- `argn1`, `argn2`, `argn3` are separate numeric slots.
- Modifying them in a trigger affects the engine's behavior (OUT semantics).
- See [`../triggers/`](../triggers/INDEX.md) for the specific IN/OUT per trigger.

---

## `args` — String Trigger Argument

```scp
ON=@Say
    // args = what the char said
    if (strmatch(guard*,<args>))
        // player said something starting with "guard"
    endif
```

- `args` is a string argument, context-dependent per trigger.
- In `[FUNCTION]` calls: `args` = the raw argument string passed to the function.
- `<strarg <args>>` — returns the first word of `args`.
- `<streat <args>>` — returns everything AFTER the first word.

---

## `argo` — Object Argument

```scp
ON=@DropOn_Char
    // argo = the item being dropped
    if <argo.baseid> == i_gold
        <argo.remove>
        hits += 10
    endif
```

- `argo` is the **object involved** in certain triggers (the dropped item, the corpse, etc.).
- Access its properties with `<argo.PROPERTY>`.
- Not all triggers set `argo` — consult the trigger catalog.

---

## `argv[N]` — Function Arguments by Index

```scp
[FUNCTION f_DoSomething]
// Called as: f_DoSomething arg0,arg1,arg2
local.type   = <argv[0]>
local.amount = <argv[1]>
local.target = <argv[2]>
```

- Arguments passed to a `[FUNCTION]` are accessed via `<argv[0]>`, `<argv[1]>`, etc.
- **Zero-indexed**.
- If fewer arguments are passed than referenced, the missing ones return empty string.
- The raw argument list is also in `<args>`, parseable with `<strarg <args>>` (first word) and `<streat <args>>` (rest).

---

## `def.X` / `def0.X` — DEFNAME Constants

```scp
// In a [DEFNAME] block:
[DEFNAME myconsts]
max_quest_slots   8
hue_error         0044

// In code:
if <tag0.quests> >= <def.max_quest_slots>
    sysmessage Quest slot limit reached!
endif
color = <def.hue_error>
```

- `<def.X>` returns the **full value** (string).
- `<def0.X>` returns the **first word/token** of the value.
- `<RESDEF.i_gold>` — returns the **numeric resource ID** of a named resource (replaces old `<DEF.i_gold>` for this purpose in X1).
- Constants are **global** — accessible from any script.
- Redefinition of a DEFNAME is warned (even without `DEBUGF_SCRIPTS`).

---

## Scope Pitfalls

### 1. Arithmetic without `<eval>`

```scp
// WRONG — string concatenation:
tag.count = <tag.count>+1   // Result: "5+1" not "6"

// CORRECT:
tag.count = <eval <tag.count>+1>
```

### 2. Dynamic index without `d` prefix

```scp
// WRONG — doesn't evaluate local.x:
<tag0.slot.<local.x>.uid>    // Reads "slot.5.uid" literally? No, it may error.

// CORRECT:
<tag0.slot.<dlocal.x>.uid>   // dlocal forces decimal evaluation first
```

### 3. `local` does not propagate to sub-functions

```scp
[FUNCTION f_outer]
local.x = 42
f_inner          // local.x is NOT visible inside f_inner
```

Use `argn*` or `args` to pass data to called functions.

---

## Summary Table — When to Use Each

| Use case | Variable |
| --- | --- |
| Temporary counter in a trigger | `local.X` |
| Flag that survives logout/restart | `tag0.X` (on char) |
| Flag for current session only | `ctag0.X` |
| Server-wide state (world timer UID, etc.) | `var.X` |
| Hold a reference to another object | `ref1` … `ref5` |
| Read engine-provided trigger input | `argn1`, `argn2`, `argn3`, `argo`, `args` |
| Override engine behavior | Modify `argn*` in OUT trigger |
| Script-defined constant | `<def.MY_CONST>` |
| N-th argument to a function | `<argv[N]>` |
