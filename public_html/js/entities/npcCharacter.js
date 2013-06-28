game.npcCharacter = {
    /*George*/
    "George": game.npcEntity.extend({
        "init": function init(x, y, settings) {
            //this.value = 1000;
            settings.image = "george";
            settings.spritewidth = 29;
            settings.spriteheight = 34;
            this.parent(x, y, settings);
        },
        "onCollision": function(res, obj) {

            // res.y >0 means touched by something on the bottom
            // which mean at top position for this one
            if (this.alive && (res.y > 0)) {
                this.renderable.flicker(45);
            }
        },
    })
};