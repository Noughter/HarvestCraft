/*
 * HarvestCraft, a sanboc farming RPG
 * Copyright (C) 2013  Marvin Ponten
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


/* Game namespace */
var game = {
    // Whether a dialog box is waiting for input.
    "modal" : false,
    // `true` when an object's y-coordinate changes to put it at the proper Z-order.
    "wantsResort" : false,            
            
    // Run on page load.
    "onload": function() {        
        // Initialize the video.
        if (!me.video.init("screen", c.WIDTH, c.HEIGHT)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(debugPanel, "debug");
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
        // Load the resources.
        this.loadResources();      

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);        
    },
            
    "loadResources" : function loadResources() {
        // Set all resources to be loaded.
        var resources = [];

        // Graphics.
        this.resources["img"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "image",
                "src"   : "data/img/" + value + ".png"
            })           
        });

        // Maps.
        this.resources["map"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "tmx",
                "src"   : "data/map/" + value + ".tmx"
            })
        });
        
        /* Atlases.
        this.resources["tex"].forEach(function forEach(value) {
            resources.push({
                "name"  : value,
                "type"  : "png",
                "src"   : "data/img/" + value + ".json"
            })
        });
        */
       
        // Sound effects.
        this.resources["sfx"].forEach(function forEach(value) {
            resources.push({
                "name"      : value,
                "type"      : "audio",
                "src"       : "data/sfx/",
                "channel"   : 1
            })
        });

        // Music.
        this.resources["bgm"].forEach(function forEach(value) {
            resources.push({
                "name"      : value,
                "type"      : "audio",
                "src"       : "data/bgm/",
                "channel"   : 2
            })
        });

        // Load the resources.
        me.loader.preload(resources);
    },
            
            
    // Run on game resources loaded.
    "loaded": function() {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", game.playerEntity);
        me.entityPool.add("George", game.npcCharacter.George);
        me.entityPool.add("applePlant", game.plants.applePlant);
        
       //var george = me.entityPool.newInstanceOf("George", 20, 30, 2, 3, 4);
       //me.game.add(george, this.z);     
            
        
        // Load texture.
        //game.texture = new me.TextureAtlas(
        //    me.loader.getJSON("texture"),
        //    me.loader.getImage("texture")
        //);
        
        

// add a default HUD to the game mngr (with no background)
me.game.addHUD(0,0,480,100);
// add the "score" HUD item
me.game.HUD.addItem("hud", new HUDObject(470,10));

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.SPACE, "action");

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
