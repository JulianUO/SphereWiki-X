# Character Equipment Layers Reference

> Defines equipment slots, container layers, spell memory layers, and status flags on characters. Defined in `sphere_defs.scp`.

---

```scp
[DEFNAME layers]
// Paperdoll Visible Equipment
layer_hand1                 1   // One-handed weapon / primary hand.
layer_hand2                 2   // Shield / two-handed weapon / off-hand.
layer_shoes                 3   // Footwear.
layer_pants                 4   // Pants / bone leggings.
layer_shirt                 5   // Inner shirt.
layer_helm                  6   // Headgear / helmet.
layer_gloves                7   // Hand armor / gloves.
layer_ring                  8   // Ring.
layer_talisman              9   // Talisman slot.
layer_collar                10  // Gorget / necklace.
layer_hair                  11  // Hair style.
layer_half_apron            12  // Waist half-apron / belt.
layer_chest                 13  // Chest armor.
layer_wrist                 14  // Bracelet.
layer_face                  15  // Mask / face feature.
layer_beard                 16  // Facial hair.
layer_tunic                 17  // Full apron / jester suit.
layer_ears                  18  // Earrings.
layer_arms                  19  // Arm armor / sleeves.
layer_cape                  20  // Cloak / cape.
layer_pack                  21  // Main backpack container.
layer_robe                  22  // Outer robe.
layer_skirt                 23  // Skirt / kilt.
layer_legs                  24  // Leg armor.

// Virtual & Server-Only Layers
layer_horse                 25  // Mount memory object.
layer_vendor_stock          26  // NPC vendor restocking inventory.
layer_vendor_extra          27  // NPC vendor bought-from-players inventory.
layer_vendor_buys           28  // NPC vendor buy list definitions.
layer_bankbox               29  // Bank box storage container.
layer_special               30  // Character memory items (CItemMemory).
layer_dragging              31  // Item currently lifted on mouse cursor.

// Active Continuous Spell Layers
layer_spell_stats           32  // Stat buff/debuff effects (Bless, Curse, Weaken).
layer_spell_reactive        33  // Reactive Armor.
layer_spell_night_sight     34  // Night Sight.
layer_spell_protection      35  // Protection.
layer_spell_incognito       36  // Incognito.
layer_spell_magic_reflect   37  // Magic Reflection.
layer_spell_paralyze        38  // Paralyze / Stone.
layer_spell_invis           39  // Invisibility.
layer_spell_polymorph       40  // Polymorph form.
layer_spell_summon          41  // Summon timer memory.

// Status Flags
layer_flag_poison           42  // Active poison damage loop.
layer_flag_criminal         43  // Criminal / Murderer timer decay.
layer_flag_potion           44  // Potion effect timer.
layer_flag_spiritspeak      45  // Spirit Speak active channel.
layer_flag_bandage          53  // Active bandage healing timer.
```
