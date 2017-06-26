export default class SuperClass {
    constructor() {
        this.obj = new PIXI.Sprite(diamondTexture);
        this.obj.alpha = 0
        this.obj.position.x = centerX;
        this.obj.position.y = centerY;
        this.obj.anchor.set(.5)
    }
}