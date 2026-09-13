# Section: [DIALOG]

> `[DIALOG d_*]` defines custom graphical gumps (user interface windows) sent from SphereServer to the Ultima Online client. A complete dialog consists of three interconnected blocks: layout, text string table, and button click handlers.

---

## Structure of a Dialog

```scp
[DIALOG d_character_profile]
0,0
nomove
noclose
page 0
resizepic 100 100 01453 350 300
dhtmlgump 130 120 290 25 0 0 <def.bfont_yellow><def.center>CHARACTER PROFILE<def.centere><def.bfont_black>
dhtmlgump 130 160 290 180 1 1 <def.bfont_black>Name: <name><br>Karma: <karma><br>Fame: <fame>

// Close button
button 240 430 0995 0996 1 0 1

[DIALOG d_character_profile TEXT]
// Raw string table (indexed 0..N for 'text' controls)

[DIALOG d_character_profile BUTTON]
ON=0
    // Fired when player right-clicks to close (if not noclose)
    sysmessage Closed profile.

ON=1
    // Fired when player clicks button with ID 1
    sysmessage Confirmed profile details.
```

---

## Layout Commands (`[DIALOG d_*]`)

| Command | Syntax | Description |
| :--- | :--- | :--- |
| `resizepic` | `resizepic X Y gumpID width height` | Scales a background frame gump to the given width/height. |
| `gumppic` | `gumppic X Y gumpID [hue]` | Places a static artwork gump image at X, Y. |
| `dhtmlgump` | `dhtmlgump X Y width height hasBackground hasScrollbar HTMLString` | Renders rich HTML text with automatic word wrapping. |
| `button` | `button X Y normalGump pressedGump isQuit pageID buttonID` | Creates a clickable button triggering `ON=buttonID`. |
| `text` | `text X Y hue textIndex` | Displays text from the `[DIALOG ... TEXT]` table at `textIndex`. |
| `textentry` | `textentry X Y width height hue textEntryID textIndex` | Creates an editable text input box. |
| `checkbox` | `checkbox X Y uncheckGump checkGump defaultState checkboxID` | Creates a toggleable checkbox. |
| `radio` | `radio X Y uncheckGump checkGump defaultState radioID` | Creates a mutually-exclusive radio button group. |
| `page` | `page pageNumber` | Switches rendering context to the specified page tab. |
| `nomove` | `nomove` | Locks window position on client screen (prevents dragging). |
| `noclose` | `noclose` | Prevents right-clicking the gump to dismiss it. |
| `nodispose` | `nodispose` | Prevents Esc key from dismissing the window. |

---

## Displaying Dialogs

```scp
// Display dialog to character
sdialog d_character_profile
src.sdialog d_character_profile

// Close/dismiss dialog
dialogclose d_character_profile
```
