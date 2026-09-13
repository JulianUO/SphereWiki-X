# SphereScript — Functions & Procedural Execution

> Functions in SphereScript are declared with `[FUNCTION f_*]`. They represent custom verbs that can be executed directly as commands or evaluated inside `< >` to return values.

---

## Declaring a Function

```scp
[FUNCTION f_heal_target]
// Check if an argument was passed
if (<isempty <args>>)
    sysmessage You must provide an amount to heal!
    return 0
endif

local.HealAmount = <args>
hits += <local.HealAmount>
if (<hits> > <maxhits>)
    hits = <maxhits>
endif
sysmessage You have been healed for <local.HealAmount> hitpoints!
return 1
```

---

## Function Invocations

Functions can be called in two main contexts:

### 1. Direct Statement / Verb Execution
When called as a standard statement, the function creates a **new stack frame**:
```scp
f_heal_target 25
src.f_heal_target 50
uid.01234.f_heal_target 100
```

### 2. Stack-Preserving Execution: `CALL <function>`
When invoked with the `CALL` keyword, SphereServer reuses the **active `CScriptTriggerArgs` frame**:
- **Local Inheritance**: All `local.*` variables defined in the calling function/trigger are **passed directly down** to the called function.
- **Shared Mutations**: Any `local.*` variables modified or created in the sub-function remain present in the caller after `CALL` returns.
- **Common Usage**: Modular gump drawing (`qDialogs.scp`, `AchievementsMenu.scp`) and multi-stage algorithms sharing state across subroutines.

```scp
[FUNCTION f_render_menu]
local.Width = 300
local.Height = 200
CALL f_render_header
CALL f_render_body
CALL f_render_footer

[FUNCTION f_render_header]
// Reads local.Width from caller without passing it as argument:
resizepic 0 0 3500 <local.Width> 40
```

### 3. Expression Evaluation `<...>`
When called inside `< >`, the function executes and evaluates to its return value:
```scp
local.Result = <f_calculate_tax 500,10>
if (<f_is_eligible_for_quest <src.uid>>)
    // ...
endif
```

---

## Arguments Handling

Sphere provides two distinct ways to parse parameters passed to a function:

### 1. Indexed Array Parameters: `<argv[N]>`
Sphere splits comma-separated arguments automatically into zero-indexed slots:
```scp
[FUNCTION f_teleport_with_effect]
// Usage: f_teleport_with_effect X,Y,Z,EffectID
local.X = <argv[0]>
local.Y = <argv[1]>
local.Z = <argv[2]>
local.FX = <argv[3]>

p = <local.X>,<local.Y>,<local.Z>
if (!<isempty <local.FX>>)
    effect 3,<local.FX>,6,15,1
endif
```

### 2. Raw String & Space-Separated Arguments: `<args>`, `<strarg>`, `<streat>`
When parameters are space-separated or contain raw text (like player speech or commands):
- `<args>`: Full unparsed argument string.
- `<strarg <args>>`: First word / token before the first space.
- `<streat <args>>`: Everything after the first space.

```scp
[FUNCTION f_broadcast_staff]
// Usage: .f_broadcast_staff Hello all online staff members
local.sender = <name>
local.msg = <args>
serv.allclients f_staff_receive_msg <local.sender>,<local.msg>

[FUNCTION f_staff_receive_msg]
if (<account.plevel> > 1)
    sysmessage @044 [STAFF: <argv[0]>] <argv[1]>
endif
```

---

## Return Values in Functions

- `return <eval ...>`: Returns a calculated numeric value.
- `return string_value`: Returns a string.
- `return 1`: Halts execution and returns integer 1.
- `return 0`: Halts execution and returns integer 0.

> [!IMPORTANT]
> **EVAL in Returns**: Always wrap arithmetic or expressions in `<eval ...>` when returning values from functions:
> ```scp
> // BAD (returns the literal string "5+5"):
> return <local.x>+<local.y>
> 
> // GOOD (returns integer "10"):
> return <eval <local.x>+<local.y>>
> ```

---

## Scope & Target Resolution (`DEFAULT` Object)

When a function executes, there is always a **Current Object Context** (`Default Object` or `this`):
- If invoked directly as `f_test`, the default object is whoever called the script (the character or item).
- If invoked with a prefix like `src.f_test` or `ref1.f_test`, the target object becomes the default context inside the function.
- In `f_test`, properties like `<name>`, `<p>`, `<hits>`, `<flags>` directly query this default object.

---

## Recursive Calling & Call Depth Safety

- SphereScript supports recursive functions.
- The engine enforces a call-stack depth limit (configured in `sphere.ini` or hardcoded) to protect against infinite recursion and server stack overflows.
- If a script exceeds maximum call depth, Sphere aborts the execution chain and logs a warning with script location.
