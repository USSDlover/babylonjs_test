import * as BABYLON from 'babylonjs';

function generateKeys(duration: number, amplitude: number, numBounces = 3) {
    // Calculate the time for each bounce
    const bounceTime = duration / numBounces;

    // Define keyframes for each bounce with decreasing amplitude
    const keys = [];
    let currentAmplitude = amplitude;

    for (let i = 0; i < numBounces; i++) {
        // Upward bounce
        keys.push({ frame: i * bounceTime * 2, value: 0 });
        keys.push({ frame: i * bounceTime * 2 + bounceTime, value: currentAmplitude });
        keys.push({ frame: i * bounceTime * 2 + bounceTime * 2, value: 0 });

        // Decrease amplitude for the next bounce
        currentAmplitude *= 0.7;
    }

    return keys;
}

export function bounceAnimation(scene: BABYLON.Scene, node: BABYLON.AbstractMesh, amplitude: number, duration: number) {
    const animationBox = new BABYLON.Animation("bounceAnimation", "position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    const keys = generateKeys((duration / 100 * 2.963), amplitude, 5);
    animationBox.setKeys(keys);

    scene.beginDirectAnimation(node, [animationBox], 0, duration, false);
}
