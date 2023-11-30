import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { PopupMenu } from './components/popupMenu';
import { Plane } from './objects/plane';
import { IcoSphere } from './objects/icosphere';
import { Cylinder } from './objects/cylinder';

const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Couldn't find a canvas. Aborting the demo")

const engine = new BABYLON.Engine(canvas, true, {});
const scene = new BABYLON.Scene(engine);
const popupMenu = new PopupMenu(scene);

function prepareScene() {
	// Camera
	const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 4, new BABYLON.Vector3(0, 0, 0), scene);
	camera.attachControl(canvas, true);

	// Light
	new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 1, 0.8).normalize(), scene);

	// Objects
	new Plane(scene);
	new IcoSphere(scene);
	new Cylinder(scene);

}

prepareScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
})
