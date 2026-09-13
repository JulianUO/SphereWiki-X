# Server & Global System Triggers

> Global hook functions declared under `[PLEVEL 7]` in `sphere_triggers.scp` intercept core server lifecycle events, network handshakes, accounts, and character lifecycle events.

---

## Core Server Lifecycle

### `[FUNCTION f_onserver_start]`
Fired once when SphereServer finishes initial boot sequence and loads all scripts and map sectors.

### `[FUNCTION f_onserver_exit]`
Fired when SphereServer begins controlled shutdown before releasing network sockets.

### `[FUNCTION f_onserver_save]`
Fired before worldsave starts.
- **IN**:
  - `ARGN1`: `1` if save is forced.
  - `ARGN2`: Save stage index (for background saves).
- **RET**:
  - `1`: Aborts worldsave.
  - `0`: Allows save to proceed.

### `[FUNCTION f_onserver_save_ok]`
Fired after a worldsave stage finishes successfully.

### `[FUNCTION f_onserver_save_fail]`
Fired if a worldsave stage encounters a disk write error.

### `[FUNCTION f_onserver_save_finished]`
Fired when the entire worldsave process completes.
- **IN**:
  - `ARGS`: Duration string in seconds taken to complete the save.

### `[FUNCTION f_onserver_timer]`
Fired periodically (every 5 minutes by default) for scheduled tasks.

---

## Account & Connection Hooks

### `[FUNCTION f_onaccount_connect]`
Fired when a client connects to the login port, before password validation.
- **IN**:
  - `LOCAL.Account`: Given account name.
  - `LOCAL.Password`: Given password string.
- **RET**:
  - `0`: Use internal password check (default).
  - `1`: Disconnect client (invalid password).
  - `6`: Skip internal password checks (handled purely in scripts).

### `[FUNCTION f_onaccount_login]`
Fired after successful authentication.
- **IN**:
  - `ARGS`: Account name.
  - `ARGO`: Client connection object.
  - `ARGN1`: Connection protocol type (`3`=UO login, `4`=Game server, `5`=HTTP, `6`=Telnet).
- **RET**:
  - `1`: Deny connection.

### `[FUNCTION f_onaccount_create]` / `[FUNCTION f_onaccount_delete]`
Fired before an account is registered or purged from the database.

### `[FUNCTION f_onaccount_pwchange]`
Fired when an account password is modified.

---

## Character Creation & Deletion

### `[FUNCTION f_onchar_create_init]`
Fired before character creation packet is processed.
- **IN**:
  - `ARGN1`: Feature flags from client.
  - `ARGN2`: Profession index (`0`=Adv, `1`=Warrior, `2`=Mage, `3`=Archer, `4`=Necro, `5`=Paladin, `6`=Samurai, `7`=Ninja, `8`=Bard, `9`=Smith).
  - `ARGN3`: Race (`1`=Human, `2`=Elf, `3`=Gargoyle).
- **OUT**:
  - `ARGN1`, `ARGN2`, `ARGN3`: Modifiable (e.g. override profession or race).
- **RET**:
  - `1`: Denies character creation.

### `[FUNCTION f_onchar_create]`
Fired after character entity is allocated in memory.
- **IN**:
  - `SRC`: Newly created character.
  - `ARGS`: Account name.

### `[FUNCTION f_onchar_delete]`
Fired before a character is purged from disk.
- **IN**:
  - `SRC`: Character being deleted.

---

## Command & Packet Interception

### `[FUNCTION f_oncommand]`
Fired whenever any player or staff member executes a dot command (e.g. `.where`, `.jail`).
- **IN**:
  - `ARGS`: Command text entered by client.
- **RET**:
  - `1`: Overrides command; suppresses hardcoded command handler.
