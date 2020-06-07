/*
    Registers a new creative inventory tab. Can be accessed by opening the inventory in creative mode
    and switching the secondary inventory by pressing one of the arrows above the inventory.
*/
script.registerTab({
    name: "ExampleTab", // Name of the tab shown in the inventory.
    icon: "apple",  // Icon of the tab shown in the inventory. Has to be the untranslated name of any item.
    items: [ // Array containing all items which should be added to the inventory.
        Item.create("dirt"), // Creates an item. Custom NBT data can also be passed to this function.
        Item.create("skull 1 3 {display:{Name:\"Chimney\"},SkullOwner:{Id:\"2a0069a3-30a6-4aa6-b0ae-d31f1bd777f3\",Properties:{textures:[{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvZjk5NTljYjk5YzY5ZjA3MzE2YWUxNGY4OWVlMjU0YTAwMzRkOTFkMThiMTZmMGM5NDBiOTNjZDUzMjUzNjQ1MSJ9fX0=\"}]}}}")
    ]
});