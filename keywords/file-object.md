# FILE Object Reference (`FILE.*`)

> The `FILE` object allows direct disk file input and output from SphereScript (requires `OF_FileCommands` enabled in `sphere.ini`).

---

## File Modes & Properties

| Method / Property | Access | Description |
| :--- | :---: | :--- |
| `FILE.MODE.APPEND` | R/W | Opens file in append mode. |
| `FILE.MODE.CREATE` | R/W | Creates or overwrites file for writing. |
| `FILE.MODE.READFLAG` | R/W | Opens existing file in read-only mode. |
| `FILE.OPEN filename` | Verb | Opens target file on disk. Returns 1 if successful. |
| `FILE.INUSE` | R | Checks if a file handle is currently open. |
| `FILE.ISEOF` | R | Checks if the read pointer has reached the end of the file. |
| `FILE.LENGTH` | R | Returns file size in bytes. |
| `FILE.READLINE [N]` | R | Reads the N-th line from the file (`0` reads last line). |
| `FILE.WRITE string` | Verb | Writes text to the open file without newline. |
| `FILE.WRITELINE string` | Verb | Writes text followed by a newline delimiter. |
| `FILE.CLOSE` | Verb | Flushes buffers and closes the active file handle. |
| `FILE.DELETEFILE filename`| Verb | Deletes specified file from disk. |
