import * as BABYLON from 'babylonjs'
import { PopupMenu } from '../components/popupMenu';
import { registerAction } from '../utils/utils';

export class IcoSphere {
    public mesh: BABYLON.Mesh;
    private popupMenu: PopupMenu;
    constructor(private scene: BABYLON.Scene) {
        this.mesh = BABYLON.MeshBuilder.CreateIcoSphere("IcoSphere", {}, scene);
        this.mesh.position.set(-2, 0, 0);
        this.popupMenu = new PopupMenu(this.mesh, this.scene);
        registerAction(this.scene, this.mesh, this.onClick.bind(this));
    }

    onClick(event: BABYLON.ActionEvent): void {
        this.popupMenu.showMenu({
            diameter: { min: 0.1, max: 2, onSliderChange: this.onIcoSphereDiameterChange },
            subdivisions: { min: 1, max: 10, onSliderChange: this.onIcoSphereSubdivisionChange },
        }, event);
    }

    private onIcoSphereDiameterChange = (newVal: number): void => {
        this.mesh.scaling.x = newVal;
        this.mesh.scaling.y = newVal;
        this.mesh.scaling.z = newVal;
    }
    private onIcoSphereSubdivisionChange = (newVal: number): void => {
        this.mesh.dispose();
        const minSubdivisions = 4; // Minimum number of subdivisions
        const maxSubdivisions = 64; // Maximum number of subdivisions

        // Normalize the slider value to the range [minSubdivisions, maxSubdivisions]
        const normalizedValue = Math.round(
            minSubdivisions + (maxSubdivisions - minSubdivisions) * ((newVal - 1) / (10 - 1))
        );
        this.mesh = BABYLON.MeshBuilder.CreateIcoSphere("IcoSphere", {subdivisions: normalizedValue}, this.scene);
        this.mesh.position.set(-2, 0, 0);
    }

}
