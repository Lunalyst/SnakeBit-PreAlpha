const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { 
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });      
    }

    create() {
        var print0 = this.add.text(0, 0, '');
        this.rexUI.add.slider({
            x: 200,
            y: 200,
            width: 200,
            height: 20,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                print0.text = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        }).layout();


        var print1 = this.add.text(400, 0, '');
        this.rexUI.add.slider({
            x: 550,
            y: 300,
            width: 20,
            height: 200,
            orientation: 'y',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),

            input: 'click', // 'drag'|'click'
            valuechangeCallback: function (value) {
                print1.text = value;
            },

        })
            .layout();

        var print2 = this.add.text(600, 0, '');
        this.rexUI.add.slider({
            x: 650,
            y: 300,
            width: 20,
            height: 200,
            orientation: 'y',
            reverseAxis: true,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),

            input: 'click', // 'drag'|'click'
            valuechangeCallback: function (value) {
                print2.text = value;
            },

        })
            .layout();


        var print3 = this.add.text(0, 400, '');
        this.rexUI.add.slider({
            x: 200,
            y: 500,
            width: 300,
            height: 30,
            orientation: 'x',

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),

            input: 'click', // 'drag'|'click'
            easeValue: { duration: 250 },

            valuechangeCallback: function (value) {
                print3.text = value;
            },

        })
            .layout();
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);