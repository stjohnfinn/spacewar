const ctx = document.querySelector('canvas').getContext("2d")

const config = {
    width: 900,
    height: 540,
    objectFill: "rgb(255, 255, 255)",
    objectStroke: "rgb(255, 255, 255)",
    baseFill: "rgb(5, 5, 5)",
    baseStroke: "rgb(5, 5, 5)",
    frameRate: 30
}

// ##################
//
// CLASS DEFINITIONS

class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y)
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    mult(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar)
    }

    limit(mag) {
        if (this.mag() == 0) {
            return this
        }
        return new Vector2D(mag / this.mag() * this.x, mag / this.mag() * this.y)
    }
}

class GraphicsObject {
    constructor(x, y) {
        this.pos = new Vector2D(x, y)
        this.vel = new Vector2D()
        this.acc = new Vector2D()
    }

    draw() {
        throw new Error("Draw method not implemented.")
    }

    update() {
        
        this.vel = this.vel.limit(1)

        // this.pos = this.pos.add(this.vel)

        this.checkOutOfBounds()
    }

    checkOutOfBounds() {
        if (this.pos.x > config.width) {this.pos.x=0} else if (this.pos.x < 0) {this.pos.x=config.width}
        if (this.pos.y > config.height) {this.pos.y=0} else if (this.pos.y < 0) {this.pos.y=config.height}
    }
}

class Rocket extends GraphicsObject {
    constructor(x, y) {
        super(x, y)
    }

    draw() {
        ctx.beginPath()
        ctx.moveTo(this.pos.x + 7, this.pos.y)
        ctx.lineTo(this.pos.x - 5, this.pos.y + 5)
        ctx.lineTo(this.pos.x - 7, this.pos.y)
        ctx.lineTo(this.pos.x - 5, this.pos.y - 5)
        ctx.fill()
    }
}

// ##################
//
// MAIN LOGIC

let gameObjects = []
let inputTracker = {}

function create() {
    ctx.fillStyle = config.objectFill
    ctx.StrokeStyle = config.objectStroke

    // Input tracking

    inputTracker["ArrowUp"] = false
    inputTracker["ArrowDown"] = false
    inputTracker["ArrowLeft"] = false
    inputTracker["ArrowRight"] = false

    window.onkeydown = function(e) {
        try {
            inputTracker[e.key] = true
        } catch {
            console.log("Key not currently tracked.")
        }
    }

    window.onkeyup = function(e) {
        try {
            inputTracker[e.key] = false
        } catch {
            console.log("Key not currently tracked.")
        }
    }

    // Initialize every game object
    gameObjects.push(new Rocket(150, 70))

    // setInterval(gameLoop, 1000 / config.frameRate)
    requestAnimationFrame(gameLoop)
}

function gameLoop() {
    clearCanvas()

    if (inputTracker["ArrowDown"]) {
        gameObjects[0].pos.y += 1
    }
    if (inputTracker["ArrowRight"]) {
        gameObjects[0].pos.x += 1
    }
    if (inputTracker["ArrowLeft"]) {
        gameObjects[0].pos.x += -1
    }
    if (inputTracker["ArrowUp"]) {
        gameObjects[0].pos.y += -1
    }

    for (const o of gameObjects) {
        o.update()
        o.draw()
    }

    requestAnimationFrame(gameLoop)
}

function clearCanvas() {
    ctx.fillStyle = config.baseFill
    ctx.strokeStyle = config.baseStroke
    ctx.fillRect(0, 0, config.width, config.height);
    ctx.fillStyle = config.objectFill
    ctx.StrokeStyle = config.objectStroke
}

create()