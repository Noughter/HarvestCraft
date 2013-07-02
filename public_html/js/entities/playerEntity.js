/*------------------- 
 a player entity
 -------------------------------- */
game.playerEntity = me.ObjectEntity.extend({
    /* -----
     
     constructor
     
     ------ */
    "init": function(x, y, settings) {
        settings.image = "mainPlayer";  //vor Constructorcall
        settings.spritewidth = 64;
        settings.spriteheight = 64;
        // call the constructor
        this.parent(x, y, settings);

        // adjust the bounding box
        this.updateColRect(16, 32, 10, 48);

        // Physics
        this.setVelocity(3.0, 3.0);
        this.setMaxVelocity(5, 10);
        //set gravity of player = 0
        this.gravity = 0;
        //Friction
        this.setFriction(0.25, 0);

        //AnimationSpeed
        this.animationspeed = me.sys.fps / 20;

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // set animations
        //this.direction = 'right';
        this.renderable.addAnimation("up", [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.renderable.addAnimation("left", [9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this.renderable.addAnimation("down", [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.renderable.addAnimation("right", [27, 28, 29, 30, 31, 32, 33, 34, 35]);
        
        // Variablen
        this.actionPressed = false;
        this.inventar1Choosen = true;
        this.inventar2Choosen = false;
        this.inventar3Choosen = false;
        this.health = 100;
        this.score = 0;

    },
    /* -----
     
     update the player pos
     
     ------ */
    "update": function() {
        this.checkInput();
        // check & update player movement
        this.updateMovement();
        this.checkCollision();
        
        //HUD
        me.game.HUD.setItemValue("health", this.health);        
        me.game.HUD.setItemValue("score", this.score);
        
        /*if(this.inventar1Choosen){
            me.game.HUD.addItem("inventar1Choosen", new Inventar1Choosen());
            if(this.actionPressed){
                console.warn("will jetzt pflanzen");
            }
        } else { console.warn("Bed1");
            me.game.HUD.removeItem("inventar1Choosen")};    
        
        if(this.inventar2Choosen){
            me.game.HUD.addItem("inventar2Choosen", new Inventar2Choosen());
            me.game.HUD.removeItem("inventar1Choosen")
        } else { console.warn("Bed2");
            me.game.HUD.removeItem("inventar2Choosen")};
        
/*  
        // check for collision
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type == me.game.ENEMY_OBJECT) {
                // check if we jumped on it
                if ((res.y > 0) && !this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    // play some audio
                    me.audio.play("stomp");

                } else {
                    // let's flicker in case we touched an enemy
                    this.renderable.flicker(45);
                }
            } // other Collisions
            else {
                console.warn("Missing interaction for " + this.name + " from ");
            }
        }
*/
        // update animation if necessary
        if (this.vel.x > 0) {
            // update object animation
            this.parent();
            this.renderable.setCurrentAnimation("right");
            return true;
        } else if (this.vel.x < 0) {
            this.renderable.setCurrentAnimation("left");
            return true;
        } else if (this.vel.y > 0) {
            this.renderable.setCurrentAnimation("down");
            return true;
        } else if (this.vel.y < 0) {
            this.renderable.setCurrentAnimation("up");
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    },
    "checkInput": function checkInput() {

    //Bewegung
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
            //this.flipX(true);
            this.parent();
            this.renderable.setCurrentAnimation("left");
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
            //this.setVelocity(1, 0);
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            //this.flipX(false);
            this.parent();
            this.renderable.setCurrentAnimation("right");
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            //this.parent();     
            //this.renderable.offset.set();
            this.parent();
            this.renderable.setCurrentAnimation("up");
            //this.flipY(false);
            // update the entity velocity
            this.vel.y = -this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            //this.flipY(false);
            this.parent();
            this.renderable.setCurrentAnimation("down");
            // update the entity velocity
            this.vel.y = this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
            this.actionPressed = false;
        }
        
        //weitere Eingaben
        if (me.input.isKeyPressed('action')) {
            this.actionPressed = true;
        } else if (me.input.isKeyPressed('1')) {
            this.inventar1Choosen = true;
            this.inventar2Choosen = false;
            this.inventar3Choosen = false;
            //me.game.HUD.removeItem("inventar2Choosen");
            //me.game.HUD.addItem("inventar1Choosen", new Inventar1Choosen());
        } else if (me.input.isKeyPressed('2')) {
            this.inventar1Choosen = false;
            this.inventar2Choosen = true;
            this.inventar3Choosen = false;
            //me.game.HUD.removeItem("inventar1Choosen");
            //me.game.HUD.addItem("inventar2Choosen", new Inventar2Choosen());
        } else if (me.input.isKeyPressed('3')) {
            me.game.HUD.setItemValue("inventar1Choosen");
            
        }



    },
    "checkCollision": function checkCollision() {
        // check for collision
        var res = me.game.collide(this);

        if (res) {
            // if we collide with an enemy
            if (res.obj.type === me.game.ENEMY_OBJECT) {
                // check if we jumped on it
                if ((res.y > 0) && !this.jumping) {
                    // bounce (force jump)
                    this.falling = false;
                    this.vel.y = -this.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.jumping = true;
                    // play some audio
                    me.audio.play("stomp");

                } else {
                    // let's flicker in case we touched an enemy
                    this.renderable.flicker(45);
                }
            } // Collision with George 
            else if(res.obj instanceof game.npcCharacter.George === true && this.actionPressed === true) {
                console.warn("Hi I'm George How are you?");
            }
        }
    }

});