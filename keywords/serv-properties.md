# Server Object Reference (`SERV.*`)

> Global server engine properties, broadcast methods, system clocks, and dynamic list arrays.

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

---

## Dynamic Server Lists (`SERV.LIST.*`)

Source-X provides global dynamic lists for storing and querying array collections:
```scp
// Adding an entry:
serv.list.MyList.add <src.uid>

// Checking if element exists:
if (<serv.list.MyList.findelem <src.uid>> != -1)
    // found
endif

// Clearing list:
serv.list.MyList.clear
```
