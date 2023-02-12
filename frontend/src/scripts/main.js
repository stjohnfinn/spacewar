const OPTIONS = {
    height: 540,
    width: 900,
    center: {
        x: 900 / 2,
        y: 540 / 2
    },
    bg: 5,
    frameRate: 24
}

class GraphicsObject {
    constructor(xPosition, yPosition, stroke = 255, fill = 255, maxVel = 0, maxAcc = 0) {
        this.position = {
            x: xPosition,
            y: yPosition
        }
        this.stroke = stroke
        this.fill = fill
        this.velocity = {
            x: 0,
            y: 0,
            max: maxVel
        }
        this.acceleration = {
            x: 0,
            y: 0,
            max: maxAcc
        }
    }

    display() {
        throw new Error("Draw method never implemented by calling object.")
    }
}

class Rocket extends GraphicsObject {
    constructor(xPosition, yPosition, stroke = 255, fill = 255) {
        super(xPosition, yPosition, stroke, fill)
        console.log("Initialized rocket!")
        console.log(xPosition, yPosition)
    }

    display() {
        fill(this.fill);
        stroke(this.stroke);
        beginShape();
        vertex(this.position.x + 5, this.position.y)
        vertex(this.position.x - 5, this.position.y - 3)
        vertex(this.position.x - 3, this.position.y)
        vertex(this.position.x - 5, this.position.y + 3)
        endShape(CLOSE);
    }

    applyVector() {
        
    }

    updateVelocity() {
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
    }

    updatePosition() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    update() {
        updateVelocity()
        updatePosition()
    }
}

let r;

function setup() {
    createCanvas(900, 540);
    r = new Rocket(OPTIONS.center.x, OPTIONS.center.y)
    frameRate(OPTIONS.frameRate)
}

function draw() {
    background(OPTIONS.bg);
    r.display()

    if (keyIsDown(UP_ARROW)) {
        r.position.y -= 1
    }
}