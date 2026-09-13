# Guild & Town Stone Functions Reference (`STONE.*`)

> Stone actionable verbs, iteration methods, and administration commands from `CItemStone_functions.tbl` and `CItemStone.cpp` (Source-X).  
> Guild stones (`IT_STONE_GUILD`) and Town stones (`IT_STONE_TOWN`) represent organizational entities tracking member ranks, fealties, charters, guild wars, and shared multi storage.

---

## Stone Action Verbs Table

| Verb / Method | Arguments | Returns | Description |
| :--- | :--- | :---: | :--- |
| `ACCEPTCANDIDATE <uid>` | `uid` | `0/1` | Approves a candidate (`STONEPRIV_CANDIDATE`) character to become a full member of the guild. |
| `ALLGUILDS <flags>, <cmd>` | `flags, command` | &mdash; | Iterates related guild stones and executes script `<cmd>` on each. Flags: `0` = all known guilds, `1` = we declared war, `2` = they declared war, `3` = mutual active war. |
| `ALLMEMBERS <priv>, <cmd>` | `priv, command` | &mdash; | Iterates stone members and executes script `<cmd>` on each `CStoneMember`. Filter `<priv>`: `-1` = all members, `0` = candidates, `1` = standard members, `2` = master. |
| `APPLYTOJOIN <uid>` | `uid` | `0/1` | Submits character application to join the stone as a candidate. |
| `CHANGEALIGN <align>` | `0..2` | &mdash; | Sets guild alignment: `0` = Standard (Neutral), `1` = Order, `2` = Chaos. |
| `DECLAREFEALTY <uid>` | `uid` | `0/1` | Sets calling member's fealty/vote towards target candidate for guild leadership. |
| `DECLAREPEACE <guild_uid>` | `guild_uid` | `0/1` | Sends peace declaration or accepts peace from target enemy guild stone. |
| `DECLAREWAR <guild_uid>` | `guild_uid` | `0/1` | Declares war against target guild stone. |
| `DELHOUSE <multi_uid>` | `multi_uid` | `0/1` | Removes a guild-linked house from the stone's multi storage. |
| `DELSHIP <multi_uid>` | `multi_uid` | `0/1` | Removes a guild-linked vessel from the stone's multi storage. |
| `DISMISSMEMBER <uid>` | `uid` | `0/1` | Kicks member or candidate from the stone roster. |
| `ELECTMASTER <uid>` | `uid` | `0/1` | Immediately sets the specified member as the Stone Master (Guildmaster/Mayor). |
| `GRANTTITLE <uid>, <title>` | `uid, title` | `0/1` | Sets a custom guild title for the specified member. |
| `INVITEWAR <guild_uid>` | `guild_uid` | `0/1` | Sends a war challenge/invitation to target guild. |
| `JOINASMEMBER <uid>` | `uid` | `0/1` | Adds character directly as full member bypassing candidacy. |
| `MASTERMENU` | *none* | &mdash; | Opens the Guildmaster management dialog for `SRC`. |
| `RECRUIT <uid>` | `uid` | `0/1` | Sends recruit invitation to character `<uid>`. |
| `REFUSECANDIDATE <uid>` | `uid` | `0/1` | Declines candidate application. |
| `RESIGN` | *none* | `0/1` | Calling player character (`SRC`) resigns and leaves the guild. |
| `RETURNMAINMENU` | *none* | &mdash; | Re-displays stone main dialog. |
| `SETABBREVIATION <abbr>` | `abbreviation` | &mdash; | Sets the short guild abbreviation tag (shown in brackets). |
| `SETCHARTER <text>` | `text` | &mdash; | Sets the official guild charter description text. |
| `SETGMTITLE <title>` | `title` | &mdash; | Sets custom title given to the Guildmaster. |
| `SETNAME <name>` | `name` | &mdash; | Renames the guild/town. |
| `TOGGLEABBREVIATION` | *none* | &mdash; | Toggles whether member guild abbreviations are visible on paperdolls/hover. |
| `VIEWCANDIDATES` | *none* | &mdash; | Displays candidate list dialog. |
| `VIEWCHARTER` | *none* | &mdash; | Displays charter text dialog. |
| `VIEWENEMYS` | *none* | &mdash; | Displays list of enemy guilds currently at war. |
| `VIEWROSTER` | *none* | &mdash; | Displays list of active guild members. |
| `VIEWTHREATS` | *none* | &mdash; | Displays list of guilds threatening war. |

---

## Member Privileges (`STONEPRIV_*`)

| Enum Name | Value | Description |
| :--- | :---: | :--- |
| `STONEPRIV_CANDIDATE` | `0` | Candidate awaiting acceptance or vote. |
| `STONEPRIV_MEMBER` | `1` | Regular active member with voting rights. |
| `STONEPRIV_MASTER` | `2` | Guildmaster / Stone owner with administrative powers. |
| `STONEPRIV_BANISHED` | `3` | Banished member. |
| `STONEPRIV_ACCEPTED` | `4` | Candidate accepted, pending first login confirmation. |

---

## Practical Examples

### Guild Broadcast & War Check
```spherescript
// Broadcast message to all online guild members
[FUNCTION f_guild_broadcast]
REF1 = <SRC.GUILD>
IF !(<REF1.ISVALID>)
    SRC.SYSMESSAGE You are not in a guild.
    RETURN 1
ENDIF

// Loop through all full members (STONEPRIV_MEMBER = 1)
REF1.ALLMEMBERS 1, f_guild_member_msg <ARGS>

[FUNCTION f_guild_member_msg]
// 'this' is CStoneMember, GetLinkUID is the CChar
REF2 = <LINK.UID>
IF (<REF2.ISVALID>) && (<REF2.ISONLINE>)
    REF2.SYSMESSAGE @044 [Guild] <SRC.NAME>: <ARGS>
ENDIF
```
