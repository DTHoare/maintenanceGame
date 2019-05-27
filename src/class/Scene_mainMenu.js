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
