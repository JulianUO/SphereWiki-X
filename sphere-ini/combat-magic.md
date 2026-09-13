# sphere.ini — Combat & Magic Configuration

> Global flags configuring combat algorithms, magic casting, damage calculation, and skill checks.

---

## Configuration Settings

```ini
// Combat Flags (bitmask from [DEFNAME combatflags])
CombatFlags=04028

// Magic Flags (bitmask from [DEFNAME magicflags])
MagicFlags=010

// Parry Flags (bitmask from [DEFNAME parryflags])
ParryFlags=01

// Maximum distance for melee combat swings
CombatMaxDist=2

// Pre-hit animation delay in tenths of a second
CombatPreHitDelay=10

// Stamina loss per melee strike received
StaminaLossAtHit=10
```
