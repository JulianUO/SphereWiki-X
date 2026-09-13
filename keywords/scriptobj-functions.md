# Global Verbs & Intrinsic Functions Reference (`CScriptObj`)

> Complete reference for global action verbs, object instantiators, mathematical evaluators, string manipulators, and hashing functions implemented in `CScriptObj_functions.tbl` and `CScriptObj.cpp` (Source-X).  
> These functions and verbs can be called from any script execution context.

---

## 1. Global Action Verbs

| Verb | Arguments | Description |
| :--- | :--- | :--- |
| `NEW <uid>` | `uid` | Manually sets the global creation pointer `g_World.m_uidNew` to `<uid>`. |
| `NEWDUPE <uid>` | `uid` | Duplicates item or NPC specified by `<uid>` and points `NEW` to the newly cloned instance. |
| `NEWITEM <defname> [,amount [,equipper_uid [,fTriggerEquip]]]` | `defname...` | Instantiates a new item in the world. If `equipper_uid` is specified, automatically places item in container or equips it on character. Points `NEW` to created item. |
| `NEWNPC <chardef>` | `chardef` | Instantiates a new NPC in the world and points `NEW` to created character. |
| `NEWSUMMON <chardef> [,duration_seconds]` | `chardef, seconds` | Spawns NPC with summon spell animation and applies timer decay on `LAYER_SPELL_Summon`. |
| `OBJ <uid>` | `uid` | Sets the global reference pointer `OBJ` (`g_World.m_uidObj`) to `<uid>`. |
| `SHOW <property>` | `property` | Evaluates `<property>` on current object and prints formatted debug output `"'prop' for 'name' is 'value'"` to source console/client. |
| `CLEARVARS [pattern]` | `[pattern]` | Clears all or matching global variables (`VAR.*`). |

---

## 2. Intrinsic Evaluation & Math Functions

| Function | Syntax | Description | Example |
| :--- | :--- | :--- | :--- |
| `EVAL` | `<EVAL <expr>>` | Evaluates arithmetic and bitwise expressions into signed 64-bit integer. | `<EVAL 10 + (5 * 2)>` &rarr; `20` |
| `UVAL` | `<UVAL <expr>>` | Evaluates expression as unsigned 64-bit integer. | `<UVAL -1>` &rarr; `18446744073709551615` |
| `HVAL` | `<HVAL <expr>>` | Formats evaluation result in hexadecimal notation (`0x...`). | `<HVAL 255>` &rarr; `0ff` |
| `FVAL` | `<FVAL <val>>` | Formats integer divided by 10 as fixed-point decimal. | `<FVAL 105>` &rarr; `10.5` |
| `FEVAL` | `<FEVAL <float_expr>>` | Truncates float value to integer. | `<FEVAL 3.75>` &rarr; `3` |
| `FHVAL` | `<FHVAL <float_expr>>` | Converts float truncated integer into hexadecimal. | `<FHVAL 255.4>` &rarr; `0ff` |
| `FLOATVAL` | `<FLOATVAL <math_expr>>` | Computes floating-point mathematical calculation. | `<FLOATVAL 10.5 * 2.0>` &rarr; `21.0` |
| `MULDIV` | `<MULDIV num, mul, div>` | Multiplies `num * mul` then divides by `div` with 64-bit overflow protection. | `<MULDIV 100, 75, 100>` &rarr; `75` |
| `BETWEEN` | `<BETWEEN min, max, cur, absmax>` | Linear interpolation returning value between `min` and `max` according to `cur / absmax`. | `<BETWEEN 10, 50, 5, 10>` &rarr; `30` |
| `BETWEEN2` | `<BETWEEN2 min, max, cur, absmax>` | Inverted linear interpolation between `min` and `max`. | `<BETWEEN2 10, 50, 5, 10>` &rarr; `30` |
| `ISBIT` | `<ISBIT val, bit_index>` | Tests if bit (0..63) is set in integer. | `<ISBIT 04, 2>` &rarr; `4` (true) |
| `SETBIT` | `<SETBIT val, bit_index>` | Sets bit (0..63) in integer and returns new value. | `<SETBIT 0, 3>` &rarr; `8` |
| `CLRBIT` | `<CLRBIT val, bit_index>` | Clears bit (0..63) in integer and returns new value. | `<CLRBIT 15, 0>` &rarr; `14` |
| `ISNUM` | `<ISNUM <str>>` | Returns `1` if string represents a numeric integer, `0` otherwise. | `<ISNUM 1234>` &rarr; `1` |
| `ISEMPTY` | `<ISEMPTY <str>>` | Returns `1` if string is empty or contains only whitespace, `0` otherwise. | `<ISEMPTY >` &rarr; `1` |
| `ISVALID` | `<obj.ISVALID>` | Returns `1` if object pointer is non-null and instantiated in world. | `<SRC.ISVALID>` &rarr; `1` |
| `GetRefType` | `<obj.GetRefType>` | Bitmask identifying underlying C++ object type (`0x40000` = CChar, `0x80000` = CItem, etc.). | `<UID.01.GetRefType>` |

---

## 3. String Manipulation & Parsing Functions

