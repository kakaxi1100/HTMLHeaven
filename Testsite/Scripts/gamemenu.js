(function () {
    window.game = window.game || {};

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();
    var _super = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        _super.call(p);
        this.addBG();
        this.addTitle();
        this.addOrbs();
        this.addButton();
    };

    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('0').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    };

    p.addTitle = function () {
        this.titleTxt = new createjs.Text('Welcome to the game !', "40px Arial", "#FFF");
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    };

    p.addOrbs = function () {
        var i, orb;
        var orbContainer = new createjs.Container();
        var num = 5;
        var size = 20;
        var padding = 10;
        var pos = 300;
        for (var i = 0; i < num; i++) {
            orb = new PulsingOrb('#FFF', size);
            orb.x = i * ((size * 2) + padding);
            orbContainer.addChild(orb);
        }
        orbContainer.x = orbContainer.y = Position;
        this.addChild(orb);
    };

    p.addButton = function () {
        var btn, event;
        btn = new createjs.Shape();
        btn.graphics.beginFill('#00FF00').drawRect(0, 0, 100, 20);
        btn.x = canvas.width / 2;
        btn.y = 400;
        this.addChild(btn);
        btn.on('click', this.playGame, this);
    };

    p.playGame = function (e) {
        this.dipatchEvent(game.GameStateEvents.Game);
    };

    p.run = function () {
        this.titleTxt.alpha = Math.cos((this.count++) * 0.1) * 0.4 + 0.6;
    };

    window.game.GameMenu = GameMenu;
})();