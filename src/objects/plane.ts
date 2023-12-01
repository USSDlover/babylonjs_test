import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export class Plane {
    private plane: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene, private uiPane: AdvancedDynamicTexture) {
        this.plane = BABYLON.MeshBuilder.CreateBox("Plane", {}, scene);
        this.plane.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI, 0);
        this.popupMenu = new PopupMenu();
        this.registerAction();
    }

    private registerAction(): void {
        this.plane.actionManager = new BABYLON.ActionManager(this.scene);
        this.plane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            () => {
                this.uiPane.clear();
                this.popupMenu.showMenu({
                    width: {
                        min: 0.1,
                        max: 2,
                        onSliderChange: newVal => {
                            this.plane.scaling.y = newVal;
                        }
                    },
                    height: {
                        min: 0.1,
                        max: 2,
                        onSliderChange: newVal => this.plane.scaling.x = newVal
                    },
                    depth: {
                        min: 0.1,
                        max: 2,
                        onSliderChange: newVal => this.plane.scaling.z = newVal
                    },
                }, this.uiPane);
            }
        ));
    }
}
