import { _decorator, Component, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {
    speed = 600
    viewSize
    start() {
        this.viewSize = view.getDesignResolutionSize()
    }

    update(deltaTime: number) {
        const { x, y } = this.node.getPosition();
        this.node.setPosition(x, y + this.speed * deltaTime);
        if(y + this.speed * deltaTime > this.viewSize.y / 2) {
            this.node.destroy();
        }
    }
}


