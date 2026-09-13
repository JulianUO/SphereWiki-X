# Dialog Triggers Reference

> Event handlers declared in `[DIALOG d_* BUTTON]` sections for processing client UI interactions.

---

## Syntax

```scp
[DIALOG d_my_menu BUTTON]
ON=0
    // Right click dismiss / Cancel
    sysmessage Menu cancelled.

ON=1
    // Button ID 1 clicked
    sysmessage Option 1 selected.
    local.choice = <argchk>
    local.text = <argtxt[0]>

ON=2
    // Button ID 2 clicked
```

---

## Variables Available in Dialog Triggers

| Variable | Type | Description |
| :--- | :--- | :--- |
| `DEFAULT` | `CChar` | The player character who clicked the dialog. |
| `ARGN1` | Integer | ID of the button that was pressed. |
| `ARGCHK` | Array / Mask | State of radio buttons or checkboxes selected in the gump. |
| `ARGTXT[N]` | Array | String contents submitted in `textentry` fields (0-indexed). |
| `SRC` | `CChar` | In dialog context, points to the player. |
