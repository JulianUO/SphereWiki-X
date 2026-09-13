# Section: [PLEVEL]

> `[PLEVEL N]` establishes privilege level requirements (from 0 to 7) for executing in-game dot commands and script functions from the client console or chat window.

---

## Privilege Tiers

| Tier | Name | Typical Role |
| :---: | :--- | :--- |
| `0` | Player | Standard players (`.where`, `.stuck`, `.quest`, `.help`). |
| `1` | Counselor | Player assistance staff (`.page`, `.tele`, `.jail`). |
| `2` | Game Master (GM) | In-game moderators (`.add`, `.dupe`, `.kick`, `.kill`, `.invul`). |
| `3` | Seer | World event creators (`.cast`, `.spawngroup`, `.anim`). |
| `4` | Developer / Builder | Content designers and scripters (`.resync`, `.load`, `.tile`). |
| `5` | Administrator | Shard administrators (`.serv`, `.save`, `.shutdown`, `.tweak`). |
| `6` | Owner | Root shard host. |
| `7` | Server Core | Internal system triggers (`f_onserver_*`, `f_onaccount_*`, `f_onchar_*`). |

---

## Syntax

```scp
[PLEVEL 2]
f_gm_inspect_sockets
f_spawn_test_monster
f_teleport_hub
```
