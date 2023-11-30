import { AdvancedDynamicTexture, Control, StackPanel } from 'babylonjs-gui';
import * as BABYLON from 'babylonjs';
import { drawPanel, getSlider } from '../utils/utils';

interface SliderOption {
    min: number;
    max: number;
    onSliderChange?: (newVal: number) => void
}

export interface SlidersOptions {
    width?: SliderOption,
    height?: SliderOption,
    diameter?: SliderOption,
    depth?: SliderOption,
    subdivisions?: SliderOption,
}

export class PopupMenu {
    private advancedTexture: AdvancedDynamicTexture;

    constructor(
        public node: BABYLON.AbstractMesh,
        public scene: BABYLON.Scene,
        ) {
        this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    }



    showMenu(
        slidersOptions: SlidersOptions,
        clickEvent: BABYLON.ActionEvent
    ): void {
        // drawPanel(this.node, this.advancedTexture);
        if (slidersOptions) {
            this.addSliders(slidersOptions, clickEvent);
        }
    }

    hideMenu(): void {
        this.advancedTexture.dispose();
    }

    private addSliders(slidersOptions: SlidersOptions, event?: BABYLON.ActionEvent): void {
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
                    this.node.scaling.x = val;
                }
            });
            Control.AddHeader(widthSlider, 'Control the width', '10px', { isHorizontal: true, controlFirst: true });
            widthSlider.top = this.node.position.y;
            widthSlider.left = this.node.position.x;
            this.advancedTexture.addControl(widthSlider);
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
                    this.node.scaling.y = val;
                }
            });
            if (event) {
                heightSlider.top = event.pointerY;
                heightSlider.left = event.pointerX;
            }
            this.advancedTexture.addControl(heightSlider);
        }
        /*if (slidersOptions?.depth) {
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
                    this.node.scaling.z = val / this.node.scaling.y;
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
                    this.node.scaling.x = val;
                    this.node.scaling.z = val;
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
        }*/
    }
}
