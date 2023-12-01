import { AdvancedDynamicTexture, Grid } from 'babylonjs-gui';
import { drawPanel, getHeaderTextControl, getSlider } from '../utils/utils';

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
    private panel?: Grid;

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
            const label = getHeaderTextControl('Width Control');
            this.panel?.addRowDefinition(55, true);
            this.panel?.addControl(label,0 , 0);
            const widthSlider = getSlider({
                name: 'widthSlider',
                min: slidersOptions.width.min,
                max: slidersOptions.width.max,
                value: 0,
                height: '20px',
                width: '200px'
            }, newVal => {
                slidersOptions.width?.onSliderChange(newVal);
                label.text = `Width: ${newVal.toFixed(2)}`;
            });
            this.panel?.addControl(widthSlider, 0, 1);
        }
        if (slidersOptions?.height) {
            const label = getHeaderTextControl('Height Control');
            this.panel?.addRowDefinition(55, true);
            this.panel?.addControl(label,this.panel?.rowCount - 1 , 0);
            const heightSlider = getSlider({
                name: 'heightSlider',
                min: slidersOptions.height.min,
                max: slidersOptions.height.max,
                value: 0,
                height: '20px',
                width: '200px'
            },  newVal => {
                slidersOptions.height?.onSliderChange(newVal);
                label.text = `Height: ${newVal.toFixed(2)}`;
            });
            this.panel?.addControl(heightSlider,this.panel?.rowCount - 1 , 1);
        }
        if (slidersOptions?.depth) {
            const label = getHeaderTextControl('Depth Control');
            this.panel?.addRowDefinition(55, true);
            this.panel?.addControl(label,this.panel?.rowCount - 1 , 0);
            const depthSlider = getSlider({
                name: 'depthSlider',
                min: slidersOptions.depth.min,
                max: slidersOptions.depth.max,
                value: 0,
                height: '20px',
                width: '200px'
            },   newVal => {
                slidersOptions.depth?.onSliderChange(newVal);
                label.text = `Depth: ${newVal.toFixed(2)}`;
            });
            this.panel?.addControl(depthSlider,this.panel?.rowCount - 1 , 1);
        }
        if (slidersOptions?.diameter) {
            const label = getHeaderTextControl('Diameter Control');
            this.panel?.addRowDefinition(55, true);
            this.panel?.addControl(label,this.panel?.rowCount - 1 , 0);
            const diameterSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.diameter.min,
                max: slidersOptions.diameter.max,
                value: 0,
                height: '20px',
                width: '200px'
            },  newVal => {
                slidersOptions.diameter?.onSliderChange(newVal);
                label.text = `Diameter: ${newVal.toFixed(2)}`;
            });
            this.panel?.addControl(diameterSlider,this.panel?.rowCount - 1 , 1);
        }
        if (slidersOptions?.subdivisions) {
            const label = getHeaderTextControl('Subdivisions');
            this.panel?.addRowDefinition(55, true);
            this.panel?.addControl(label,this.panel?.rowCount - 1 , 0);
            const subdivisionSlider = getSlider({
                name: 'diameterSlider',
                min: slidersOptions.subdivisions.min,
                max: slidersOptions.subdivisions.max,
                value: 0,
                height: '20px',
                width: '200px'
            },  newVal => {
                slidersOptions.subdivisions?.onSliderChange(newVal);
                label.text = `Subdivisions: ${newVal.toFixed(2)}`;
            });
            this.panel?.addControl(subdivisionSlider,this.panel?.rowCount - 1 , 1);
        }
    }
}
