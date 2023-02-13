const OPTIONS = {
    height: 540,
    width: 900,
    center: {
        x: 900 / 2,
        y: 540 / 2
    },
    bg: 5,
    frameRate: 30,
    stroke: 255,
    fill: 255
}

class GraphicsObject {
    constructor(xPosition, yPosition) {
        this.stroke = OPTIONS.stroke
        this.fill = OPTIONS.fill

        this.pos = createVector(xPosition, yPosition)
        this.vel = createVector()
        this.acc = createVector()
    }

    display() {
        throw new Error("Draw method never implemented by calling object.")
    }

    applyForce(force) {
        this.acc.add(force)
    }

    update() {
        this.vel.add(this.acc)
        this.vel.limit(4)

        this.pos.add(this.vel)

        if (this.pos.x > OPTIONS.width) {
            this.pos.x = 0
        } else if (this.pos.x < 0) {
            this.pos.x = OPTIONS.width
        } if (this.pos.y > OPTIONS.height) {
            this.pos.y = 0
        } else if (this.pos.y < 0) {
            this.pos.y = OPTIONS.height
        }

        this.acc.mult(0)
    }
}

class Rocket extends GraphicsObject {
    constructor(xPosition, yPosition) {
        super(xPosition, yPosition)
    }

    display() {
        fill(this.fill);
        stroke(this.stroke);
        translate(this.pos.x, this.pos.y)
        this.update()
        rotate(this.vel.heading())
        rectMode(CENTER)
        quad(5, 0, -5, 3, -8, 0, -5, -3)
    }
}

let r;

function setup() {
    createCanvas(900, 540);
    frameRate(OPTIONS.frameRate)
    r = new Rocket(OPTIONS.center.x, OPTIONS.center.y)
}

function draw() {
    background(OPTIONS.bg);
    r.display()

    if (keyIsDown(LEFT_ARROW)) {
        r.applyForce(createVector(-0.1, 0))
    } if (keyIsDown(RIGHT_ARROW)) {
        r.applyForce(createVector(0.1, 0))
    } if (keyIsDown(UP_ARROW)) {
        r.applyForce(createVector(0, -0.1))
    } if (keyIsDown(DOWN_ARROW)) {
        r.applyForce(createVector(0, 0.1))
    }
}