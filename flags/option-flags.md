# Server Option Flags (`OF_*`)

> Configures game engine behavioral toggles in `sphere.ini` (`OptionFlags=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME optionflags]
of_nodclicktarget                   00000001 // Equipping weapons via DClick does not open a targeting cursor.
of_nosmoothsailing                  00000002 // Deactivates Smooth Sailing packet synchronization for modern clients.
of_scaledamagebydurability          00000004 // Weapons and armor lose effectiveness as durability degrades.
of_command_sysmsgs                  00000008 // Displays toggle feedback after staff commands (allmove, hearall).
of_petslot                          00000010 // Enables AOS follower slot limits (MAXFOLLOWER=5).
of_osimultisight                    00000020 // Only sends house contents when character enters multi boundary.
of_items_autoname                   00000040 // Automatically names scrolls and potions to match spell name.
of_filecommands                     00000080 // Enables FILE scripting API object.
of_noitemnaming                     00000100 // Suppresses "Crafted by" grandmaster maker's mark.
of_nohousemutespeech                00000200 // Characters outside houses cannot hear speech inside.
of_nocontextmenulos                 00000400 // Disables LOS check for opening context menus.
of_mapboundarysailing               00000800 // Boats wrap around map boundaries when reaching edges.
of_flood_protection                 00001000 // Prevents sending duplicate chat messages to client.
of_buffs                            00002000 // Enables client ML buff/debuff bar.
of_noprefix                         00004000 // Suppresses "a" and "an" English article prefixes on item names.
of_dyetype                          00008000 // Allows dyes on any item with t_dye_vat typedef.
of_drinkisfood                      00010000 // Drinking increases satiety level like eating food.
of_nodclickturn                     00020000 // Does not rotate character when double-clicking items.
of_nopaperdolltradetitle            00040000 // Suppresses trade skill title in paperdoll window.
of_notargturn                       00080000 // Does not rotate character when targeting.
of_statallowvalovermax              00100000 // Allows current stat values to exceed max (e.g. HITS > MAXHITS).
of_guardoutsideguardedarea          00200000 // Guards can pursue criminals into unguarded zones without teleporting home.
of_ownodropcarrieditem              00400000 // Overweighted characters do not drop items on ground when bouncing.
of_allowcontainerinsidecontainer    00800000 // Allows nesting heavy containers inside lighter containers.
of_ventorstocklimit                 01000000 // Enforces vendor purchase limits from TEMPLATE BUY lines.
of_enableguildalignnotoriety        02000000 // Guilds of same alignment treat each other as allies / enemies.
```
