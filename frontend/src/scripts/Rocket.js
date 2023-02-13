import { GraphicsObject } from "./GraphicsObject";

export class Rocket extends GraphicsObject {
    constructor(x, y) {
        super(x, y)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.pos.x, this.pos.y)
        ctx.lineTo(this.pos.x + 10, this.pos.y)
        ctx.lineTo(this.pos.x, this.pos.y + 10)
        ctx.fill()
    }
}