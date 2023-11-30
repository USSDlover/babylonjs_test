import { Slider } from 'babylonjs-gui';

export function getSlider(options: {
    name: string;
    min: number;
    max: number;
    value: number;
    height: string;
    width: string;
}): Slider {
    const slider = new Slider('widthSlider');
    slider.minimum = options.min;
    slider.maximum = options.max;
    slider.value = options.value;
    slider.height = options.height;
    slider.width = options.width;
    return  slider;
}
