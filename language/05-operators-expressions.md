# SphereScript — Operators & Expressions

> All substitution in SphereScript happens inside `< >` angle brackets. The engine evaluates the expression and replaces the entire `<...>` with its result.

---

## Expression Substitution

```scp
NAME = Sword of <src.name>     // Embeds src.name into the string
sysmessage HP: <hits>/<maxhits> // Numeric values embedded inline
```

Expressions can be nested:
```scp
<def.quest_<dtag0.quest.<dlocal.x>.id>_name>
// Evaluated inside-out:
// 1. <dlocal.x>        → "3"
// 2. <dtag0.quest.3.id> → "42"
// 3. <def.quest_42_name> → "The Lost Crown"
```

---

## Arithmetic — `<eval ...>`

```scp
<eval 2+3>           // → 5
<eval <hits>*2>      // → current HP * 2
<eval <argn1>-10>    // → argn1 minus 10
<eval 100/4>         // → 25 (integer division)
<eval 7%3>           // → 1 (modulo)
```

- **`<eval>`is REQUIRED for arithmetic**. Without it, `<hits>+10` produces `"50+10"` (string).
- All arithmetic is **integer**. Floats require `<feval>`.
- Supports: `+`, `-`, `*`, `/`, `%` (modulo), `**` (power), bitwise: `&`, `|`, `^`, `~`, `<<`, `>>`.

### Bitwise Examples

```scp
<eval <attr> & attr_magic>          // Test if magic flag is set
<eval <attr> | attr_blessed>        // OR in blessed flag
<eval <attr> & ~attr_cursed>        // Clear cursed flag
```

---

## Float Arithmetic — `<feval ...>` / `<floatval ...>`

```scp
<feval 10.5 + 2.3>       // → "12.8"
<feval <floatval <luck> @ 0.44>>  // luck * 0.44 as float
```

- `<floatval X @ Y>` multiplies X * Y using float.
- Used internally by the Sockets system for luck/damage calculations.
- Results are strings; convert back to int with `<eval <feval ...>>`.

---

## `<muldiv a,b,c>` — Integer Multiply-Divide

```scp
<muldiv <argn1>,25,100>   // argn1 * 25 / 100 = 25% of argn1
<muldiv <maxhits>,33,100> // 33% of max hits
```

- Computes `(a * b) / c` using integer arithmetic without overflow.
- **Preferred** over `<eval X*Y/Z>` for percentage calculations.
- Denominator of 0 causes a division-by-zero error — always validate before calling.

---

## `<qval cond ? then : else>` — Inline Ternary

```scp
<qval <hits> < 50 ? 1 : 0>          // 1 if HP < 50, else 0
<qval <tag.IsAdmin> ? Admin : Player> // String result
```

- If the condition is **non-zero/non-empty**, returns `then`; otherwise returns `else`.
- Condition, then, and else can all be expressions.
- Equivalent to: `if cond / return then / else / return else / endif` — but inline.

---

## Random — `<r>`, `<rN>`, `<rN,M>`

```scp
<r>         // Random number 0–999
<r10>       // Random number 0–10 (inclusive)
<r1,10>     // Random number 1–10 (inclusive)
<r5,15>     // Random number 5–15 (inclusive)
```

- `<r>` with no args is equivalent to `<r1000>` (returns 0–999).
- **Note**: `<r10>` returns 0–10 (eleven values). `<r1,10>` returns 1–10 (ten values).
- Shorthand for `<eval rand(N)>`.

---

## Random Weighted List — `{ a b c ... }`

```scp
// Pick one at random with equal weight
NAME = { Rusty Sword 1 Long Sword 1 Katana 1 }

// Weighted: 70% chance rusty, 30% long sword
serv.newitem { i_sword_rusty 7 i_sword_long 3 }
```

- Curly braces `{ item weight item weight ... }` define a **weighted random pick**.
- Each `item` is paired with an integer `weight`.
- Only the picked item is evaluated (lazy evaluation in X1).

---

## `<max a,b>` / `<min a,b>` — Comparisons

```scp
<max 0,<eval <hits>-10>>    // Never go below 0
<min <hits>,<maxhits>>      // Cap at maxhits
```

- `<max a,b>` returns the larger of two values.
- `<min a,b>` returns the smaller of two values.
- Both take exactly two comma-separated arguments.

---

## String Functions

### `<strarg S>` — First Word

