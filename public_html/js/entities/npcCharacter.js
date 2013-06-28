game.npcCharacter = {
    /*George*/
    "George" : game.npcEntity.extend({
        "init" : function init(x,y,settings){
            //this.value = 1000;
            settings.image = "george";
            settings.spritewidth = 32;
            settings.spriteheight = 32;
            this.parent(x, y, settings);
        },
    })
};