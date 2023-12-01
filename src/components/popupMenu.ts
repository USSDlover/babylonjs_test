import { AdvancedDynamicTexture, StackPanel } from 'babylonjs-gui';
import { drawPanel, getSlider } from '../utils/utils';

interface SliderOption {
    min: number;
    max: number;
    onSliderChange: (newVal: number) => void
}

export interface SlidersOptions {
    width?: SliderOption,
    height?: SliderOption,
    diameter?: SliderOption,
    depth?: SliderOption,
    subdivisions?: SliderOption,
}

export class PopupMenu {
    private panel?: StackPanel;

    constructor() {}


    showMenu(
        slidersOptions: SlidersOptions,
        uiPane: AdvancedDynamicTexture
    ): void {
        this.panel = drawPanel(uiPane);
        if (slidersOptions) {
            this.addSliders(slidersOptions);
        }
    }

    hideMenu(): void {
        this.panel?.dispose();
    }

    private addSliders(slidersOptions: SlidersOptions): void {
        if (slidersOptions?.width) {
            const widthSlider = getSlider({
                name: 'widthSlider',
                min: slidersOptions.width.min,
                max: slidersOptions.width.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, slidersOptions.width?.onSliderChange);
            this.panel?.addControl(widthSlider);
        }
        if (slidersOptions?.height) {
            const heightSlider = getSlider({
                name: 'heightSlider',
                min: slidersOptions.height.min,
                max: slidersOptions.height.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, slidersOptions.height?.onSliderChange);
            this.panel?.addControl(heightSlider);
        }
        if (slidersOptions?.depth) {
            const depthSlider = getSlider({
                name: 'depthSlider',
                min: slidersOptions.depth.min,
                max: slidersOptions.depth.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, slidersOptions.depth?.onSliderChange);
            this.panel?.addControl(depthSlider);
        }
        if (slidersOptions?.diameter) {
            const diameterSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.diameter.min,
                max: slidersOptions.diameter.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, slidersOptions.diameter?.onSliderChange);
            this.panel?.addControl(diameterSlider);
        }
        if (slidersOptions?.subdivisions) {
            const subdivisionSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.subdivisions.min,
                max: slidersOptions.subdivisions.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, slidersOptions.subdivisions?.onSliderChange);
            this.panel?.addControl(subdivisionSlider);
        }
    }
}
