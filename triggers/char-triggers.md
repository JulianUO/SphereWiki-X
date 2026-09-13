# Character Triggers Reference (`CChar`)

> Exhaustive catalog of all triggers executing on living characters, monsters, NPCs, and players in SphereServer X. Extracted directly from engine source (`triggers.tbl`, `CChar.cpp`, `CCharNPCAct.cpp`, `CCharUse.cpp`, `CClientEvent.cpp`).

---

## 1. Trigger Context & Implicit References

Inside any character trigger:
- **`DEFAULT` (`this`)**: The character instance (`CChar`) executing the trigger.
- **`SRC`**: The secondary character, attacker, clicker, or interlocutor.
- **`ARGO`**: The contextual object (item, weapon, corpse, trade container, mount).
- **`ARGN1`, `ARGN2`, `ARGN3`**: Trigger numeric registers.
- **`ARGS`**: Trigger string register.

---

## 2. Combat & Damage Triggers

### `@Attack` / `@CombatStart`
Fired when a character initiates attack aggression against an enemy.
- `SRC`: The enemy target.
- `RET`: `1` cancels attack initiation.

### `@CombatEnd`
Fired when combat mode terminates.

### `@CombatAdd` / `@CombatDelete`
Fired when an opponent is added to or removed from the `ATTACKER` list.
- `SRC`: Opponent character.

### `@GetHit`
Fired when character is struck by physical, ranged, or magic damage.
- `SRC`: Attacker character.
- `ARGN1`: Raw damage amount (IN/OUT).
- `ARGN2`: Damage type bitmask (`dam_physical`, `dam_fire`, `dam_cold`, `dam_poison`, `dam_energy`) (IN/OUT).
- `ARGO`: Weapon or spell item used.
- `RET`: `1` cancels damage completely (no hit reaction, blood, or animation).

### `@Hit`
Fired on the attacker when their swing connects with the target.
- `SRC`: Victim character receiving the hit.
- `ARGO`: Weapon item used.
- `ARGN1`: Calculated damage (IN/OUT).
- `RET`: `1` cancels blow before `@GetHit` fires on victim.

### `@HitCheck`
Fired before each swing attempt in combat.
- `SRC`: Target character.
- `RET`: `1` cancels swing attempt.

### `@HitTry`
Fired when preparing to swing weapon / unarmed.
- `SRC`: Target character.
- `ARGO`: Weapon item.
- `RET`: `1` cancels attack swing.

### `@HitMiss`
Fired when attacker's swing misses target.
- `SRC`: Target character.
- `ARGO`: Weapon item.
- `RET`: `1` misses silently (suppresses miss SFX and animation).

### `@HitParry`
Fired when an incoming physical blow is successfully parried with shield or weapon.
- `SRC`: Attacker.
- `ARGN1`: Damage amount absorbed/parried.
- `ARGO`: Shield item used.

### `@HitReactive`
Fired when damage is reflected by Reactive Armor spell layer.
- `SRC`: Attacker receiving the reflected damage.
- `ARGN1`: Damage amount reflected.

### `@Damage`
Fired whenever hitpoints are reduced from any source.
- `SRC`: Source entity (char or item).
- `ARGN1`: Damage amount (IN/OUT).
- `ARGN2`: Damage type flags (`dam_*`).
- `RET`: `1` cancels hitpoint deduction.

### `@DamageGiven`
Fired on the attacker whenever they inflict damage on an enemy.
- `SRC`: Victim character.
- `ARGN1`: Final damage dealt.
- `ARGN2`: Damage type flags.

---

## 3. Death, Corpses, Crime & Karma

### `@Death`
Fired when hitpoints drop to 0, immediately before corpse instantiation.
- `SRC`: Killer character.
- `ARGN1`: Raw damage causing death.
- `ARGN2`: Damage flags.
- `RET`: `1` prevents death! Restores minimum hitpoints.

### `@DeathCorpse`
Fired immediately after corpse container is created in the world.
- `SRC`: Killer character.
- `ARGO`: Newly created corpse item (`CItemCorpse`).

### `@Kill`
Fired on the killer character when delivering the fatal blow.
- `SRC`: Dead victim character.

### `@CarveCorpse`
Fired when carving a corpse with a bladed weapon.
- `SRC`: Character carving.
- `ARGO`: The corpse container (`CItemCorpse`).
- `RET`: `1` cancels carving.

### `@Resurrect`
Fired when a ghost character is being resurrected back to life.
- `SRC`: Resurrecting character, healer, or shrine.
- `ARGN1`: `1` if forced resurrection (bypasses dialog).
- `RET`: `1` prevents resurrection.

### `@Criminal`
Fired when a character performs a criminal act.
- `ARGN1`: Criminal timer duration in tenths of a second.
- `RET`: `1` cancels criminal flag application.

### `@SeeCrime`
Fired when character witnesses a criminal act in visual range.
- `SRC`: The criminal character.
- `ARGO`: The victim of the crime.

### `@SeeSnoop`
Fired when character witnesses another character attempting to snoop a backpack.
- `SRC`: Snooping character.
- `ARGO`: Container being snooped.

### `@SeeHidden`
Fired when character detects a hidden or invisible character.
- `SRC`: The hidden character.

