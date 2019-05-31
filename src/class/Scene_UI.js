class Scene_UI extends Phaser.Scene {

  constructor ()
  {
    super('UI');
  }

  preload () {

  }

  create () {
    this.gameScene = game.scene.getScene('Game');

    this.add.text(80, 100, 'DEMO GAME', {fontSize: '24px'});
    this.score = 0
    this.scoreText = this.add.text(580, 100, 'Score: '+this.score, {fontSize: '24px'});

    this.maintenance = 100
    this.maintenanceText = this.add.text(580, 130, 'Maintenance: '+this.maintenance+'%', {fontSize: '24px'});

    this.gameScene.events.on('incrementScore', function (level) {
      this.score += level **2;
      this.scoreText.text = 'Score: '+this.score;
      this.updateMaintence(Math.random() * -10.);
    },this);
  }

  updateMaintence(val) {
    this.maintenance += val
    this.maintenance = Phaser.Math.Clamp(this.maintenance,0,100);
    this.maintenanceText.text = 'Maintenance: '+Number(this.maintenance.toPrecision(2))+'%';
    this.gameScene.events.emit('maintain', this.maintenance);
  }

}
