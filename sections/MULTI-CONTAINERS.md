# Multi Storage & Container Architecture (Houses & Ships)

> In SphereServer X (Source-X), Multis are subdivided into two specialized object classes: **Houses (`CItemMulti` / `CItemMultiCustom`)** and **Ships (`CItemShip` / `CCMultiMovable`)**. Each provides dedicated internal container storage, component lists, and reference properties.

---

## 1. House Multi Architecture (`CItemMulti` / `CItemMultiCustom`)

Houses represent static or customizable multi-tile land structures. They maintain distinct permission tiers, component lists, and dedicated item containers.

### Dedicated House Containers & Collections

| Keyword / Property | Type | C++ Source Resolver | Description |
| :--- | :--- | :--- | :--- |
| `MOVINGCRATE` | `CItemContainer*` | `_uidMovingCrate` / `GetMovingCrate()` | Dedicated storage container holding items during house customization, ownership transfer, or demolition. |
| `SIGN` | `CItem*` | `Multi_GetSign()` (`IT_SIGN_GUMP`) | The house sign object anchored to the multi exterior. |
| `SECURECONTAINER(N)` | `CItemContainer*` | `_lSecureContainers[N]` | N-th container inside the house marked with `ATTR_SECURE` (`EVENTS=+ei_house_secure`). |
| `LOCKDOWN(N)` | `CItem*` | `_lLockDowns[N]` | N-th item locked down on the house floor with `ATTR_LOCKEDDOWN` (`EVENTS=+ei_house_lockdown`). |
| `ADDON(N)` | `CItemMulti*` | `_lAddons[N]` | N-th house addon structure (`IT_MULTI_ADDON`). |
| `COMPONENT(N)` | `CItem*` | `_lComps[N]` | N-th static tile component making up the house frame. |

### House Verbs & Operations

```scp
// Moving Crate Management
ref1.TRANSFERMOVINGCRATETOBANK   // Transfers all crate contents into the owner's bank box
ref1.TRANSFERLOCKDOWNSTOMOVINGCRATE // Packs floor lockdowns into the moving crate
ref1.TRANSFERSECUREDTOMOVINGCRATE   // Packs secure containers into the moving crate
ref1.REDEEDADDONS                // Packs all addons into deeds inside the crate

// Demolition & Redeeding
ref1.REDEED                      // Demolishes house and returns deed to owner backpack/bank
ref1.REMOVEALLCOMPS              // Cleans up all static components from the map
ref1.GENERATEBASECOMPONENTS      // Re-instantiates missing doors and components
```

### House Permissions & Lists

| Role | Count Keyword | Query Method | Add Verb | Delete Verb |
| :--- | :--- | :--- | :--- | :--- |
| **Owner** | — | `<ref1.GetOwner>` / `<ref1.IsOwner <uid>>` | `ref1.SetOwner = <uid>` | — |
| **Co-Owners** | `<ref1.Coowners>` | `<ref1.GetCoownerPos <uid>>` | `ref1.AddCoowner = <uid>` | `ref1.DelCoowner = <uid>` |
| **Friends** | `<ref1.Friends>` | `<ref1.GetFriendPos <uid>>` | `ref1.AddFriend = <uid>` | `ref1.DelFriend = <uid>` |
| **Access List** | `<ref1.Accesses>` | `<ref1.GetAccessPos <uid>>` | `ref1.AddAccess = <uid>` | `ref1.DelAccess = <uid>` |
| **Bans** | `<ref1.Bans>` | `<ref1.GetBanPos <uid>>` | `ref1.AddBan = <uid>` | `ref1.DelBan = <uid>` |
| **Vendors** | `<ref1.Vendors>` | `<ref1.GetVendorPos <uid>>` | `ref1.AddVendor = <uid>` | `ref1.DelVendor = <uid>` |

---

## 2. Ship Multi Architecture (`CItemShip` / `CCMultiMovable`)

Ships are dynamic, movable multi structures navigating ocean terrain. They have a completely separate set of containers and navigation components from houses.

### Dedicated Ship Containers & Navigation References

| Keyword / Property | Type | C++ Source Resolver | Description |
| :--- | :--- | :--- | :--- |
| `HATCH` / `HOLD` | `CItemContainer*` | `m_uidHold` / `GetShipHold()` | The physical ship hold container (`IT_SHIP_HOLD`, `IT_SHIP_HOLD_LOCK`) embedded in the deck. |
| `TILLER` | `CItem*` | `Multi_GetSign()` (`IT_SHIP_TILLER`) | The tillerman NPC/item attached to the ship bow. |
| `PLANK(N)` | `CItem*` | `m_uidPlanks[N]` / `GetShipPlank(N)` | N-th gangplank item (`IT_SHIP_PLANK`, `IT_SHIP_SIDE`, `IT_SHIP_SIDE_LOCKED`). |
| `PILOT` | `CUID` | `m_itShip.m_Pilot` (`IT_PILOT`) | The steering wheel / ship pilot object. |
| `ANCHOR` | `Byte` | `m_itShip.m_fAnchored` | `1` if ship anchor is dropped (prevents movement), `0` if raised. |

### Ship Triggers

```scp
[TYPEDEF t_ship]
ON=@ShipMove
    // Fired on each movement step across water tiles
    tiller.say Navigating ahead.

ON=@ShipStop
    // Fired when ship halts movement
    tiller.say Ship stopped.

ON=@ShipTurn
    // Fired when ship rotates facing direction (port, starboard, come about)
    tiller.say Turning vessel.
```

### Accessing Ship Storage & Planks in Scripts

```scp
// Accessing the Ship's Hold container
ref1 = <ship.uid>
ref2 = <ref1.hold.uid>   // Points to CItemContainer of ship hold
forcont <ref2.uid>
    if <baseid> == i_fish_raw
        local.fishCount += <amount>
    endif
endfor

// Locking / Unlocking Ship Planks
for i 0 <eval <ref1.planks> - 1>
    ref3 = <ref1.plank.<dlocal.i>.uid>
    if (<ref3.isvalid>)
        ref3.more1 = <ref1.more1> // Synchronize key lock code
    endif
endfor
```
