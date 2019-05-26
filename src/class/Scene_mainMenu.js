class Scene_menu extends Phaser.Scene {

  constructor ()
  {
    super('MainMenu');
  }

  create() {
    this.add.text(480, 360, 'Nobody Likes Maintenance', {fontSize: '32px'});
  }

}