### `@KarmaChange` / `@FameChange`
Fired when alignment points change.
- `ARGN1`: Alignment delta (positive or negative) (IN/OUT).
- `RET`: `1` cancels point adjustment.

### `@NotoSend`
Fired when the client notoriety color is computed for a character.
- `SRC`: Viewer character requesting notoriety.
- `ARGN1`: Notoriety index (`1`=Innocent/Blue, `2`=Guild/Green, `3`=Neutral/Grey, `4`=Criminal/Grey, `5`=Enemy/Orange, `6`=Evil/Red, `7`=Invul/Yellow) (IN/OUT).

---

## 4. Movement, Environment & Interaction

### `@Step`
Fired when taking a step onto a tile or item.
- `ARGN1`: `1` if standing in place/turning, `0` if stepping into new tile.
- `RET`: `1` blocks movement into tile.

### `@StepStealth`
Fired on each step while moving invisibly under the Stealth skill.
- `ARGN1`: Steps taken.
- `RET`: `1` reveals character immediately.

### `@PersonalSpace` / `@CharShove`
Fired when bumping into / pushing past another character.
- `SRC`: Character being shoved.
- `ARGN1`: Stamina cost required (IN/OUT).
- `RET`: `1` blocks movement; `0` shoves silently; `2` default push.

### `@Falling`
Fired when character drops Z levels and takes fall damage.
- `ARGN1`: Fall distance in Z units.
- `ARGN2`: Calculated fall damage.

### `@EnvironChange`
Fired when regional weather, season, temperature, or light level changes around character.

### `@ToggleFlying`
Fired when a Gargoyle character toggles flight mode.
- `ARGN1`: `1` if taking off, `0` if landing.
- `RET`: `1` cancels flight toggle.

---

## 5. NPC Artificial Intelligence (AI)

### `@NPCActFight`
Fired on NPC combat AI tick to select attack tactics.
- `SRC`: Active combat target.
- `ARGN1`: Distance in tiles to target (IN/OUT).
- `ARGN2`: Motivation level (< 0 flees) (IN/OUT).
- `RET`: `1` skip combat tick; `0` melee/ranged but skip breath/throw; `2` full default AI.

### `@NPCActFollow`
Fired on NPC follow AI tick when pursuing master or target.
- `SRC`: Target pursued.
- `ARGN1`: Fleeing flag (0=follow, 1=flee).
- `ARGN2`: Max distance.
- `RET`: `1` stop following; `0` stay in follow mode without stepping; `2` standard step.

### `@NPCActWander`
Fired on idle NPC movement tick.
- `RET`: `1` cancels wandering step.

### `@NPCSeeNewPlayer`
Fired when a player character enters visual radius of the NPC.
- `SRC`: Player character spotted.

### `@NPCLookAtChar`
Fired when NPC scans sector for valid targets.
- `SRC`: Character inspected.
- `RET`: `1` ignore char and abort scan; `0` ignore char, continue scanning; `2` standard perception.

### `@NPCLookAtItem`
Fired when NPC with `mt_usehands` spots ground items.
- `ARGO`: Item spotted.
- `RET`: `1` ignore item and abort; `0` ignore item, continue; `2` standard loot/forage.

### `@NPCAcceptItem` / `@NPCRefuseItem`
Fired when a player drops an item onto an NPC.
- `SRC`: Player dropping item.
- `ARGO`: Item dropped.
- `RET`: `1` cancels transfer.

### `@NPCHearGreeting` / `@NPCHearUnknown`
Fired when player speaks words matching NPC speech triggers (`spk_*`).
- `SRC`: Speaking player.
- `ARGS`: Speech text.

### `@NPCRestock`
Fired when vendor restock timer expires to replenish inventory.

### `@PetDesert` / `@PetRelease`
Fired when pet abandons master due to hunger or is manually released.
- `SRC`: Master character.
- `RET`: `1` prevents desertion/release.

---

## 6. Player UI, Paperdoll, Trade & Party

### `@CharClick` / `@CharDClick`
Fired when character is single-clicked or double-clicked by a player.
- `SRC`: Viewer player character.

### `@CharClientTooltip`
Fired when composing character extended tooltip.
- `SRC`: Viewer player.

### `@SendPaperdoll`
Fired when opening a character's paperdoll window.
- `SRC`: Player opening paperdoll.

### `@TradeCreate` / `@TradeClose` / `@TradeAccepted` / `@CharTradeAccepted`
Fired during player secure trade window transactions.
- `SRC`: Trading partner character.
- `ARGO`: Trade window container (`IT_EQ_TRADE_WINDOW`).
- `RET`: `1` aborts / rejects trade.

### `@PartyInvite` / `@PartyAdd` / `@PartyRemove` / `@PartyLeave` / `@PartyDisband`
Fired on party system management actions.
- `SRC`: Party member / inviter.

### `@UserQuestButton` / `@UserQuestArrowClick`
Fired when clicking the paperdoll Quest icon or screen directional quest arrow.

### `@UserGuildButton` / `@UserVirtue` / `@UserVirtueInvoke` / `@UserSpecialMove` / `@UserStats` / `@UserSkills` / `@UserWarMode`
Fired on client hotbar, macro, or menu button activations.
