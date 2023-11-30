import * as BABYLON from 'babylonjs';
import { AdvancedDynamicTexture, Slider, StackPanel } from 'babylonjs-gui';

export function getSlider(options: {
    name: string;
    min: number;
    max: number;
    value: number;
    height: string;
    width: string;
}, onSliderChange: (event: number) => void): Slider {
    const slider = new Slider('widthSlider');
    slider.minimum = options.min;
    slider.maximum = options.max;
    slider.value = options.value;
    slider.height = options.height;
    slider.width = options.width;
    slider.onValueChangedObservable.add(onSliderChange);
    return  slider;
}

export function drawPanel(node: BABYLON.AbstractMesh, base: AdvancedDynamicTexture): StackPanel {
    const panel = new StackPanel();
    panel.width = '220px';
    panel.height = '150px';
    panel.background = 'gray';


    console.log(node.position);

    panel.top = node.position.y;
    panel.left = node.position.x * 20 ;

    base.addControl(panel);
    return panel;
}

export function registerAction(scene: BABYLON.Scene, object: BABYLON.AbstractMesh, onAction: (event: BABYLON.ActionEvent) => void): void {
    object.actionManager = new BABYLON.ActionManager(scene);
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onAction
    ));
}
