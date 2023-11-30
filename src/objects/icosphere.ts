import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';

export class IcoSphere {
    private icoSphere: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene) {
        this.popupMenu = new PopupMenu(this.scene);
        this.icoSphere = BABYLON.MeshBuilder.CreateIcoSphere("IcoSphere", {}, scene);
        this.icoSphere.position.set(-2, 0, 0);
        this.registerAction();
    }

    private registerAction(): void {
        this.icoSphere.actionManager = new BABYLON.ActionManager(this.scene);
        this.icoSphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            (event) => {
                this.popupMenu.showMenu(event.meshUnderPointer!, {
                    diameter: { min: 0.1, max: 2, onSliderChange: this.onIcoSphereDiameterChange },
                    subdivisions: { min: 1, max: 10, onSliderChange: this.onIcoSphereSubdivisionChange },
                });
            }
        ));
    }

    private onIcoSphereDiameterChange = (newVal: number): void => {
        this.icoSphere.scaling.x = newVal;
        this.icoSphere.scaling.y = newVal;
        this.icoSphere.scaling.z = newVal;
    }
    private onIcoSphereSubdivisionChange = (newVal: number): void => {
        this.icoSphere.dispose();
        const minSubdivisions = 4; // Minimum number of subdivisions
        const maxSubdivisions = 64; // Maximum number of subdivisions

        // Normalize the slider value to the range [minSubdivisions, maxSubdivisions]
        const normalizedValue = Math.round(
            minSubdivisions + (maxSubdivisions - minSubdivisions) * ((newVal - 1) / (10 - 1))
        );
        this.icoSphere = BABYLON.MeshBuilder.CreateIcoSphere("IcoSphere", {subdivisions: normalizedValue}, this.scene);
        this.icoSphere.position.set(-2, 0, 0);
    }

}
