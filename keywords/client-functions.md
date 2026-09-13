# Client Socket Functions & Verbs Reference (`CClient`)

> Actionable methods executed on active connected player sockets (`CClient`). Extracted directly from `Source-X/src/tables/CClient_functions.tbl` and `CClient.cpp`.

---

## Complete Client Verbs Catalog

| Verb / Method | Syntax | Description |
| :--- | :--- | :--- |
| `ADD` | `ADD item_or_char_def` | Spawns target object on GM cursor. |
| `ADDBUFF` | `ADDBUFF icon_id, cliloc_title, cliloc_desc, [duration], [args]` | Adds icon entry to modern client ML buff bar. |
| `REMOVEBUFF` | `REMOVEBUFF icon_id` | Removes active icon from client buff bar. |
| `ADDCHAR` / `ADDITEM` | `ADDCHAR chardef` / `ADDITEM itemdef` | Places entity directly into world at cursor. |
| `ADDCONTEXTENTRY` | `ADDCONTEXTENTRY entry_id, cliloc_id, [flags], [color]` | Appends custom context menu item entry. |
| `ARROWQUEST` | `ARROWQUEST X, Y, [id]` | Spawns directional on-screen quest arrow pointing to coordinates. |
| `BANKSELF` | `BANKSELF` | Opens viewing player's bank box window. |
| `CAST` | `CAST spell_id` | Forces client to begin casting spell. |
| `CHANGEFACE` | `CHANGEFACE [1]` | Prompts face modification menu for Enhanced Clients. |
| `CHARLIST` | `CHARLIST` | Dumps account character list to client. |
| `CLEARCTAGS` | `CLEARCTAGS` | Wipes all session `ctag` variables on client. |
| `CLOSECONTAINER` | `CLOSECONTAINER container_uid` | Sends packet to force-close open container gump. |
| `CLOSEPAPERDOLL` | `CLOSEPAPERDOLL [char_uid]` | Sends packet to close paperdoll window. |
| `CLOSESTATUS` | `CLOSESTATUS [char_uid]` | Closes health bar / status gump. |
| `CLOSEVENDORMENU` | `CLOSEVENDORMENU [vendor_uid]` | Closes active vendor buy/sell list window. |
| `CODEXOFWISDOM` | `CODEXOFWISDOM page_id` | Opens client Codex of Wisdom help window. |
| `CTAGLIST` | `CTAGLIST` | Dumps active session `ctag` variables to console. |
| `DYE` | `DYE [color]` | Opens client dye color selection picker. |
| `FLUSH` | `FLUSH` | Flushes pending network packets to socket. |
| `GMPAGE` | `GMPAGE [text]` | Submits player help page to GM queue. |
| `GOTARG` | `GOTARG` | Teleports player directly to active target cursor object. |
| `MAPWAYPOINT` | `MAPWAYPOINT [0/1], X, Y` | Sets navigation pin waypoint on client map gump. |
| `MIDILIST` | `MIDILIST song_id` | Plays background MIDI music score on client. |
| `NUDGE` | `NUDGE [dx, dy, dz]` | Adjusts position of target on cursor. |
| `NUKE` / `NUKECHAR` / `NUKEITEM` | `NUKE area_radius` | Mass-deletes entities in area bounded by cursor selection. |
| `OPENPAPERDOLL` | `OPENPAPERDOLL char_uid` | Renders paperdoll window of target character. |
| `OPENTRADEWINDOW` | `OPENTRADEWINDOW target_char_uid` | Initiates secure trade transaction window. |
| `RESEND` | `RESEND` | Clears local cache and completely resends all visible world objects. |
| `SENDPACKET` | `SENDPACKET byte_stream` | Sends raw hex packet bytes directly to client stream. |
| `SHOWSKILLS` | `SHOWSKILLS` | Displays full skill list window on client. |
| `SKILLMENU` | `SKILLMENU menu_name` | Opens classic crafting skill menu. |
| `SKILLSELECT` | `SKILLSELECT skill_id` | Simulates clicking skill button in skill list. |
| `SKILLUPDATE` | `SKILLUPDATE skill_id` | Sends skill value update packet to client. |
| `SUMMON` | `SUMMON chardef, [duration]` | Summons NPC adjacent to client. |
| `TELE` | `TELE [X,Y,Z]` | Teleports client to cursor click location. |
| `TILE` | `TILE Z, itemdef, [X1,Y1,X2,Y2]` | Area tile placement tool. |
| `WEBLINK` | `WEBLINK url_string` | Sends web browser URL redirect packet to client. |
