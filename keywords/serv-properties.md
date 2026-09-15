# Server Object Reference (`SERV.*`)

> Global server engine properties, broadcast methods, system clocks, global variables, dynamic lists, and native dictionary stores.

---

## Global Properties

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `SERV.NAME` | R | String | Shard name configured in `sphere.ini`. |
| `SERV.TIME` | R | Ticks | Current server game time in tenths of a second. |
| `SERV.RTIME` | R | Object | Real-time clock interface (`<serv.rtime.format %T>`). |
| `SERV.CLIENTS` | R | Integer | Number of active connected client sockets. |
| `SERV.STATICS` | R | Integer | Total count of static items placed in world. |
| `SERV.ITEMS` | R | Integer | Total active dynamic item count. |
| `SERV.CHARS` | R | Integer | Total active living character count. |

---

## Server Verbs & Broadcasts

| Verb | Syntax | Description |
| :--- | :--- | :--- |
| `ALLCLIENTS` | `serv.allclients sysmessage @color text` | Broadcasts verb or message to every connected player. |
| `LOG` | `serv.log [@color,level,mask] message` | Writes entry to server console and daily log files. |
| `SAVE` | `serv.save [forced]` | Initiates a worldsave background cycle. |
| `SAVESTATICS` | `serv.savestatics` | Saves statics to `spherestatics.scp`. |
| `NEWITEM` | `serv.newitem defname, [amount], [container]` | Allocates and creates a new item instance in memory (`NEW`). |
| `NEWNPC` | `serv.newnpc chardef` | Allocates and spawns a new character instance (`NEW`). |
| `NEWSUMMON` | `serv.newsummon chardef, [duration]` | Spawns a temporary summoned creature for N seconds. |
| `VARLIST` | `serv.varlist [log]` | Dumps all global `VAR.*` variables to console or daily log. |
| `PRINTLISTS` | `serv.printlists [log]` | Dumps all global `LIST.*` dynamic arrays to console or daily log. |
| `CLEARLISTS` | `serv.clearlists [mask]` | Deletes all global lists, or lists matching wildcard mask. |

---

## Global Variables (`SERV.VAR.*` / `VAR.*`)

Global server variables are accessible anywhere and persist to `sphereworld.scp` in the `[GLOBALS]` section:

```scp
// Setting global variables:
serv.var.LotteryJackpot = 1000000
serv.var.NextInvasionCity = Britain

// Reading global variables:
if (<var0.LotteryJackpot> > 500000)
    serv.allclients sysmessage @044 The lottery jackpot is now <dvar.LotteryJackpot> gold!
endif
```

---

## Dynamic Server Lists (`SERV.LIST.*` / `LIST.*`)

Ordered dynamic string/number collections backed by high-performance queues (`std::deque`). Automatically persisted to `sphereworld.scp`:

```scp
// Adding / appending items:
serv.list.ArenaFighters.add <src.uid>
serv.list.Prizes.set i_gold, i_sword_viking, i_potion_heal

// Querying elements:
local.count = <serv.list.ArenaFighters.count>
local.first = <serv.list.ArenaFighters.0>
local.idx = <serv.list.ArenaFighters.findelem <src.uid>>

// Manipulating elements:
serv.list.ArenaFighters.0 = <src.uid>           // Overwrite index 0
serv.list.ArenaFighters.0.insert <src.uid>      // Insert at index 0
serv.list.ArenaFighters.0.remove                // Remove index 0
serv.list.ArenaFighters.sort desc               // Sort descending (asc, desc, iasc, idesc)
serv.list.ArenaFighters.clear                   // Delete entire list
```

---

## Global Dictionaries (`SERV.JTAG.*`)

Native key-value dictionary collections stored globally on the server engine (`CDictionaryMap`). Persists automatically in `sphereworld.scp` `[GLOBALS]`:

```scp
// Setting and reading key-values:
serv.jtag.event_stats.total_kills = 240
serv.jtag.event_stats.current_boss = c_dragon_red

// Dictionary inspection methods:
local.total_entries = <serv.jtag.event_stats.COUNT>
local.is_empty = <serv.jtag.event_stats.ISEMPTY>
local.has_boss = <serv.jtag.event_stats.HASKEY current_boss>
local.all_keys = <serv.jtag.event_stats.KEYS>     // "total_kills,current_boss"
local.all_vals = <serv.jtag.event_stats.VALUES>   // "240,c_dragon_red"

// Key deletion & clearing:
serv.jtag.event_stats.REMOVE total_kills
serv.jtag.event_stats.CLEAR
```

