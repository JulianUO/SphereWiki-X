# sphere.ini — Client Expansion & Feature Flags

> Bitmasks defining enabled expansions, client packet capabilities, and graphical assets communicated during login handshakes.

---

## Client Feature Bitmasks

### `Features=` (Client Protocol Flags)
```ini
Features=010f
```
- `0001` (T2A): Enables in-game chat button.
- `0002` (LBR): Enables LBR MP3 audio.
- `0004` (T2A): Enables T2A map / monster updates.
- `0008` (LBR): Enables LBR monster animations.
- `0010` (AOS): Enables AOS combat abilities.
- `0020` (SE): Enables Samurai Empire assets.
- `0040` (ML): Enables Mondain's Legacy elven assets.
- `0080` (SA): Enables Stygian Abyss gargoyle assets.

### `FeaturesLogin=` (AOS+ Login Features)
```ini
FeaturesLogin=028
```
- `0002`: Send/Request Logout confirmation packet.
- `0004`: Single character only selection (Siege Perilous mode).
- `0008`: NPC context menu popup support.
- `0020`: Tooltip / Combat fightbook packet integration.
- `0080`: 6th Character slot support.
- `0100`: 7th Character slot support.
