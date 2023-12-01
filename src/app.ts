import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { Cylinder, IcoSphere, Plane } from './objects';
import { bounceAnimation } from './components/bounceAnimation';
import { AdvancedDynamicTexture } from 'babylonjs-gui';

const canvas = document.getElementById("canvas");
if (!(canvas instanceof HTMLCanvasElement)) throw new Error("Couldn't find a canvas. Aborting the demo")

const engine = new BABYLON.Engine(canvas, true, {});
const scene = new BABYLON.Scene(engine);

function prepareScene() {
	// Camera
	const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 4, new BABYLON.Vector3(-2, 3, 5), scene);
	camera.attachControl(canvas, true);

	// Light
	new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0.5, 2, 1).normalize(), scene);

	const uiPane = AdvancedDynamicTexture.CreateFullscreenUI('AppUI');

	// Objects
	new Plane(scene, uiPane);
	const icoSphere = new IcoSphere(scene, uiPane);
	new Cylinder(scene, uiPane);

	// Apply animation
	icoSphere.mesh.position.y = 5;
	bounceAnimation(scene, icoSphere.mesh, 5, 500);
}

prepareScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
})
