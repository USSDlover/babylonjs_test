import { AdvancedDynamicTexture, Control, StackPanel } from 'babylonjs-gui';
import * as BABYLON from 'babylonjs';
import { getSlider } from '../utils/utils';

interface SliderOption {
    min: number;
    max: number;
    onSliderChange?: (newVal: number) => void
}

interface SlidersOptions {
    width?: SliderOption,
    height?: SliderOption,
    diameter?: SliderOption,
    depth?: SliderOption,
    subdivisions?: SliderOption,
}

export class PopupMenu {
    private advancedTexture: AdvancedDynamicTexture;

    constructor(private scene: BABYLON.Scene) {
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }

    showMenu(
        node: BABYLON.AbstractMesh,
        slidersOptions: SlidersOptions
    ): void {
        const panel = new StackPanel();
        panel.width = '220px';
        panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        if (slidersOptions) {
            this.addSliders(node, slidersOptions, panel);
        }

        this.advancedTexture.addControl(panel);

        // @ts-ignore
        const screenCoordinates = BABYLON.Vector3.Project(node.position, BABYLON.Matrix.Identity(), this.scene.getTransformMatrix(), this.scene.activeCamera!.viewport.toGlobal(this.scene.getEngine()));
        panel.top = `${screenCoordinates.y}px`;
        panel.left = `${screenCoordinates.x}px`;
    }

    hideMenu(): void {
        this.advancedTexture.dispose();
    }

    private addSliders(node: BABYLON.AbstractMesh, slidersOptions: SlidersOptions, panel: StackPanel): void {
        if (slidersOptions?.width) {
            const widthSlider = getSlider({
                name: 'widthSlider',
                min: slidersOptions.width.min,
                max: slidersOptions.width.max,
                value: 0,
                height: '20px',
                width: '200px'
            });
            widthSlider.onValueChangedObservable.add(val => {
                if (slidersOptions.width?.onSliderChange) {
                    slidersOptions.width?.onSliderChange(val)
                } else {
                    node.scaling.x = val;
                }
            });
            panel.addControl(widthSlider);
        }
        if (slidersOptions?.height) {
            const heightSlider = getSlider({
                name: 'heightSlider',
                min: slidersOptions.height.min,
                max: slidersOptions.height.max,
                value: 0,
                height: '20px',
                width: '200px'
            });
            heightSlider.onValueChangedObservable.add(val => {
                if (slidersOptions.height?.onSliderChange) {
                    slidersOptions.height.onSliderChange(val)
                } else {
                    node.scaling.y = val;
                }
            });
            panel.addControl(heightSlider);
        }
        if (slidersOptions?.depth) {
            const depthSlider = getSlider({
                name: 'depthSlider',
                min: slidersOptions.depth.min,
                max: slidersOptions.depth.max,
                value: 0,
                height: '20px',
                width: '200px'
            });
            depthSlider.onValueChangedObservable.add(val => {
                if (slidersOptions.depth?.onSliderChange) {
                    slidersOptions.depth?.onSliderChange(val);
                } else {
                    node.scaling.z = val / node.scaling.y;
                }
            });
            panel.addControl(depthSlider);
        }
        if (slidersOptions?.diameter) {
            const widthSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.diameter.min,
                max: slidersOptions.diameter.max,
                value: 0,
                height: '20px',
                width: '200px'
            });
            widthSlider.onValueChangedObservable.add(val => {
                if (slidersOptions.diameter?.onSliderChange) {
                    slidersOptions.diameter.onSliderChange(val);
                } else {
                    node.scaling.x = val;
                    node.scaling.z = val;
                }
            });
            panel.addControl(widthSlider);
        }
        if (slidersOptions?.subdivisions) {
            const widthSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.subdivisions.min,
                max: slidersOptions.subdivisions.max,
                value: 0,
                height: '20px',
                width: '200px'
            });
            widthSlider.onValueChangedObservable.add(val => {
                if (slidersOptions.subdivisions?.onSliderChange) {
                    slidersOptions.subdivisions?.onSliderChange(val);
                }
            });
            panel.addControl(widthSlider);
        }
    }
}
