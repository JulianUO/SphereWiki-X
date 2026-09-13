# Character Functions & Verbs Reference (`CChar`)

> Actionable verbs and methods available on **Characters, NPCs, and Players** (`CChar`). Extracted directly from `Source-X/src/tables/CChar_functions.tbl` and `CChar.cpp`.

---

## Complete Character Verbs Catalog

| Verb / Method | Syntax | Description |
| :--- | :--- | :--- |
| `AFK` | `AFK [0/1]` | Toggles away-from-keyboard status mode. |
| `ALLSKILLS` | `ALLSKILLS [value]` | Sets all 55+ character skills to specified numeric level. |
| `ANIM` | `ANIM anim_id, [action_count], [repeat_count], [forward], [repeat], [delay]` | Forces body animation sequence. |
| `ATTACK` | `ATTACK target_uid` | Initiates combat attack aggression against target. |
| `BANK` | `BANK` | Opens player's bank box container window. |
| `BARK` | `BARK sound_id` | Plays creature sound effect. |
| `BOUNCE` | `BOUNCE item_uid` | Places item in character backpack (drops on ground if full). |
| `BOW` | `BOW` | Performs bowing character animation. |
| `CONSUME` | `CONSUME amount, itemdef` | Deducts specified quantity of resource/item from inventory. |
| `CONTROL` | `CONTROL [char_uid]` | GM possesses / directly controls target NPC body. |
| `CRIMINAL` | `CRIMINAL [duration_seconds]` | Flags character as criminal in the notoriety engine. |
| `CURE` | `CURE [potion_strength]` | Cures active poison layers from character. |
| `DISCONNECT` | `DISCONNECT` | Closes network socket and drops client connection. |
| `DROP` | `DROP [item_uid]` | Drops item from cursor/hands onto ground. |
| `DUPE` | `DUPE [amount]` | Creates duplicate copy of character. |
| `EQUIP` | `EQUIP item_uid` | Equips item onto appropriate paperdoll layer. |
| `EQUIPARMOR` | `EQUIPARMOR` | Auto-equips best armor found in inventory. |
| `EQUIPWEAPON` | `EQUIPWEAPON` | Auto-equips weapon found in inventory. |
| `EQUIPHALO` | `EQUIPHALO` | Equips GM staff halo memory object. |
| `FACE` | `FACE [target_uid / p]` | Turns character to face coordinates or target. |
| `FIXWEIGHT` | `FIXWEIGHT` | Recalculates total inventory weight carried in stones. |
| `FORGIVE` | `FORGIVE` | Clears all criminal flags and murder decay timers. |
| `GO` / `GONAME` / `GOUID` | `GO coordinates / town_name / uid` | Instantly teleports character to destination. |
| `GOCHAR` / `GOCHARID` | `GOCHAR char_uid` / `GOCHARID id` | Teleports to specific character instance or type. |
| `GOCLI` / `GOSOCK` | `GOCLI client_index` | Teleports to client connection index. |
| `GOITEMID` / `GOTYPE` | `GOITEMID item_id` / `GOTYPE type` | Teleports to nearest item of specified ID/type. |
| `HEAR` | `HEAR text` | Simulates character hearing speech text. |
| `HUNGRY` | `HUNGRY [value]` | Sets or checks character food/satiety level. |
| `INVIS` | `INVIS [0/1]` | Toggles GM invisible state (`statf_insubstantial`). |
| `INVUL` | `INVUL [0/1]` | Toggles invulnerability state (`statf_invul`). |
| `JAIL` | `JAIL [0/1]` | Teleports character to jail cells and restricts commands. |
| `KILL` | `KILL` | Forces character death, creating corpse and ghost. |
| `MAKEITEM` | `MAKEITEM itemdef, [skill_level]` | Triggers crafting skill engine action to produce item. |
| `MOUNT` | `MOUNT mount_char_uid` | Mounts character onto target creature. |
| `NEWBIESKILL` | `NEWBIESKILL skill_id` | Configures starting profession newbie equipment. |
| `NEWGOLD` | `NEWGOLD amount` | Adds gold directly into player backpack. |
| `NEWLOOT` | `NEWLOOT template_name` | Evaluates loot template and deposits into inventory. |
| `NOTOCLEAR` | `NOTOCLEAR` | Clears all notoriety karma/fame cache overrides. |
| `NOTOUPDATE` | `NOTOUPDATE` | Sends immediate notoriety color refresh packet to all viewers. |
| `OWNER` | `OWNER = char_uid` | Assigns pet / hireling master ownership. |
| `PACK` | `PACK` | Opens backpack container window. |
| `POISON` | `POISON [poison_level]` | Applies poison layer effect (`layer_flag_poison`). |
| `POLY` | `POLY body_id, [hue]` | Polymorphs character into creature body. |
| `PRIVSET` | `PRIVSET plevel` | Modifies player account privilege tier. |
| `RESURRECT` | `RESURRECT [1]` | Restores ghost character to life. |
| `REVEAL` | `REVEAL [flags]` | Removes `statf_hidden` and `statf_invisible` states. |
| `SALUTE` | `SALUTE` | Performs salute character animation. |
| `SKILL` | `SKILL skill_id` | Manually initiates skill action loop. |
| `SKILLGAIN` | `SKILLGAIN skill_id, [chance]` | Forces skill advancement calculation roll. |
| `SLEEP` / `WAKE` | `SLEEP` / `WAKE` | Puts NPC to sleep / awakens NPC. |
| `SUICIDE` | `SUICIDE` | Character executes self-kill. |
| `SUMMONCAGE` | `SUMMONCAGE [duration]` | Summons magical holding cage around target. |
| `SUMMONTO` | `SUMMONTO char_uid` | Teleports target character directly to caller location. |
| `SYSMESSAGE` / `SMSG` | `SYSMESSAGE [@color] text` | Sends chat window message to player client. |
| `SYSMESSAGELOC` | `SYSMESSAGELOC cliloc_id, [args]` | Sends localized cliloc string to client. |
| `TARGETCLOSE` | `TARGETCLOSE` | Cancels active client targeting cursor. |
| `UNDERWEAR` | `UNDERWEAR` | Strips all non-newbie clothing layers. |
| `UNEQUIP` | `UNEQUIP item_uid / layer` | Moves equipped layer item back into backpack. |
| `UNIVERSALCOMMAND` | `UNIVERSALCOMMAND command_text` | Parses dot-command string as typed by player. |
| `WHERE` | `WHERE` | Displays exact X, Y, Z, Map coordinates in chat. |
