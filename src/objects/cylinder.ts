import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';
import { registerAction } from '../utils/utils';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

export class Cylinder {
    private readonly cylinder: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene, private uiPane: AdvancedDynamicTexture) {
        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {}, scene);
        this.cylinder.position.set(2, 0, 0);
        this.popupMenu = new PopupMenu();
        registerAction(this.scene, this.cylinder, this.onClick.bind(this));
    }

    private onClick(): void {
        this.popupMenu.showMenu({
            height: {
                min: 0.1,
                max: 2,
                onSliderChange: newVal => {
                    this.cylinder.scaling.y = newVal;
                }
            },
            diameter: {
                min: 0.1,
                max: 2,
                onSliderChange: newVal => {
                    this.cylinder.scaling.x = newVal;
                    this.cylinder.scaling.z = newVal;
                }
            }
        }, this.uiPane);
    }
}
