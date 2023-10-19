import { _decorator, Component, Node, Prefab, view, instantiate, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab) enemy: Prefab
    viewSize
    enemySize
    killed = 0
    start() {
        this.viewSize = view.getDesignResolutionSize()
        this.enemySize = {x: this.getComponent(UITransform).contentSize.x * this.node.getScale().x, y: this.getComponent(UITransform).contentSize.y * this.node.getScale().y}
        const { x, y } = this.node.getPosition();
        this.schedule(() => {
            const node = instantiate(this.enemy);
            const max = (this.viewSize.x - this.enemySize.x) / 2
            node.setPosition(Math.floor(Math.random() * (max * 2)) - max, y);
            this.node.addChild(node);
        }, 1);
    }
    addKilled(){
        this.killed++
    }
    update(deltaTime: number) {
        
    }
}


