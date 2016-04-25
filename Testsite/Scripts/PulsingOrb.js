(function () {
    var PulsingOrb = function (color, size) {
        this.initialize(color, size);
    }

    var p = PulsingOrb.prototype = new createjs.Shape();
    p.count = 0;
    p.speed = 0;
    p.size = 0;

    p.Shape_initialize = p.initialize;

    p.initialize = function (color, size) {
        this.Shape_initialize();
        size = size != undefined ? size : 20;
        color = color != undefined ? color : '#F00';
        this.size = size;
        this.alpha = 1;
        this.graphics.beginFill(color).drawCircle(0, 0, size);
        this.on('click', this.pulse);
    };

    p.pulse = function () {
        this.alpha = Math.cos((this.count++) * 0.1) * 0.4 + 0.6;
    };
    window.PulsingOrb = PulsingOrb;
})();