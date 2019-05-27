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
