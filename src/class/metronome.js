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
