class Button {

  constructor(scene, x, y, text, signal) {

    this.text = scene.add.text(x, y, text)
    this.text.setInteractive();

    this.text.on('pointerover', function (pointer, text)
    {
        this.text.setStyle({fill: '#8888ff'})
    }, this);

    this.text.on('pointerout', function (pointer, text)
    {
        this.text.setColor('#fff')
    }, this);

    this.text.on('pointerup', function (pointer)
    {
        scene.events.emit('buttonPress', signal);
    }, scene);

  }
}
