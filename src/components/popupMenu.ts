import { AdvancedDynamicTexture, Button, Control, StackPanel } from 'babylonjs-gui';
import * as BABYLON from 'babylonjs';

export class PopupMenu {
    private advancedTexture: AdvancedDynamicTexture;

    constructor(private scene: BABYLON.Scene) {
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }

    showMenu(node: BABYLON.AbstractMesh): void {
        const panel = new StackPanel();
        panel.width = '220px';
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        const button = Button.CreateSimpleButton('menuButton', 'Click Me');
        button.width = '100px';
        button.height = '40px';
        button.color = 'white';
        button.background = 'green';

        button.onPointerUpObservable.add(() => {
            console.log('Button clicked');
        });

        panel.addControl(button);
        this.advancedTexture.addControl(panel);

        // @ts-ignore
        const screenCoordinates = BABYLON.Vector3.Project(node.position, BABYLON.Matrix.Identity(), this.scene.getTransformMatrix(), this.scene.activeCamera!.viewport.toGlobal(this.scene.getEngine()));
        panel.top = `${screenCoordinates.y}px`;
        panel.left = `${screenCoordinates.x}px`;
    }

    hideMenu(): void {
        this.advancedTexture.dispose();
    }
}
