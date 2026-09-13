# SphereScript — Return Values & Engine Interception

> The `return` statement is the primary mechanism through which SphereScript communicates control decisions back to the underlying C++ engine. Understanding return codes is critical to avoiding hardcoded bugs and unintended cancellations.

---

## The Three Return Codes

In SphereServer, triggers recognize three primary numeric return codes:

| Code | Symbolic Constant | General Meaning | Effect on C++ Engine |
| :---: | :---: | :--- | :--- |
| `0` | `RET_FALSE` | **Allow / Continue** | Continues default hardcoded processing. For functions, returns 0. |
| `1` | `RET_TRUE` | **Cancel / Abort** | Cancels the action completely. Suppresses the default engine behavior, animations, damage, or movement. |
| `2` | `RET_DEFAULT` | **Default Action** | Executes standard engine logic. In most triggers identical to `0`, but behaves differently in specific triggers like `@SpellEffect`, `@PersonalSpace`, and `@NPCActFight`. |

> [!NOTE]
> If a trigger finishes without an explicit `return` statement, Sphere defaults to `return 0` (`RET_FALSE`).

---

## Trigger-Specific Return Value Semantics

Different subsystems assign specialized meanings to return codes. Below is the comprehensive table of non-standard return semantics:

### 1. Combat & Damage Triggers
| Trigger | `return 0` | `return 1` | `return 2` |
| :--- | :--- | :--- | :--- |
| `@GetHit` | Takes damage normally. | Cancels damage completely. No hit effect, no blood, no animation. | Standard damage processing. |
| `@HitTry` | Proceeds to calculate hit chance. | Attack swing fails immediately. | Standard hit check. |
| `@HitMiss` | Plays normal miss sound/animation. | Silently misses (no sound, no message, swing ends). | Standard miss. |
| `@Hit` | Applies weapon damage and triggers `@GetHit`. | Cancels blow. Weapon does not apply damage or durability loss. | Standard hit. |
| `@Damage` | Applies direct hitpoint deduction. | Cancels damage completely. | Standard damage. |

### 2. Spellcasting & Magic Triggers
| Trigger | `return 0` | `return 1` | `return 2` |
| :--- | :--- | :--- | :--- |
| `@SpellSelect` | Spell is selected; skips further reagent/mana tests. | Aborts spell selection. Cannot cast. | Standard checks (reagents, mana, skill requirements). |
| `@SpellCast` | Proceeds to spell targeting and cast delay. | Aborts spell cast. Mana/reagents not deducted. | Standard casting sequence. |
| `@SpellEffect` | **Scripted Mode**: Succeeds, but suppresses hardcoded spell effect (useful for custom spells with `SPELLFLAG_SCRIPTED`). | Cancels spell effect completely. | **Hardcoded Mode**: Executes hardcoded C++ spell mechanics. |
| `@SpellFail` | Succeeds the action, but suppresses hardcoded fizzle effect. | Spell fails silently (no fizzle sound, no reagents lost). | Default hardcoded spell failure (fizzle effect + reagents lost). |

### 3. Movement & Physical Interaction
| Trigger | `return 0` | `return 1` | `return 2` |
| :--- | :--- | :--- | :--- |
| `@Step` / `@ItemStep` | Steps normally on tile/item. | Blocks movement (char cannot enter the tile). | Standard step. |
| `@PersonalSpace` | Pushes target aside, but suppresses bump message. | Fails to push target aside; movement blocked; stamina unaffected. | Pushes target aside, spends stamina, shows standard bump message. |
| `@DropOn_Item` | Item dropped into container. | Bounces item back to player cursor/pack. | Standard drop. |
| `@DropOn_Char` | Item handed to character/NPC. | Rejects item and bounces back. | Standard drop. |
| `@DropOn_Ground` | Item placed on ground. | Rejects drop and bounces item. | Standard drop. |

### 4. Artificial Intelligence (NPC AI)
| Trigger | `return 0` | `return 1` | `return 2` |
| :--- | :--- | :--- | :--- |
| `@NPCActFight` | Standard combat swing, but skips hardcoded breath/throwing. | Do nothing this combat tick (idle swing). | Standard fight AI (evaluates breath, throwing, magery, archery, melee). |
| `@NPCActFollow` | Don't step this tick, but remain in follow mode (ideal for ranged NPCs). | Completely stop following the target. | Standard pathfinding follow. |
| `@NPCLookAtChar` | Do not notice this specific character, but continue searching others. | Do not notice character and stop scanning all other characters this tick. | Standard perception (notices character, continues search). |
| `@NPCLookAtItem` | Do not notice this item, but continue searching other items. | Ignore item and stop scanning all other items this tick. | Standard perception (notices item, continues search). |

---

## Global Hook Return Codes

In global hook functions defined in `sphere_triggers.scp`:

| Function | `return 0` | `return 1` | Other Special Codes |
| :--- | :--- | :--- | :--- |
| `f_onaccount_connect` | Internal password check. | Reject connection (wrong password). | `return 6`: Skip internal password checks (handled purely in script). |
| `f_onaccount_login` | Allow client login. | Deny connection. | — |
| `f_onchar_create_init` | Allow character creation. | Deny character creation. | — |
| `f_onaccount_create` | Allow account creation. | Deny account creation. | — |
| `f_onaccount_delete` | Allow account deletion. | Deny account deletion. | — |
| `f_onserver_save` | Allow worldsave to proceed. | Abort worldsave. | — |
| `f_onserver_connectreq_ex` | Standard connection attempt. | `return 1`: Reject connection only.<br>`return 2`: Reject and ban IP. | — |
