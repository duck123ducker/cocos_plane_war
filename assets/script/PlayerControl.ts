import { _decorator, Component, Node, Input, input, EventKeyboard, KeyCode, UITransform, view, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab) bullet: Prefab

    speed = 400
    viewSize
    playerSize
    pressingKey = {
        [KeyCode.KEY_A]: false,
        [KeyCode.KEY_D]: false,
        [KeyCode.KEY_S]: false,
        [KeyCode.KEY_W]: false
    }
    start() {
        this.viewSize = view.getDesignResolutionSize()
        this.playerSize = {x: this.getComponent(UITransform).contentSize.x * this.node.getScale().x, y: this.getComponent(UITransform).contentSize.y * this.node.getScale().y}
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
        this.schedule(()=>{
            const { x, y } = this.node.getPosition();
            const node = instantiate(this.bullet);
            node.setParent(this.node.parent);
            node.setPosition(x, y + this.playerSize.y / 2);
        }, 0.1)
    }

    onKeyDown(event: EventKeyboard){
        switch(event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
                this.pressingKey[event.keyCode] = true
                break
        }
    }

    onKeyUp(event: EventKeyboard){
        switch(event.keyCode) {
            case KeyCode.KEY_W:
            case KeyCode.KEY_A:
            case KeyCode.KEY_S:
            case KeyCode.KEY_D:
                this.pressingKey[event.keyCode] = false
                break
        }
    }

    update(deltaTime: number) {
        Object.keys(this.pressingKey).forEach( key => {
            if(this.pressingKey[key]){
                const { x , y } = this.node.getPosition()
                switch(Number(key)){
                    case KeyCode.KEY_W:
                        if(this.viewSize.y / 2 >= y + deltaTime * this.speed + this.playerSize.y / 2){
                            this.node.setPosition(x, y + deltaTime * this.speed)
                        }
                        break
                    case KeyCode.KEY_A:
                        if(-this.viewSize.x / 2 <= x - deltaTime * this.speed - this.playerSize.x / 2){
                            this.node.setPosition(x - deltaTime * this.speed, y)
                        }
                        break
                    case KeyCode.KEY_S:
                        if(-this.viewSize.y / 2 <= y - deltaTime * this.speed - this.playerSize.y / 2){
                            this.node.setPosition(x, y - deltaTime * this.speed)
                        }
                        break
                    case KeyCode.KEY_D:
                        if(this.viewSize.x / 2 >= x + deltaTime * this.speed + this.playerSize.x / 2){
                            this.node.setPosition(x + deltaTime * this.speed, y)
                        }
                        break
                }
            }
        })
    }
}


