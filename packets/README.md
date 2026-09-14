# SphereServer X Network Protocol & Packet Reference

This directory contains the authoritative technical documentation for the network protocol, packet formats, byte layouts, direction (Client to Server `C->S`, Server to Client `S->C`, or `Both`), and handling mechanisms in **SphereServer X (Source-X)**.

---

## 1. Overview & Architecture

SphereServer X handles incoming network traffic via `CPacketManager` and `CNetworkInput`. Packets are categorized into three main types:

1. **Standard Packets (`0x00` - `0xFF`):** Fixed or variable-length core Ultima Online network packets.
2. **Extended Packets (`0xBF` Subcommands):** Multiplexed extended client commands (`EXTDATA_TYPE`) handling party, spell precast, tooltips, context menus, and macros.
3. **Encoded Packets (`0xD7` Subcommands):** Encoded client commands (`EXTAOS_TYPE`) handling custom housing, weapon special moves, equip last weapon, and paperdoll buttons.

---

## 2. Documentation Index

| Document | Content |
| --- | --- |
| [Standard Packets](standard-packets.md) | Core C->S and S->C packets (`0x00` - `0xFF`), byte layouts, and handlers |
| [Extended 0xBF Packets](extended-bf-packets.md) | `0xBF` extended subcommands (`0x05` - `0x33`), party, OPL, macros, precast |
| [Encoded 0xD7 Packets](encoded-d7-packets.md) | `0xD7` encoded subcommands (`0x02` - `0x32`), custom housing, special moves |

---

## 3. Data Types & Byte Ordering

All multi-byte integer fields transmitted over the network are encoded in **Network Byte Order (Big-Endian)** unless specified otherwise:

- **`BYTE` / `UINT8`:** 8-bit unsigned integer (1 byte).
- **`WORD` / `UINT16`:** 16-bit unsigned integer (2 bytes, Big-Endian).
- **`DWORD` / `UINT32`:** 32-bit unsigned integer (4 bytes, Big-Endian).
- **`INT64` / `UINT64`:** 64-bit integer (8 bytes).
- **`STRING`:** Null-terminated ASCII character array (`\0`).
- **`UNICODE`:** UTF-16BE character array (2 bytes per character).