```scp
local.str = hello world foo
<strarg <local.str>>    // → "hello"
```

### `<streat S>` — Everything After First Word

```scp
<streat "hello world foo">   // → "world foo"
```

### `<strmatch(pattern, str)>` — Glob Match

```scp
<strmatch(*c_rat*, c_rat;c_rat_sewer;)>   // → 1 (matches)
<strmatch(i_sword*, i_sword_long)>        // → 1 (matches)
<strmatch(i_sword*, i_axe_long)>          // → 0 (no match)
```

- `*` matches any sequence of characters.
- Returns `1` (match) or `0` (no match).
- Case-insensitive.

### `<isempty X>` — Empty Test

```scp
if <isempty <def.quest_42_name>>
    // defname not set
endif
```

- Returns `1` if the expression is empty string or `0`.
- Returns `0` if non-empty.

### `<strlen S>` — String Length

```scp
<strlen Hello World>   // → 11
```

### `<strupr S>` / `<strlwr S>` — Case Conversion

```scp
<strupr hello>   // → "HELLO"
<strlwr WORLD>   // → "world"
```

### `<strindexof S, sub>` — Substring Search

```scp
<strindexof "hello world", world>   // → 6
```

Returns the 0-based index of the first occurrence, or `-1` if not found.

---

## `<hval X>` — Hex Value of Resource

```scp
<hval i_gold>       // Returns hex resource value of i_gold
```

> **X1 Breaking Change**: In X1, `<hval s_clumsy>` returns a different byte order than pre-X. Use `<RESOURCEINDEX s_clumsy>` instead to get the spell number cleanly.

---

## `<RESOURCEINDEX defname>` — Resource Index (X1)

```scp
<RESOURCEINDEX s_fireball>    // → spell number (e.g., 15)
<RESOURCEINDEX i_gold>        // → itemdef internal index
```

Replaces the old pattern of `<hval X> & (~0ce000000)`.

---

## `<RESDEF defname>` — Resource Definition Numeric ID (X1)

```scp
ID = <RESDEF i_gold>      // Gets the numeric ID of i_gold itemdef
```

Replaces `<DEF.i_gold>` when you need the numeric resource identifier (not the DEFNAME constant value).

---

## `<safe expr>` — Safe Evaluation

```scp
<safe <link.name>>    // Returns empty string if link is invalid, no error
```

Evaluates `expr` and suppresses errors (returns empty string on failure). Use sparingly — prefer `ISVALID` checks.

---

## Comparison Operators (in `IF` conditions)

```scp
if <hits> == 100     // Equal
if <hits> != 0       // Not equal
if <hits> > 50       // Greater than
if <hits> >= 50      // Greater than or equal
if <hits> < 10       // Less than
if <hits> <= 10      // Less than or equal
```

Logical:
```scp
if (<hits> > 0) && (<mana> > 0)    // AND
if (<hits> < 5) || (<mana> < 5)    // OR
if !<statf_dead>                    // NOT (prefix !)
```

> **X1 Lazy Evaluation**: `IF` uses short-circuit evaluation. In `if (<link.isvalid> && (<link.tag.X> == 1))`, if `<link.isvalid>` is `0`, the second expression is never evaluated, preventing the "invalid object" error.

---

## Operators Cheat Sheet

| Operator | Example | Result |
| --- | --- | --- |
| `+` `-` `*` `/` `%` | `<eval 10+5>` | Arithmetic |
| `**` | `<eval 2**8>` | Power (256) |
| `&` `\|` `^` `~` | `<eval <attr> & attr_magic>` | Bitwise |
| `<<` `>>` | `<eval 1<<3>` | Bit shift (8) |
| `==` `!=` | `<hits> == 100` | Equality |
| `>` `>=` `<` `<=` | `<hits> > 50` | Comparison |
| `&&` `\|\|` `!` | `(<a>) && (<b>)` | Logical |
| `<muldiv a,b,c>` | `<muldiv 200,25,100>` | 50 (25% of 200) |
| `<qval c?t:e>` | `<qval 1?yes:no>` | Ternary |
| `<max a,b>` | `<max 0,<eval x-1>>` | Maximum |
| `<min a,b>` | `<min 100,<hits>>` | Minimum |
| `<r>` `<rN>` `<rN,M>` | `<r1,6>` | Random |
| `{ a w b w }` | `{ i_sword 1 i_axe 2 }` | Weighted random |
