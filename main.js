var GAME_START = false;
var GAME_OVER = false;

const offset = 275;
const width = 1080;
const height = 1775;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'canvas');
game.transparent = true;

var gameState = {};
gameState.load = function () {
};
gameState.main = function () {
};

gameState.load.prototype = {
    preload: function () {
        game.load.image('background', 'img/road.png');
        game.load.image('car', 'img/car.png');
    },

    create: function () {
        game.state.start('main');
    }
};

gameState.main.prototype = {
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setShowAll();
        window.addEventListener('resize', function () {
            game.scale.refresh();
        });
        game.scale.refresh();

        this.background = game.add.sprite(0, 0, 'background');
        this.background.width = game.width;
        this.background.height = game.height;

        this.car = game.add.sprite(offset, 1400, 'car');
        this.car.width = 200;
        this.car.height = 200;
        this.carPosition = 'left';

        game.input.onDown.add(this.listener, this);
    },

    update: function () {

        if (!GAME_OVER) {
            if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT))
                this.listener('left');
            else if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT))
                this.listener('right');
        }
    },

    listener: function (action) {

        if (!GAME_START)
            GAME_START = true;

        var isClick = action instanceof Phaser.Pointer;

        if (action == 'left' || (isClick && game.input.activePointer.x <= game.width / 2)) {
            this.car.x = offset;
            this.carPosition = 'left';
        } else {
            this.car.x = game.width - offset - Math.abs(this.car.width);
            this.carPosition = 'right';
        }

    }

};

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');