# sphere.ini Configuration Reference

> `sphere.ini` is the primary configuration file loaded on server boot. It dictates network ports, security filters, performance loops, client feature flags, global combat/magic mechanics, and global event attachments.

---

## Configuration Sections

| Document | Description |
| :--- | :--- |
| [`core-settings.md`](core-settings.md) | Server ports, save intervals, client limits, multithreading, and log settings. |
| [`features-flags.md`](features-flags.md) | Expansion toggles (`Features=`, `FeaturesLogin=`, `FeaturesExtra=`). |
| [`combat-magic.md`](combat-magic.md) | Global combat engine, parry formulas, magic flags, and stamina consumption. |
| [`events-global.md`](events-global.md) | Global event listeners (`EventsPlayer=`, `EventsPet=`, `EventsItem=`, `EventsRegion=`). |
