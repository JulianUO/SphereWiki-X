# Party Functions Reference (`PARTY.*`)

> Party actionable verbs, methods, and properties from `CParty_functions.tbl` and `CParty.cpp` (Source-X).  
> The `PARTY` object manages groups of characters adventuring together, handling shared experience, speech routing, party gump packets, and private party tags.

---

## Party Action Verbs Table

| Verb / Method | Arguments | Returns | Description |
| :--- | :--- | :---: | :--- |
| `ADDMEMBER <uid>` | `uid` | `0/1` | Invites character `<uid>` to join the party. Sets `PARTY_LASTINVITE` tag and prompts target with accept/decline dialog. |
| `ADDMEMBERFORCED <uid>` | `uid` | `0/1` | Forces character `<uid>` into the party instantly without sending an invite dialog. |
| `CLEARTAGS [pattern]` | `[pattern]` | &mdash; | Clears all or matching tags stored on the party object. |
| `CREATE` | *none* | &mdash; | Initializes a new party container. |
| `DISBAND` | *none* | `0/1` | Disbands the party completely, notifying all members and cleaning up the party object. |
| `MESSAGE <text>` | `text` | &mdash; | Broadcasts a party chat message to all party members. |
| `REMOVEMEMBER <uid \| @index>` | `uid` or `@N` | `0/1` | Removes member specified by character UID or zero-based index (`@0`, `@1`, etc.). If master is removed, leadership transfers or party disbands. |
| `SETMASTER <uid \| @index>` | `uid` or `@N` | `0/1` | Sets the specified party member as the new Party Leader (Master). |
| `SYSMESSAGE [@index] <msg>` | `[@N] text` | &mdash; | Sends a system message to a single member (`@N`) or to all members if index is omitted. |
| `TAGLIST` | *none* | &mdash; | Dumps list of all tags currently stored on the party object to console/log. |

---

## Party Properties & Intrinsic References

| Property / Ref | Access | Description |
| :--- | :---: | :--- |
| `PARTY.MEMBERS` | R | Number of characters currently in the party. |
| `PARTY.MASTER` | R | UID of the party leader (`CChar`). |
| `PARTY.MEMBER.<N>` | R | Returns UID of the N-th party member (`0` = Master). |
| `PARTY.MEMBER.<N>.CANLOOT` | R/W | `1` if party member has granted loot permission to the party, `0` otherwise. |
| `PARTY.TAG.<key>` | R/W | Read or write persistent variables scoped to the party instance. |
| `PARTY.TAG0.<key>` | R | Read numeric tag returning `0` if undefined. |

---

## Practical Examples

### Custom Party Loot & Buff Distribution
```spherescript
// Custom party heal spell effect
[FUNCTION f_party_heal]
IF !(<PARTY.ISVALID>)
    SRC.SYSMESSAGE You are not in a party.
    RETURN 1
ENDIF

FOR 0 <EVAL <PARTY.MEMBERS> - 1>
    REF1 = <PARTY.MEMBER.<dLOCAL._FOR>>
    IF (<REF1.ISVALID>) && (<REF1.DISTANCE> < 12)
        REF1.HITS += 25
        REF1.EFFECT 3,i_fx_heal_effect,6,15,1
        REF1.SOUND snd_spell_greater_heal
        REF1.SYSMESSAGE @044 <SRC.NAME> restored 25 HP to your party!
    ENDIF
ENDFOR
```
