## Module Events
Code in event functions is executed everytime their associated condition is met.
```js
this.onEnable = function() {
    // Code in here will be executed directly after the module has been enabled by the user 
};

this.onDisable = function() {
    // Code in here will be executed directly after the module has been disabled by the user 
};

this.onUpdate = function() {
    // Code in here is being executed every tick (~20 times per seconds)
};

this.onMotion = function(event) {
    // Code in here is being executed everytime the player receives motion

    var eventState = event.getEventState();
    eventState.getStateName(); // PRE or POST 
};

this.onRender2D = function(event) {
    // Code in here will be executed when the client draws its 2D elements

    var partialTicks = event.getPartialTicks(); // Used to render FPS independent animations
};

this.onRender3D = function(event) {
    // Code in here will be executed when the client draws its 3D elements

    var partialTicks = event.getPartialTicks(); // Used to render FPS independent animations
};

this.onAttack = function(event) {
    // Code in here will be executed when an entity is being attacked

    var targetEntity = event.getTargetEntity();
};

this.onJump = function(event) {
    // Code in here will be executed when the player jumps
    
    event.cancelEvent() // Cancels the event
    event.isCancelled() // Whether the event has been cancelled

    var motion = event.getMotion();
    event.setMotion(0.42);
};

this.onPacket = function(event) {
    // Code in here will be executed when the client handles a packet

    event.cancelEvent() // Cancels the event
    event.isCancelled() // Whether the event has been cancelled

    var packet = event.getPacket();
};

this.onKey = function(event) {
    // Code in here will be executed when a key is pressed

    var pressedKey = event.getKey(); // ID of the pressed key (https://minecraft.gamepedia.com/Key_codes)
};

this.onMove = function(event) {
    // Code in here will be executed when the player moved

    var x = event.getX(); // Returns x-position of move
    var y = event.getY(); // Returns y-position of move
    var z = event.getZ(); // Returns z-position of move
    var isSafeWalk = event.isSafeWalk(); // Whether SafeWalk is enabled for this event

    event.setX(100); // Sets x-position of move to 100
    event.setY(100); // Sets y-position of move to 100
    event.setZ(100); // Sets z-position of move to 100
    event.setSafeWalk(true); // Prevents player from falling off the edge of blocks
};
```