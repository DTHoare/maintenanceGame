class Button {

  constructor(scene, x, y, text, signal) {

    this.text = scene.add.text(x, y, text)
    this.text.setInteractive();

    scene.input.on('gameobjectover', function (pointer, text)
    {
        text.setStyle({fill: '#8888ff'})
    }, scene);

    scene.input.on('gameobjectout', function (pointer, text)
    {
        text.setColor('#fff')
    }, scene);

    scene.input.on('gameobjectup', function (pointer)
    {
        scene.events.emit('buttonPress', signal);
    }, scene);

  }
}

class Metronome {

  constructor(scene, x, y, params) {
    this.scene = scene
    this.x = x
    this.y = y
    this.params = params


    this.bg = scene.add.rectangle(x, y, this.params.width, 30, 0x999999);
    this.goodZone = scene.add.rectangle(x, y, this.params.green, 30, 0x99FF99);
    this.ticker = scene.add.rectangle(x, y, 5, 55, 0xFFFFFF);

    this.scene.events.on("preupdate", this.update, this);

    this.scene.input.on("pointerdown", function() {
      if (this.isGood()) {
        scene.events.emit('incrementScore');
      }
    },this);
  }

  update() {
    this.ticker.setPosition(this.x + this.params.width/2 * Math.sin (this.scene.time.now * 2. * Math.PI / this.params.period), this.y);
  }

  isGood() {
    if( Math.abs(this.x - this.ticker.x) <= (this.params.green/2)) {
      console.log("good")
      return true;
    } else {
      console.log("bad")
      return false;
    }
  }
}

class Hammer {

  constructor(scene, x, y, params) {
    this.scene = scene
    this.x = x
    this.y = y
    this.params = params

    this.bg = scene.add.rectangle(x, y, 30, this.params.width, 0x666666);
    this.goodZone = scene.add.rectangle(x, y + this.params.width/2 - this.params.green/2, 30, this.params.green, 0x66DD66);
    this.ticker = scene.add.rectangle(x, y, 55, 5, 0xFFFFFF);

    this.scene.events.on("preupdate", this.update, this);

    this.scene.input.on("pointerdown", function() {
      if (this.isGood()) {
        scene.events.emit('incrementScore');
      }
    },this);
  }

  update() {
    var delta = - this.params.width * 0.18 + (this.params.width*1.4)/2 * Math.sin (this.scene.time.now * 2. * Math.PI / this.params.period)
    delta = Math.min(delta, this.params.width/2);
    delta = Math.max(delta, -this.params.width/2);
    this.ticker.setPosition(this.x, this.y + delta);
  }

  isGood() {
    if( Math.abs((this.y + this.params.width/2) - this.ticker.y) <= (this.params.green)) {
      console.log("good")
      return true;
    } else {
      console.log("bad")
      return false;
    }
  }
}

class Windows {

  constructor(scene, x, y, params) {
    this.scene = scene
    this.x = x
    this.y = y
    this.params = params

    this.currentState = 0;

    this.bg = scene.add.rectangle(x, y, this.params.width, 30, 0x666666);
    this.goodZone = scene.add.rectangle(x, y, this.params.green, 30, 0x66DD66);
    this.goodZone.x = this.x + this.generateGreenPosition();
    this.ticker = scene.add.rectangle(x, y, 5, 55, 0xFFFFFF);
    this.ticker.depth = 15;

    this.scene.events.on("preupdate", this.update, this);

    this.scene.input.on("pointerdown", function() {
      if (this.isGood()) {
        scene.events.emit('incrementScore');
        this.currentState++;
        this.goodZone.width = this.params.green*(0.8**this.currentState);
        this.goodZone.setX(this.x + this.generateGreenPosition());
      } else {
        this.currentState = Math.max(0, this.currentState-1);
        this.goodZone.width = this.params.green*(0.8**this.currentState);
        this.goodZone.setX(this.x + this.generateGreenPosition());
      }
      //need to destroy and recreate or the rectangle does not display correctly...
      var x_ = this.goodZone.x
      var width_ = this.goodZone.width
      this.goodZone.destroy();
      this.goodZone = scene.add.rectangle(x_, this.y, width_, 30, 0x66DD66);
      this.goodZone.depth=10;
    }, this);

  }

  generateGreenPosition() {
    var green = this.goodZone.width;
    return green/2-this.params.width/2 + (this.params.width - green)*Math.random();
  }

  isGood() {
    if( Math.abs(this.ticker.x-this.goodZone.x) <= (this.ticker.width+this.goodZone.width/2) ){
      console.log("good")
      return true;
    } else {
      console.log("bad")
      return false;
    }
  }

  update() {
    var t = this.scene.time.now % this.params.period
    var delta
    if (t < (this.params.period/2)) {
      delta = t * this.params.width / (this.params.period/2)
    } else {
      delta = this.params.width - ( (t-this.params.period/2) * this.params.width / (this.params.period/2))
    }
    this.ticker.setPosition(this.x-this.params.width/2 + delta, this.y);
  }

}

class Scene_game extends Phaser.Scene {

  constructor ()
  {
    super('Game');
  }

  preload () {

  }

  create () {
    this.add.text(80, 100, 'DEMO GAME', {fontSize: '24px'});
    var score = 0
    var scoreText = this.add.text(580, 100, 'Score: '+score, {fontSize: '24px'});

    var metronome = new Windows(this, 480, 360,
       {period:2000,
        width:200,
        green:100});

    this.events.on('incrementScore', function () {
      score ++;
      scoreText.text = 'Score: '+score;
    },this);
  }



}

class Scene_loading extends Phaser.Scene {

  constructor ()
  {
    super('Loading');
  }

  preload () {
    this.add.text(300,300, 'Loading...');
  }

  create () {
    game.scene.add('MainMenu', new Scene_menu(), true)
    this.scene.remove('Loading')
  }

}

class Scene_menu extends Phaser.Scene {

  constructor ()
  {
    super('MainMenu');
  }

  create() {
    this.add.text(480, 360, 'Nobody Likes Maintenance', {fontSize: '32px'});

    var button_start = new Button(this, 610, 460, 'Start', 'start');

    this.events.on('buttonPress', function (text) {
          console.log(text);

          game.scene.add('Game', new Scene_game(), true)
          this.scene.stop('MainMenu')
      }, this);
  }

}


var config = {
   type: Phaser.AUTO,
   width: 960,
   height: 720,
   pixelArt: true,
   physics: {
      default: 'matter',
      matter: {
          gravity: {
              x: 0,
              y: 2
          },
          debug : true
      }
   },
   plugins: {
      scene: [{
          plugin: PhaserMatterCollisionPlugin, // The plugin class
          key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
          mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
        }]
    },
   scene: []//[ Scene_game, Scene_UI],

};

var game = new Phaser.Game(config);

game.scene.add('Loading', new Scene_loading(), true)
