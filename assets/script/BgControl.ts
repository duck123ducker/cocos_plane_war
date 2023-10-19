import { _decorator, Component, Node, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    viewSize
    speed = 200
    start() {
        this.viewSize = view.getDesignResolutionSize()
    }

    update(deltaTime: number) {
        // @ts-ignore
        for (const [index, item] of this.node.children.entries()) {
            const { x, y } = item.getPosition()
            item.setPosition( x, y - deltaTime * this.speed)
            if(y - deltaTime * this.speed < -this.viewSize.y) item.setPosition( x, y - deltaTime * this.speed + this.viewSize.y * 2)
        }
    }
}


