import { _decorator, Component, Node, view, Contact2DType, Collider2D, director, Director, IPhysics2DContact, assetManager,
    SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    life = 5
    viewSize
    speed = 400
    airplaneDeadImages: SpriteFrame[]
    start() {
        this.viewSize = view.getDesignResolutionSize()
        const collider = this.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.loadImages();
    }

    update(deltaTime: number) {
        if(this.life > 0){
            const { x, y } = this.node.getPosition();
            const moveY = y - this.speed * deltaTime;
            this.node.setPosition(x, moveY);
            if (moveY < -this.viewSize / 2) {
                this.node.destroy();
            }
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        director.once(Director.EVENT_AFTER_PHYSICS, ()=>{
            this.life--
            if(this.life === 0){
                this.playDead()
                setTimeout(()=>{
                    selfCollider.node.destroy()
                }, 400)
                this.node.getParent().getComponent("EnemyManager").addKilled()
            }
            otherCollider.node.destroy()
        })
    }

    loadImages() {
        assetManager.resources.loadDir(
            "enemy-death",
            SpriteFrame,
            (err, spriteFrames ) => {
                this.airplaneDeadImages = spriteFrames;
            }
        );
    }

    playDead() {
        for (let i = 0; i < this.airplaneDeadImages.length; i++) {
            setTimeout(() => {
                if (this.node.getComponent) {
                    this.node.getComponent(Sprite).spriteFrame =
                        this.airplaneDeadImages[i];
                }
            }, i * 80);
        }
    }
}