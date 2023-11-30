import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { PopupMenu } from './components/popupMenu';

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
	const plane = BABYLON.MeshBuilder.CreateBox("Plane", {}, scene);
	plane.rotationQuaternion = BABYLON.Quaternion.FromEulerAngles(0, Math.PI, 0);
	plane.actionManager = new BABYLON.ActionManager(scene);
	plane.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
		BABYLON.ActionManager.OnPickTrigger,
		(event) => {
			popupMenu.showMenu(event.meshUnderPointer!);
		}
	))

	const icosphere = BABYLON.MeshBuilder.CreateIcoSphere("IcoSphere", {}, scene);
	icosphere.position.set(-2, 0, 0);

	const cylinder = BABYLON.MeshBuilder.CreateCylinder("Cylinder", {}, scene);
	cylinder.position.set(2, 0, 0);
}

prepareScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener("resize", () => {
	engine.resize();
})
