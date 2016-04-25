(function () {
    window.game = window.game || {};

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;

    p.msgTxt = null;
    p.orbContainer = null;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addMessage();
        this.createOrbContainer();
        this.crateOrbs();
    };

    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#92CBD6').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    };

    p.addMessage = function () {
        this.msgTxt = new createjs.Text("", "24px Arial", "#FFF");
        this.addChild(msgTxt);
    };

    p.createOrbContainer = function () {
        this.orbContainer = new createjs.Container();
        this.addChild(this.orbContainer);
    };

    p.crateOrbs = function () {
        var i, orb, color;
        var orbs = this.orbContainer;
        var num = 12;
        var size = 25;
        for (var i = 0; i < num; i++) {
            color = '#' + Math.floor(Math.random() * 16777215).toString(16);
            orb = new PulsingOrb(color, size);
            orb.speed = Math.random() * 4;
            orb.size = size;
            orb.x = size;
            orb.y = size + (i * size * 2);
            orb.on('click', this.onOrbClick, this);
            orbs.addChild(orb);
        }
    };

    p.onOrbClick = function () {
        this.orbContainer.removeChild(e.target);
    };

    p.update = function () {
        var i, orb, nextX;
        var len = this.orbContainer.getNumChildren();
        for (var i = 0; i < len; i++) {
            orb = this.orbContainer.getChildAt(i);
            nextX = orb.x + orb.spped;
            if (nextX + orb.size > canvas.width) {
                nextX = canvas.width - orb.size;
                orb.speed *= -1;
            }else if(nextX - orb.size < 0){
                nextX = orb.size;
                orb.speed *= -1;
            }
            orb.nextX = nextX;
        }
    };

    p.render = function () {
        var i, orb;
        var len = this.orbContainer.getNumChildren();
        for (var i = 0; i < len; i++) {
            orb = this.orbContainer.getChildAt(i);
            orb.x = orb.nextX;
        }
        this.msgTxt.text = "LEFT : " + this.orbContainer.getNumChildren();
    };

    p.checkGame = function () {
        if (!this.orbContainer.getNumChildren()) {
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
    };

    p.run = function (tickEvent) {
        this.update();
        this.render();
        this.checkGame();
    };

    window.game.Game = Game;
})();