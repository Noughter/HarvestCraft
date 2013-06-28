game.npcEntity = me.ObjectEntity.extend({
    "init": function init(x, y, settings) {
        settings.image = "george";  //vor Constructorcall
        settings.spritewidth = 32;
        settings.spriteheight = 32;
        // call the constructor
        this.parent(x, y, settings);

        // adjust the bounding box
        //this.updateColRect(8, 48, -1, 0);

        // Physics
        this.setVelocity(3.0, 3.0);
        this.setMaxVelocity(5, 10);
        //set gravity of player = 0
        this.gravity = 0;
        //Friction
        this.setFriction(0.25, 0);
        //Collidable
        this.collidable = true;        
        


        //AnimationSpeed
        this.animationspeed = me.sys.fps / 20;

        // set animations
        //this.renderable.addAnimation("up", [2,6,10,14]);
        //this.renderable.addAnimation("left", [1,5,9,13]);
        //this.renderable.addAnimation("down", [0,4,8,12]);
        //this.renderable.addAnimation("right", [3,7,11,15]);
    },
    "onCollision": function(res, obj) {

        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.renderable.flicker(45);
        }
    },
            
    "interact": function interact(actor) {
        console.warn("Missing interaction for " + this.name + " from " + actor.name);
    },
});