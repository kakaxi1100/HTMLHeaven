(function () {
    window.game = window.game || {};

    function GameOver() {
        this.initialize();
    };

    var p = GameOver.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addMessage();
        //this.addButton();
        this.on('click', clickHd);
    };

    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#09E').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    };

    p.addMessage = function () {
        this.titleTxt = new createjs.Text("YOU WIN!", '40px Arial', '#FFF');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
    };

    p.clickHd = function () {
        this.dispatchEvent(game.GameStateEvents.GAME);
    };

    window.game.GameOver = GameOver;

})();