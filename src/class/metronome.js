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

class Windows {

  constructor(scene, x, y, params) {
    this.scene = scene
    this.x = x
    this.y = y
    this.params = params
    this.maintain = 100;

    this.currentState = 0;

    this.hitBox = this.bg = scene.add.rectangle(x, y, this.params.width, 55);
    this.hitBox.setInteractive();

    this.bg = scene.add.rectangle(x, y, this.params.width, 30, 0x666666);
    this.goodZone = scene.add.rectangle(x, y, this.params.green, 30, 0x66DD66);
    this.goodZone.x = this.x + this.generateGreenPosition();
    this.ticker = scene.add.rectangle(x, y, 5, 55, 0xFFFFFF);
    this.ticker.depth = 15;

    this.scene.events.on("preupdate", this.update, this);

    this.hitBox.on("pointerdown", function() {
      console.log("click")
      if (this.isGood()) {
        this.scene.events.emit('incrementScore', this.currentState);
        this.currentState++;
        this.goodZone.width = this.params.green*(0.8**this.currentState);
        this.goodZone.setX(this.x + this.generateGreenPosition());
      } else {
        this.currentState = Math.max(0, this.currentState-1);
        this.goodZone.width = this.params.green*(0.8**this.currentState);
        if (this.goodZone.x < (this.x - this.params.width/2 + this.goodZone.width /2)) {
          this.goodZone.setX(this.x - this.params.width/2 + this.goodZone.width /2);
        } else if(this.goodZone.x > (this.x + this.params.width/2 - this.goodZone.width /2)) {
          this.goodZone.setX(this.x + this.params.width/2 - this.goodZone.width /2)
        }
      }
      //need to destroy and recreate or the rectangle does not display correctly...
      var x_ = this.goodZone.x
      var width_ = this.goodZone.width
      this.goodZone.destroy();
      this.goodZone = scene.add.rectangle(x_, this.y, width_, 30, 0x66DD66);
      this.goodZone.depth=10;
      this.goodZone.alpha = this.maintenanceToAlpha(this.maintain)
    }, this);

    this.scene.events.on('maintain', function(maintain) {
      this.maintain = maintain
      var val = this.maintenanceToAlpha(maintain)
      this.hitBox.alpha = val
      this.bg.alpha = val
      this.goodZone.alpha = val
      this.ticker.alpha = val
    }, this)

  }

  generateGreenPosition() {
    var green = this.goodZone.width;
    return green/2-this.params.width/2 + (this.params.width - green)*Math.random();
  }

  isGood() {
    if( Math.abs(this.ticker.x-this.goodZone.x) <= (this.ticker.width+this.goodZone.width/2) ){
      console.log("good")
      return true;
    } else {
      console.log("bad")
      return false;
    }
  }

  update() {
    var t = this.scene.time.now % this.params.period
    var delta
    if (t < (this.params.period/2)) {
      delta = t * this.params.width / (this.params.period/2)
    } else {
      delta = this.params.width - ( (t-this.params.period/2) * this.params.width / (this.params.period/2))
    }
    this.ticker.setPosition(this.x-this.params.width/2 + delta, this.y);
  }

  maintenanceToAlpha(val) {
    return (val/100)**2.2
  }

}
