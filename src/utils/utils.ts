import * as BABYLON from 'babylonjs';
import { AdvancedDynamicTexture, Slider, StackPanel, Control, TextBlock } from 'babylonjs-gui';

export function getSlider(options: {
    name: string;
    min: number;
    max: number;
    value: number;
    height: string;
    width: string;
}, onSliderChange: (event: number) => void): Slider {
    const slider = new Slider(options.name);
    slider.minimum = options.min;
    slider.maximum = options.max;
    slider.value = options.value;
    slider.height = options.height;
    slider.width = options.width;
    slider.onValueChangedObservable.add(onSliderChange);
    return  slider;
}

export function drawPanel(base: AdvancedDynamicTexture): StackPanel {
    const panel = new StackPanel();

    panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    panel.paddingTopInPixels = 125;
    panel.paddingRightInPixels = 50

    panel.width = '270px';
    panel.height = '270px';
    panel.background = 'gray';

    base.addControl(panel);
    return panel;
}

export function getHeaderTextControl(text: string): TextBlock {
    const header = new TextBlock();
    header.text = text;
    header.color = 'white';
    header.fontSize = 20;
    return header;
}

export function registerAction(scene: BABYLON.Scene, object: BABYLON.AbstractMesh, onAction: (event: BABYLON.ActionEvent) => void): void {
    object.actionManager = new BABYLON.ActionManager(scene);
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPickTrigger,
        onAction
    ));
}
