# Base Object Functions & Verbs Reference (`CObjBase`)

> Verbs and actionable methods available on **ALL** game objects (both Characters `CChar` and Items `CItem`). Extracted directly from `Source-X/src/tables/CObjBase_functions.tbl` and `CObjBase.cpp`.

---

## Complete Verbs Catalog

| Verb / Function | Syntax | Description |
| :--- | :--- | :--- |
| `ADDCLILOC` | `ADDCLILOC cliloc_id, [args]` | Adds localized string entry to object client tooltip. |
| `REMOVECLILOC` | `REMOVECLILOC cliloc_id` | Removes localized string entry from object tooltip. |
| `REPLACECLILOC` | `REPLACECLILOC old_cliloc, new_cliloc, [args]` | Replaces existing tooltip cliloc entry. |
| `CLILOCLIST` | `CLILOCLIST` | Dumps active cliloc list to console/log. |
| `RESENDTOOLTIP` | `RESENDTOOLTIP [1]` | Forces client tooltip refresh packet to surrounding viewers. |
| `CLICK` | `CLICK` | Simulates single-click on the object. |
| `DCLICK` | `DCLICK` | Simulates double-click interaction on the object. |
| `DAMAGE` | `DAMAGE amount, [type], [attacker_uid]` | Applies direct damage to object. |
| `DIALOG` / `SDIALOG` | `SDIALOG dialog_name, [page]` | Opens graphical gump dialog on viewer/player. |
| `DIALOGCLOSE` | `DIALOGCLOSE dialog_name` | Dismisses active gump window on client. |
| `INPDLG` | `INPDLG function_name, max_chars, [prompt]` | Opens client text input dialog prompt. |
| `MENU` | `MENU menu_name` | Opens classic popup menu on client. |
| `EFFECT` | `EFFECT motion, item_id, [speed], [loop], [explode], [color], [render]` | Spawns visual particle/animation effect centered on object. |
| `EFFECTLOCATION` | `EFFECTLOCATION motion, item_id, dest_p, [src_p], [speed], [loop], [explode], [color], [render]` | Spawns visual particle effect at specific coordinate point. |
| `SOUND` | `SOUND sound_id, [repeats]` | Plays audio SFX centered at object coordinates. |
| `MESSAGE` / `MSG` | `MESSAGE [@color] text` | Emits overhead speech text above the object. |
| `MESSAGEUA` | `MESSAGEUA color, mode, font, lang, text` | Emits overhead Unicode speech text. |
| `SAY` / `SAYU` / `SAYUA` | `SAY [@color] text` | Emits speech message from the object. |
| `EMOTE` | `EMOTE [@color] text` | Emits overhead action text (e.g. `*looks around*`). |
| `MOVE` | `MOVE dir, [steps]` | Moves object in specified direction. |
| `MOVENEAR` | `MOVENEAR target_uid, [distance]` | Moves object adjacent to target coordinates. |
| `MOVETO` / `P` | `P = X,Y,Z,Map` / `MOVETO X,Y,Z,Map` | Sets exact map position of the object. |
| `NUDGEUP` / `NUDGEDOWN` | `NUDGEUP [z_delta]` / `NUDGEDOWN [z_delta]` | Adjusts object altitude Z by offset. |
| `Z` | `Z = new_z` | Directly assigns object Z altitude coordinate. |
| `FIX` | `FIX` | Re-evaluates object altitude and bounds against map statics. |
| `FLIP` | `FLIP` | Cycles object through directional graphic states (if `CAN_I_FLIP`). |
| `REMOVE` / `DESTROY` | `REMOVE` | Deletes object from the world memory pool. |
| `REMOVEFROMVIEW` | `REMOVEFROMVIEW` | Clears object from client visual packets without deleting it. |
| `SPELLEFFECT` | `SPELLEFFECT spell_id, [skill_level], [source_uid]` | Applies magical spell effect directly to object. |
| `TARGET` | `TARGET [prompt]` | Requests general targeting cursor on client. |
| `TIMERF` | `TIMERF seconds, function_name, [args]` | Schedules delayed procedural function call on this object. |
| `TIMERFMS` | `TIMERFMS milliseconds, function_name, [args]` | Schedules millisecond-precision delayed function call. |
| `TRIGGER` | `TRIGGER @trigger_name, [args]` | Forces manual execution of specific trigger on this object. |
| `TRY` | `TRY verb_and_args` | Safely executes verb on target if valid. |
| `TRYP` | `TRYP plevel, verb_and_args` | Executes verb under specified administrative privilege level. |
| `TRYSRC` | `TRYSRC char_uid, verb_and_args` | Executes verb setting `SRC` context to `char_uid`. |
| `TRYSRV` | `TRYSRV verb_and_args` | Executes verb in root server console context. |
| `UPDATE` / `UPDATEX` | `UPDATE` | Sends immediate visual update packet to all nearby viewers. |
| `USEITEM` | `USEITEM item_uid` | Simulates character using/activating the specified item. |
| `TAGLIST` / `BASETAGLIST` | `TAGLIST` | Dumps all custom tags defined on this object to console. |
| `PROPLIST` / `BASEPROPLIST` | `PROPLIST` | Dumps all dynamic component properties on this object. |
| `GOAWAKE` / `GOSLEEP` | `GOAWAKE` / `GOSLEEP` | Toggles sector sleep state containing this object. |
| `EDIT` / `INFO` | `INFO` | Opens GM in-game property editor dialog. |
