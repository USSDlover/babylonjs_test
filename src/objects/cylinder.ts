import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';

export class Cylinder {
    private cylinder: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene) {
        this.popupMenu = new PopupMenu(this.scene);
        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {}, scene);
        this.cylinder.position.set(2, 0, 0);
        this.registerAction();
    }

    private registerAction(): void {
        this.cylinder.actionManager = new BABYLON.ActionManager(this.scene);
        this.cylinder.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                this.popupMenu.showMenu(event.meshUnderPointer!, {
                    height: {
                        min: 0.1,
                        max: 2
                    },
                    diameter: {
                        min: 0.1,
                        max: 2
                    }
                });
            }
        ));
    }
}
