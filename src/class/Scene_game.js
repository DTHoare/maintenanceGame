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
