const script = registerScript({
  name: "AutoJump",
  version: "1.0.0",
  authors: ["lagoon"]
});

script.registerModule({
  name: "AutoJump",
  category: "Movement", // Movement, Combat, Render, ...
  description: "Jumps automatically for you."
}, (mod) => { 
  mod.on("disable", () => {
    mc.options.jumpKey.setPressed(false);
  });
  mod.on("playerTick", () => {
    mc.options.jumpKey.setPressed(true);
  });
});
