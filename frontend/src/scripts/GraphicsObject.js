export class GraphicsObject {
    constructor(x, y) {
        this.pos = new Victor(x, y)
        this.vel = new Victor(0, 0)
        this.acc = new Victor(0, 0)
    }

    draw(ctx) {
        throw new Error("Draw method not implemented.")
    }

    update() {
        this.vel = this.vel.add(this.acc)
        this.pos = this.pos.add(this.acc)
    }

    applyForce(force) {
        this.acc = this.acc.add(force)
    }
}