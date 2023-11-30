import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';

export class Plane {
    private plane: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene) {
        this.popupMenu = new PopupMenu(this.scene);
        this.plane = BABYLON.MeshBuilder.CreateBox("Plane", {}, scene);
        this.plane.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI, 0);
        this.registerAction();
    }

    private registerAction(): void {
        this.plane.actionManager = new BABYLON.ActionManager(this.scene);
        this.plane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                this.popupMenu.showMenu(event.meshUnderPointer!, {
                    width: {
                        min: 0.1,
                        max: 2
                    },
                    height: {
                        min: 0.1,
                        max: 2
                    },
                    depth: {
                        min: 0.1,
                        max: 2
                    },
                });
            }
        ));
    }
}