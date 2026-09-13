# Account Properties Reference (`ACCOUNT.*`)

> Properties and verbs associated with player accounts (`<account.PROPERTY>`).

---

## Properties

| Property | Access | Type | Description |
| :--- | :---: | :--- | :--- |
| `ACCOUNT.NAME` | R | String | Account login username. |
| `ACCOUNT.PLEVEL` | R/W | Integer | Account administrative security tier (0 to 7). |
| `ACCOUNT.CHARS` | R | Integer | Total count of characters associated with this account. |
| `ACCOUNT.CHAR(N)` | R | UID | UID of the N-th character on the account (0-indexed). |
| `ACCOUNT.TAG.*` | R/W | Custom | Persistent custom account tags. |
| `ACCOUNT.BLOCKED` | R/W | Boolean | Sets or queries banned / blocked status. |
