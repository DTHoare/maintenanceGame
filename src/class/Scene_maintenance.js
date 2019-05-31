class Scene_maintenance extends Phaser.Scene {

  constructor ()
  {
    super('Maintenance');
  }

  preload () {

  }

  create () {
    this.gameScene = game.scene.getScene('Game');
    this.uiScene = game.scene.getScene('UI');

    var bg = this.add.rectangle(config.width /2, config.height*0.6,
       config.width*0.2, config.height*0.6, 0x111111);

    this.return = new Button(this, config.width /2, 260, 'Return', 'return');

    this.events.on('buttonPress', function (signal) {
      if(signal == 'return') {
        this.gameScene.scene.resume();
        this.gameScene.matter.world.resume();
        this.scene.remove("Maintenance")
      }
    },this);

    var hammer = new Hammer(this, 480, 460,
       {period:1000,
        width:300,
        green:100});

    this.events.on('incrementScore', function() {
      this.uiScene.updateMaintence(15);
    }, this)
  }


}
