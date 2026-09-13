# SphereScript — Control Flow

> SphereScript provides conditional branching, numeric loops, container iteration, and while loops.

---

## `IF / ELIF / ELSE / ENDIF`

```scp
if <condition>
    // executed if condition is true (non-zero, non-empty)
elif <other_condition>
    // optional: else-if branch
else
    // optional: fallback
endif
```

### Condition Evaluation Rules

- Any **non-zero, non-empty** value is **true**.
- `0`, empty string `""`, or unset variable → **false**.
- The `!` prefix negates: `if !<statf_dead>` — true if NOT dead.

### X1 Lazy Evaluation (Short-Circuit)

In X1, conditions are evaluated **left-to-right and stop early**:

```scp
// SAFE in X1: if link is invalid, second part never evaluates
if (<link.isvalid> && (<link.tag.questid> == 5))
    // ...
endif

// Without lazy eval (pre-X1), this would crash if link is invalid
```

### Parentheses

Parentheses group subexpressions and are required for `&&` / `||`:

```scp
if ((<hits> < 10) || (<mana> < 5))
    sysmessage Critical condition!
endif
```

---

## `FOR / ENDFOR` — Numeric Loop

```scp
for x 1 10
    // <local.x> iterates from 1 to 10 inclusive
    sysmessage Step <local.x>
endfor
```

- `for VARNAME START END` — integer loop, both bounds inclusive.
- The loop variable is accessible as `<local.VARNAME>`.
- `START` and `END` can be expressions: `for i 1 <tag.count>`
- **No break statement** — use `return` or restructure logic to exit early.

```scp
for slot 1 8
    if <tag0.quest.<dlocal.slot>.id> == <local.targetid>
        local.found = <dlocal.slot>
    endif
endfor
```

---

## `WHILE / ENDDO` — Condition Loop

```scp
while (<local.props> > 0)
    // loop body
    local.props -= 1
enddo
```

- Evaluates the condition **before** each iteration.
- If condition is false on first check, body never executes.
- **No `break`** — use return or restructure. Set the condition variable to exit.

```scp
local.attempts = 0
while ((<local.found> == 0) && (<local.attempts> < 10))
    // try something
    local.attempts += 1
enddo
```

---

## `FORCONT uid [depth]` — Container Iteration

Iterates over the contents of a container object:

```scp
forcont <findlayer.layer_pack.uid>
    // 'self' inside loop = each item in the pack (1 level deep)
    if <baseid> == i_gold
        local.gold += <amount>
    endif
endfor
```

With depth parameter:
```scp
forcont <findlayer.layer_pack.uid> 2
    // depth=2: items in pack AND items inside containers in the pack
endfor
```

- **Default depth**: 1 (direct children only).
- Inside the loop, all property accesses (`<name>`, `<baseid>`, `<amount>`, etc.) refer to the **current item**.
- `<uid>` inside the loop = current item's UID.
- Modifying or removing items inside `forcont` is generally safe but may skip items — prefer marking with a tag and cleaning up after.

### Common `forcont` Patterns

```scp
// Remove all quest items
forcont <findlayer.layer_pack.uid>
    if <tag.questitem>
        remove
    endif
endfor

// Accumulate gold from corpse
forcont <argo.uid> 2
    if <baseid> == i_gold
        local.total += <amount>
    endif
endfor

// Find first item of a type
forcont <findlayer.layer_pack.uid>
    if <baseid> == i_magic_key
        local.found = <uid>
    endif
endfor
```

---

## `DOSWITCH / ENDDO` — Indexed Switch

```scp
doswitch <argn2>
    // case 0:
    local.blank
    // case 1:
    local.blank
    // case 2 (necromancer → mage):
    argn2 = 2
    // case 3 (paladin → warrior):
    argn2 = 1
enddo
```

- `doswitch EXPR` executes the N-th block (0-indexed) based on the value of `EXPR`.
- Each case is separated by a **blank line** or any statement.
- No `break` needed — each case is a single statement or group implicitly delimited.
- If the value exceeds the number of cases, nothing executes.

> Most commonly used in `f_onchar_create_init` to map profession IDs.

---

## `RETURN N` — Exit Current Trigger/Function

```scp
ON=@DClick
    if !<src.isplayer>
        return 1    // Cancel for non-players
    endif
    // ... rest of code
    return 0        // Continue with default action
```

- `return 0` — **continue** with default engine behavior (also: just `return` with no arg).
- `return 1` — **cancel** the action; suppress default behavior.
- `return 2` — **return default** (in most triggers equivalent to `return 0`; in `@SpellEffect` means "run hardcoded spell effect").
- In `[FUNCTION]` blocks, the numeric return value becomes the result of `<f_myFunc args>`.

See [`09-return-values.md`](09-return-values.md) for trigger-specific return semantics.

---

## `CONTINUE` — Skip to Next Iteration

```scp
while (<local.i> < 10)
    local.i += 1
    if (<local.i> % 2) == 0
        continue    // Skip even numbers
    endif
    sysmessage Odd: <local.i>
enddo
```

- Valid inside `while` and `for` loops.
- Jumps to the next iteration's condition check.

---

## `TRY` — Safe Execution (X1)

```scp
try ref1.someVerb    // Execute only if ref1 is valid, no error if not
```

- Executes the statement only if the target object is valid.
- If object is invalid/null, silently skips — no error returned.
- **Cannot** be used to retrieve values: `<try ref1.name>` is NOT valid.
- Use sparingly — prefer explicit `isvalid` checks for clarity.

```scp
// Preferred explicit check:
if <ref1.isvalid>
    ref1.someVerb
endif

// Shorthand (less readable, use only for trivial cases):
try ref1.someVerb
```

---

## `BREAK` — Not Available

SphereScript does **not** have a `break` statement for loops. To exit early:

```scp
// Option 1: Use return (exits entire trigger/function)
for i 1 100
    if <tag0.slot.<dlocal.i>.id> == <local.target>
        local.found = <dlocal.i>
        return 0   // exits trigger entirely
    endif
endfor

// Option 2: Use a sentinel variable
local.done = 0
for i 1 100
    if !<local.done>
        if <tag0.slot.<dlocal.i>.id> == <local.target>
            local.found = <dlocal.i>
            local.done = 1
        endif
    endif
endfor
```

---

## Nesting

All control structures can be nested:

```scp
for x 1 8
    if <tag0.quest.<dlocal.x>.id>
        forcont <findlayer.layer_pack.uid>
            if <tag.questitem> == <tag0.quest.<dlocal.x>.id>
                local.count += 1
            endif
        endfor
    endif
endfor
```

> **Caution**: Deep nesting with `forcont` on large containers (full bank boxes, corpses) can be slow. Consider caching container UIDs in `ref*` variables.

---

## Flow Control Summary

| Statement | Use |
| --- | --- |
| `if / elif / else / endif` | Conditional branching |
| `for VAR START END / endfor` | Numeric loop (inclusive bounds) |
| `while (cond) / enddo` | Condition-based loop |
| `forcont UID [depth] / endfor` | Container item iteration |
| `doswitch EXPR / enddo` | Indexed case selection |
| `return N` | Exit trigger/function with value |
| `continue` | Skip to next loop iteration |
| `try STMT` | Execute only if object is valid |