| Function | Syntax | Description | Example |
| :--- | :--- | :--- | :--- |
| `STRARG` | `<STRARG <string>>` | Returns first argument word prior to whitespace or comma delimiter. | `<STRARG hello world>` &rarr; `hello` |
| `STREAT` | `<STREAT <string>>` | Returns remainder of string after first argument word. | `<STREAT hello world>` &rarr; `world` |
| `STRFIRSTCAP` | `<STRFIRSTCAP <string>>` | Capitalizes first letter of string. | `<STRFIRSTCAP sword>` &rarr; `Sword` |
| `STRPOS` | `<STRPOS offset, char, string>` | Returns zero-based index of character in string starting search at `offset` (`-1` if not found). | `<STRPOS 0, o, Hello World>` &rarr; `4` |
| `STRSUB` | `<STRSUB start, count, string>` | Extracts substring of `count` characters starting at `start` index (supports negative indexing). | `<STRSUB 0, 4, Dragon>` &rarr; `Drag` |
| `STRTOKEN` | `<STRTOKEN string, index, delim>` | Extracts 1-based token index or range (e.g. `1-3`) using custom delimiter character. | `<STRTOKEN Apple:Banana:Cherry, 2, :>` &rarr; `Banana` |
| `STRTOLOWER` | `<STRTOLOWER <string>>` | Converts all characters to lowercase. | `<STRTOLOWER FOO>` &rarr; `foo` |
| `STRTOUPPER` | `<STRTOUPPER <string>>` | Converts all characters to uppercase. | `<STRTOUPPER foo>` &rarr; `FOO` |
| `STRTRIM` | `<STRTRIM <string>>` | Trims leading and trailing whitespace characters. | `<STRTRIM   test   >` &rarr; `test` |
| `STRREVERSE` | `<STRREVERSE <string>>` | Reverses order of characters in string. | `<STRREVERSE abc>` &rarr; `cba` |
| `EXPLODE` | `<EXPLODE delims, string>` | Splits string by any character in `delims` into comma-separated list. | `<EXPLODE :;, A:B;C>` &rarr; `A,B,C` |
| `STRRANDRANGE` | `<STRRANDRANGE <range>>` | Evaluates random dice/range notation into scalar. | `<STRRANDRANGE 10 20>` &rarr; `14` |
| `STRREGEXNEW` | `<STRREGEXNEW len, pattern, string>` | Matches regex pattern against string. Returns `1` if matched, `0` if unmatched, `-1` on regex error. | `<STRREGEXNEW 4, ^[0-9]+$, 1234>` &rarr; `1` |
| `ASC` | `<ASC <string>>` | Returns space-separated ASCII hex bytes for each character in string. | `<ASC AB>` &rarr; `041 042` |
| `ASCPAD` | `<ASCPAD pad_len, string>` | Converts string to ASCII hex padded with `0x00` to `pad_len` bytes. | `<ASCPAD 4, A>` &rarr; `041 00 00 00` |
| `CHR` | `<CHR <ascii_int>>` | Converts integer ASCII code to character. | `<CHR 65>` &rarr; `A` |

---

## 4. Cryptographic Hashing & System Commands

| Function | Syntax | Description |
| :--- | :--- | :--- |
| `MD5HASH` | `<MD5HASH <string>>` | Computes 32-character hexadecimal MD5 digest string. |
| `BCRYPTHASH` | `<BCRYPTHASH prefix, cost, password>` | Computes standard BCrypt password hash. `prefix` (`0`=`$2a$`, `1`=`$2b$`, `2`=`$2y$`), `cost` (`4`..`31`). |
| `BCRYPTVALIDATE` | `<BCRYPTVALIDATE hash, password>` | Validates plaintext password against BCrypt hash string. Returns `1` if valid, `0` otherwise. |
| `SYSCMD` | `SYSCMD <cmd> [arg1 ... arg9]` | Synchronously executes host operating system command. Pauses server until process exits and returns exit code. Requires `OF_FileCommands` in `sphere.ini`. |
| `SYSSPAWN` | `SYSSPAWN <cmd> [arg1 ... arg9]` | Asynchronously spawns host operating system process in background. Requires `OF_FileCommands` in `sphere.ini`. |

---

## 5. Constant & Definition Resolvers

| Resolver | Syntax | Description |
| :--- | :--- | :--- |
| `DEF.<key>` | `<DEF.<key>>` | Reads constant value defined in `[DEFNAME]`. Errors if key does not exist. |
| `DEF0.<key>` | `<DEF0.<key>>` | Reads constant value from `[DEFNAME]`, returning `0` / empty string if key does not exist. |
| `DEFMSG.<key>` | `<DEFMSG.<key>>` | Reads localization string from `[DEFMSG]`. |
| `RESDEF.<name>` | `<RESDEF.<name>>` | Reads integer resource ID assigned to a resource block name. |
| `RESDEF0.<name>` | `<RESDEF0.<name>>` | Reads resource ID, returning `0` if not found. |
| `RESOURCEINDEX <res>` | `<RESOURCEINDEX <res>>` | Resolves index of resource within its table. |
| `RESOURCETYPE <res>` | `<RESOURCETYPE <res>>` | Returns numeric resource type enum (`RES_ITEMDEF`, `RES_CHARDEF`, etc.). |
