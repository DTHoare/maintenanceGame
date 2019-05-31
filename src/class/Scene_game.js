class Scene_game extends Phaser.Scene {

  constructor ()
  {
    super('Game');
  }

  preload () {
    game.scene.add('UI', Scene_UI, true);
    game.scene.start('UI');
  }

  create () {
    var button_maintain = new Button(this, 580, 180, 'Maintain', 'maintain');

    var metronome = new Windows(this, 480, 360,
       {period:2000,
        width:200,
        green:100});

    var metronome = new Windows(this, 480, 460,
       {period:1500,
        width:400,
        green:100});

    this.events.on('buttonPress', function (signal) {
      if(signal == 'maintain') {
        game.scene.add('MaintenanceScene', Scene_maintenance, true);
        game.scene.start('MaintenanceScene');
        this.scene.pause();
        this.matter.world.pause();
      }
    },this);


  }


}
