import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('killedControl')
export class killedControl extends Component {
    start() {

    }

    update(deltaTime: number) {
        this.node.getComponent(Label).string = `战绩：${ this.node.getParent().getChildByName("enemy").getComponent("EnemyManager").killed }`
    }
}


