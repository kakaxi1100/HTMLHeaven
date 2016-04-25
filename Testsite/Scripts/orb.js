(function () {

    window.game = window.game || {};
    function Orb() {
        this.initiallize();
    };

    var p = Orb.prototype;
    p.initiallize = function () {
        canvas = document.getElementById('canvas');
        stage = new createjs.Stage(canvas);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('click', this.onTick, this);
        this.changeState(game.GameState.MAIN_MENU);
    };

    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameState.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case game.GameState.GAME:
                this.currentGameStateFunction = this.gameStateGame;
                break;
            case game.GameState.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameState.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
                break;
        }
    }

    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    };

    p.gameStateMainMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvent.GAME, this.onStateEvent, this, false, { state: game.GameStates.GAME });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    };

    p.gameStateGame = function () {
        var scene = new game.Game();
        scene.on(game.GameStateEvent.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        stage.addChild(scene);
        stage.removeChild(this.currentScene);
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    };

    p.gameStateGameOver = function () {
       
    };

    p.gameStateRunScene = function () {

    }

    window.game.Orb = Orb;
})();