# Source-X (X1+) Contemporary Changelog & Invariants

> Essential syntax changes, invariants, and features introduced in the Source-X (X1) branch. Extracted from `Source-X/Changelog.txt` and `Porting from 0.56 to X.txt`.

---

## 1. Script Parsing & Syntax Changes

- **Lazy `IF` Evaluation**: Expressions in `IF / ELIF` short-circuit evaluate left-to-right. Subexpressions are not executed if the final boolean outcome is already determined (e.g. `if (<link.isvalid> && (<link.tag.val> == 1))` is safe).
- **Strict Pointer Access**: Accessing properties on invalid or unassigned pointers (like `<ref1.name>` when `ref1` is null) now throws a script error. Use `<ref1.isvalid>` to guard.
- **The `TRY` Keyword**: Introduced `try object.verb` to safely attempt actions on objects that may not exist.
- **`RESDEF` vs `DEF`**:
  - `<DEF.symbol>` queries constants in `[DEFNAME]` blocks.
  - `<RESDEF.resourcename>` retrieves the numeric identifier of a resource definition (replaces old `<DEF.i_gold>`).
- **`RESOURCEINDEX`**: Retrieves clean resource index numbers (e.g. `<RESOURCEINDEX s_clumsy>` replaces bit-shifted `<hval ...>` arithmetic).
- **Weighted Range Lazy Eval**: In `{ item1 w1 item2 w2 }`, only the randomly selected item is evaluated.

---

## 2. Keywords, Properties & Verbs

- **`OWNER`**: Now read/write (`R/W`) on characters, allowing setting pet ownership directly (`owner = <src.uid>`).
- **`NEWSUMMON`**: Added `serv.newsummon = chardef, [duration_seconds]` to spawn temporary summoned creatures with automatic decay timers.
- **`PAYGOLD`**: Added `PayGold(amount, type)` method and `@PayGold` trigger (`argn1`=gold, `argn2`=type, `src`=NPC receiving, `argo`=gold stack).
- **`MODMAXHITS`, `MODMAXMANA`, `MODMAXSTAM`**: Direct modifiers to character maximum vitals.
- **`MODMAXWEIGHT`**: Replaces old `TAG.OVERRIDE.MAXWEIGHT` for corpse and bank max weight modifiers.
- **`SPEECHCOLOROVERRIDE`**: Overrides player speech hue on classic and enhanced clients.
- **`ADDCLILOC`**: Must now be called directly on the object being examined in `@ClientTooltip`.
- **Native Dictionary Collections (`JTAG`, `JLOCAL`, `SERV.JTAG`)**:
  - `JTAG.<dict>.<key> = <val>`: Persistent object-level dictionaries stored directly in world saves.
  - `JLOCAL.<dict>.<key> = <val>`: Volatile execution-frame dictionaries cleaned up automatically.
  - `SERV.JTAG.<dict>.<key> = <val>`: Global server dictionaries saved in `[GLOBALS]`.
  - Built-in methods: `<dict.COUNT>`, `<dict.ISEMPTY>`, `<dict.HASKEY key>`, `<dict.KEYS>`, `<dict.VALUES>`, `dict.REMOVE key`, `dict.CLEAR`.
- **NPC AI Tactical Properties**:
  - `NPCAI_AGGROLEVEL`: `0`=Passive, `1`=Domestic, `2`=Territorial, `3`=Aggressive, `4`=LongSight.
  - `NPCAI_ROLE`: `0`=Default, `1`=Tank, `2`=Healer, `3`=Buffer, `4`=Mage, `5`=Archer, `6`=MeleeDPS.
  - `NPCAI_PACKID` & `NPCAI_PACKRADIUS`: Group identification and assistance broadcast radius for wolfpacks, bandit squads, and allied mobs.
  - `NPCAI_REACTTOACTIONS`: Bitmask for environmental reactions (`0x01` Spellcast, `0x02` Thievery, `0x04` Warmode, `0x08` Looting, `0x10` Proximity, `0x20` Running).
  - `NPCAI_VISUALRANGE`: Custom line-of-sight visual perception distance.

---

## 3. Triggers & Combat Invariants

- **`@HitCheck` & Combat Refactor**: `@SkillStart` is called only once when entering combat; intermediate swings fire `@HitCheck`, `@HitTry`, `@Hit`, `@GetHit`.
- **`@DropOn_Ground`**: Now fires **BEFORE** the item's new position `P` is assigned. The target point is stored in `ARGS`.
- **Garbage Collection Line Reporting**: GC reports script filename and line number where unplaced items were created.
- **NPC AI Triggers**:
  - `@NPCAIPackCallAssistance`: Fires when a pack member requests combat reinforcement (`argn1`=threat level, `src`=combat target).
  - `@NPCAIReactToAction`: Fires when an NPC reacts to environmental player actions (`argn1`=action type flag, `src`=acting player).
  - `@NPCAITacticalDecision`: Fires before executing a role-based tactical action (`argn1`=role, `argn2`=distance, `src`=target).

---

## 4. Navigation & Pathfinding Architecture

- **Theta\* String-Pulling & LOS Smoothing**: A\* pathfinding performs line-of-sight string pulling to prune redundant zigzag waypoints.
- **Hierarchical Navigation (`CNavHierarchical`)**: Long-distance multi-screen routing through topological waypoints.
- **Follower Breadcrumb Trail (`CNavTrail`)**: Real-time trail recording ensures pets and escort followers walk exact player footsteps without desync.
- **Door-Aware Dynamic Obstacle Clearing**: Pathfinding inspects doors and interactive obstacles, dynamically opening unlatched doors along routes.
