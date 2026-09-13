# Item Triggers Reference (`CItem`)

> Exhaustive catalog of all triggers executing on physical objects, weapons, armor, containers, and items in SphereServer X. Extracted directly from engine source (`triggers.tbl`, `CItem.cpp`, `CItemContainer.cpp`, `CClientEvent.cpp`).

---

## 1. Trigger Context & Implicit References

Inside any item trigger:
- **`DEFAULT` (`this`)**: The item instance (`CItem`) executing the trigger.
- **`SRC`**: The character (`CChar`) interacting with, lifting, clicking, equipping, or dropping the item.
- **`ARGO`**: The secondary object (target container, character receiving drop, or tool used).
- **`CONT`**: The container holding this item (`<cont.name>`, `<cont.uid>`).
- **`TOPCONT`**: The topmost container holding this item.
- **`TOPOBJ`**: The root character or ground object holding this item.
- **`LINK`**: The object linked via `m_uidLink`.
- **`REGION`**: The geographic region where the item is located.
- **`SECTOR`**: The map sector where the item is located.
- **`ARGN1`, `ARGN2`, `ARGN3`**: Trigger numeric registers.
- **`ARGS`**: Trigger string register.

---

## 2. Creation, Lifecycle & Durability

### `@Create` / `@ItemCreate`
Fired immediately when an item instance is instantiated and allocated in memory.
- `DEFAULT`: The newly created `CItem`.

### `@Destroy` / `@ItemDestroy`
Fired when an item is deleted from the world via `.remove` or garbage collection.

### `@Timer` / `@ItemTimer`
Fired when the item's countdown timer reaches 0 (`TIMER=0`).
- `RET`: `1` suppresses default decay/removal; `0` allows standard decay.

### `@Damage` / `@ItemDamage`
Fired when an item takes durability loss from combat or environmental damage.
- `SRC`: Character dealing the blow.
- `ARGN1`: Durability damage amount (IN/OUT).
- `ARGN2`: Damage type flags.
- `RET`: `1` cancels durability deduction.

### `@Smelt` / `@ItemSmelt`
Fired when an item is being recycled/smelted back into raw ingots.
- `SRC`: Crafter character smelting the item.
- `RET`: `1` cancels smelting.

---

## 3. Interaction, Clicks & Tooltips

### `@Click` / `@ItemClick`
Fired on single-click to request the item's text label.
- `SRC`: Player clicking the item.

### `@AfterClick` / `@ItemAfterClick`
Fired immediately after the client text label packet is composed.

### `@DClick` / `@ItemDClick`
Fired when a player double-clicks the item.
- `SRC`: Player character double-clicking.
- `RET`: `1` cancels default engine action (e.g. stops container from opening, weapon from equipping); `0` proceeds.

### `@ClientTooltip` / `@ItemClientTooltip`
Fired when generating the extended AOS tooltip packet for the item.
- `SRC`: Player hovering cursor over item.
- **Source-X Invariant**: In Source-X, `ADDCLILOC` is called directly on the item (`ADDCLILOC 1060658, 25`).

### `@ClientTooltip_AfterDefault` / `@ItemClientTooltip_AfterDefault`
Fired after default engine properties (durability, weight, requirements) are added to tooltip.

### `@ContextMenuRequest` / `@ItemContextMenuRequest`
Fired when a player opens a context menu on an item.
- `SRC`: Player requesting menu.

### `@ContextMenuSelect` / `@ItemContextMenuSelect`
Fired when a context menu entry is chosen.
- `SRC`: Player character.
- `ARGN1`: Selected menu entry ID.

---

## 4. Equipment & Inventory

### `@ItemEquip` / `@Equip`
Fired when an item is equipped onto a character layer.
- `SRC`: Character equipping the item.
- `RET`: `1` prevents item from being equipped (bounces back to pack); `0` equips normally.

### `@ItemEquipTest` / `@EquipTest`
Fired before equipment requirements (STR/DEX/INT/Skill) are tested.
- `SRC`: Character equipping.
- `RET`: `1` denies equipping attempt.

### `@ItemUnEquip` / `@UnEquip`
Fired when an item is removed from an equipment slot.
- `SRC`: Character unequipping.
- `RET`: `1` prevents item from being unequipped.

### `@Pickup_Self` / `@ItemPickup_Self`
Fired on the item when lifted from ground or container onto mouse cursor.
- `SRC`: Character lifting item.
- `RET`: `1` prevents item from being lifted.

### `@Pickup_Ground` / `@ItemPickup_Ground`
Fired when lifting an item resting directly on the ground.
- `SRC`: Character lifting.

### `@Pickup_Pack` / `@ItemPickup_Pack`
Fired when lifting an item resting inside a backpack/container.
- `SRC`: Character lifting.

### `@Pickup_Stack` / `@ItemPickup_Stack`
Fired when picking up or splitting an item stack.
- `SRC`: Character lifting.
- `ARGN1`: Amount of items being lifted from the stack.

---

## 5. Drag & Drop

### `@DropOn_Item` / `@ItemDropOn_Item`
Fired when an item is dragged and dropped onto a container or another item.
- `SRC`: Character performing drop.
- `ARGO`: Target container receiving the drop.
- `RET`: `1` rejects drop and bounces item.

### `@DropOn_Char` / `@ItemDropOn_Char`
Fired when an item is dropped onto a character / NPC.
- `SRC`: Character dropping item.
- `ARGO`: Target character receiving item.
- `RET`: `1` rejects drop.

### `@DropOn_Self` / `@ItemDropOn_Self`
Fired on the container item itself when an object is placed inside it.
- `SRC`: Character dropping item.
- `ARGO`: Item being inserted into this container.
- `RET`: `1` rejects drop.

### `@DropOn_Ground` / `@ItemDropOn_Ground`
Fired when an item is placed onto terrain.
- `SRC`: Character dropping item.
- `ARGS`: Target coordinate point (`X,Y,Z,Map`).
- **Source-X Invariant**: Fires **BEFORE** new position `P` is set. Target coordinates are in `ARGS`.
- `RET`: `1` rejects drop; bounces back to pack.

### `@DropOn_Trade` / `@ItemDropOn_Trade`
Fired when an item is placed into an active secure trade window.
- `SRC`: Player trading.
- `ARGO`: Trade window container.

---

## 6. Targeting with Items (`TARGON_*`)

When an item requests a targeting cursor (via `TARGET`, `TARGETF`, or intrinsic item mechanics):

### `@TargOn_Char` / `@ItemTargOn_Char`
Fired when cursor targets a character.
- `SRC`: Player holding cursor.
- `ARGO`: Target character.
- `RET`: `1` cancels targeting action.

### `@TargOn_Item` / `@ItemTargOn_Item`
Fired when cursor targets an item.
- `SRC`: Player.
- `ARGO`: Target item.
- `RET`: `1` cancels action.

### `@TargOn_Ground` / `@ItemTargOn_Ground`
Fired when cursor targets a ground tile.
- `SRC`: Player.
- `ARGP`: Target coordinate location point (`X,Y,Z,Map`).
- `RET`: `1` cancels action.

### `@TargOn_Cancel` / `@ItemTargOn_Cancel`
Fired when player dismisses target cursor without selecting a target.
- `SRC`: Player.
