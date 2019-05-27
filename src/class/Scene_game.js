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

    var metronome = new Hammer(this, 480, 360,
       {period:1000,
        width:200,
        green:15});

    this.events.on('incrementScore', function () {
      score ++;
      scoreText.text = 'Score: '+score;
    },this);
  }



}
