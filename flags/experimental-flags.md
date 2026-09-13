# Experimental Engine Flags (`EF_*`)

> Configures cutting-edge and experimental features in `sphere.ini` (`Experimental=`). Defined in `sphere_defs_sphere.scp`.

---

```scp
[DEFNAME experimentalflags]
ef_nodiagonalchecklos               000001 // Disables LOS checks across diagonal directions.
ef_dynamicbackgroundsave            000002 // Dynamically saves multiple sectors per tick during background save.
ef_itemstacking                     000004 // Enables auto-stacking of dropped items on the ground.
ef_itemstackdrop                    000008 // Drops item stacks automatically when an item is removed.
ef_fastwalkprevention               000010 // New fastwalk speedhack prevention algorithm.
ef_intrinsic_locals                 000020 // Enables implicit variable resolution (omits 'local.', 'tag.').
ef_item_strict_comparison           000040 // Distinguishes boards/logs and hides/leather as strictly distinct resource types.
ef_followerlist                     000080 // Enables CURFOLLOWER.n.UID and CURFOLLOWER list commands.
ef_allowtelnetpacketfilter          000200 // Enables packet filtering on Telnet connections.
ef_script_profiler                  000400 // Records script execution profiling stats (press 'P' on console).
ef_damagetools                      002000 // Tools take durability damage and fire `@Damage` when harvesting.
ef_usepingserver                    008000 // Enables UDP ping listener for server listings (port 12000).
ef_fixcanseeinclosedconts           020000 // CANSEE returns 0 for items inside containers client has not opened.
ef_walkcheckheightmounted           040000 // Adds +4 height check when character is mounted during walkchecks.
```
