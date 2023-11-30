import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';
import { registerAction } from '../utils/utils';

export class Cylinder {
    private readonly cylinder: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene) {
        this.cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {}, scene);
        this.cylinder.position.set(2, 0, 0);
        this.popupMenu = new PopupMenu(this.cylinder, this.scene);
        registerAction(this.scene, this.cylinder, this.onClick.bind(this));
    }

    private onClick(event: BABYLON.ActionEvent): void {
        console.log('Object click', event);
        this.popupMenu.showMenu({
            height: {
                min: 0.1,
                max: 2,
                onSliderChange: newVal => {
                    this.cylinder.scaling.y = newVal
                }
            },
            diameter: {
                min: 0.1,
                max: 2,
                onSliderChange: newVal => {
                    this.cylinder.scaling.y = newVal
                }
            }
        }, event);
    }
}
