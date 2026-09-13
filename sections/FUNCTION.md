# Section: [FUNCTION]

> `[FUNCTION f_*]` declares reusable, procedural script routines in SphereServer. Functions can act as custom console commands, event helpers, calculation utilities, or client interaction verbs.

---

## Syntax

```scp
[FUNCTION f_function_name]
// Variable setup
local.TargetUID = <argv[0]>
local.Amount = <argv[1]>

// Logic execution
if (!<uid.<local.TargetUID>.isvalid>)
    sysmessage Invalid target UID specified!
    return 0
endif

ref1 = <local.TargetUID>
ref1.hits += <local.Amount>
sysmessage Healed <ref1.name> for <local.Amount> HP.
return 1
```

---

## Invocation Patterns

### 1. Standalone Verb
Executes on the default active object:
```scp
f_custom_teleport 1420,1680,10
```

### 2. Prefixed Object Verb
Executes using the specified entity as the `DEFAULT` context:
```scp
src.f_custom_teleport 1420,1680,10
ref1.f_custom_teleport 1420,1680,10
uid.040001a2f.f_custom_teleport 1420,1680,10
```

### 3. Evaluation Expression `<...>`
Executes and returns string / numeric data inline:
```scp
local.TaxRate = <f_get_region_tax <region.name>>
if (<f_check_inventory_item <src.uid>, i_gold, 500>)
    // Player has at least 500 gold
endif
```

---

## Arguments & Scope

- `<args>`: Complete raw argument string.
- `<argv[0]>` … `<argv[N]>`: Comma-separated indexed argument values.
- `<strarg <args>>`: First token of space-delimited string.
- `<streat <args>>`: Remaining tokens of space-delimited string.
- `<local.VariableName>`: Function-scoped stack variables.

---

## Privilege Requirements (`[PLEVEL]`)

To expose a function as a dot command executable from the in-game chat or GM console (`.f_my_command`):
1. Create the function: `[FUNCTION f_my_command]`.
2. Add its name under the required tier in a `[PLEVEL N]` block (0=Player, 1=Counselor, 2=GM, 3=Dev, 4=Lead, 5=Admin, 6=Owner, 7=Server Core).
