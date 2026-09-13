# sphere.ini — Core Engine & Network Settings

> Primary system settings defining server identity, networking, memory management, and file persistence.

---

## Server Identity & Ports

| Setting | Default | Description |
| :--- | :--- | :--- |
| `ServName` | `SphereServer` | Name of the shard displayed on the client server selection screen. |
| `ServIP` | `127.0.0.1` | External or local IP bound for client connections. |
| `ServPort` | `2593` | Primary TCP game listener port for Ultima Online client connections. |
| `ClientVersion` | `7.0.20.0` | Default client version assumed for packet protocol handshakes. |

---

## World Save & Backup

| Setting | Default | Description |
| :--- | :--- | :--- |
| `SaveBackground` | `60` | Background save tick interval (in minutes). |
| `SaveStatics` | `0` | If 1, automatically writes static modifications to `spherestatics.scp`. |
| `SaveBackupLevels` | `3` | Number of historical rolling backup directories maintained in `save/`. |

---

## Threading & Performance

| Setting | Default | Description |
| :--- | :--- | :--- |
| `AutoResync` | `0` | Automatically reload scripts on file modification. |
| `SectorSleep` | `10` | Inactivity timer (minutes) before player-empty map sectors go to sleep. |
| `DeadSocketTime` | `5` | Minutes before disconnecting inactive/hung network sockets. |
