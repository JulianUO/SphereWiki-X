# Account Privilege Flags (`PRIV_*`)

> Configures administrative and gameplay privileges in player accounts. Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME autoprivflags]
priv_gm                             00002 // Grants GM command access.
priv_gm_page                        00008 // Receives player GM help page queues.
priv_hearall                        00010 // Can hear all player speech globally.
priv_allmove                        00020 // Can move locked/unmoveable items.
priv_detail                         00040 // Displays detailed combat damage messages.
priv_debug                          00080 // Renders debug boxes for entities.
priv_priv_noshow                    00200 // Displays GM title and invulnerability flag.
priv_telnet_short                   00400 // Suppresses server broadcast messages over Telnet.
priv_jailed                         00800 // Account is jailed (must be pardoned).
priv_blocked                        02000 // Account is banned / blocked.
priv_allshow                        04000 // Displays offline characters.
```
