(function () {
    window.game = window.game || {};
    var GameStates = {
        MAIN_MENU: 0,
        RUN_SCENE: 1,
        GAME: 10,
        GAME_OVER:20
    };

    var GameStateEvents = {
        MAIN_MENU: 'main_menu_event',
        GAME_OVER: 'game_over_event',
        GAME: 'game_event'
    };

    window.game.GameStates = GameStates;
    window.game.GameStatesEvents = GameStateEvents;

})();