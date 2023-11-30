import * as BABYLON from 'babylonjs';

function decreasingBounce(frame: number, amplitude: number, duration: number) {
    const period: number = duration / 1000; // Convert duration to seconds
    const frequency: number = 1 / period;

    // Calculate decreasing amplitude over time, ensuring it doesn't become negative
    const decreasingAmplitude: number = Math.max(0, amplitude * (1 - frame / duration / 1000));

    // Use a sine function to create a bouncing effect within the decreasing amplitude
    const bounceValue: number = decreasingAmplitude * Math.abs(Math.sin(2 * Math.PI * frequency * frame / 60));

    return bounceValue;
}

export function bounceAnimation(scene: BABYLON.Scene, node: BABYLON.AbstractMesh, amplitude: number, duration: number) {
    const fps = 60;
    const bounceAnimation = new BABYLON.Animation(
        "bounceAnimation",
        "position.y",
        fps,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const bounceFrames = [];

    // bounceFrames.push({ frame: 0, value: amplitude });

    const numberOfFrames = duration * 60 / 1000;
    for (let frame = 0; frame <= numberOfFrames; frame++) {
        const bouncedValue = decreasingBounce(frame, duration, amplitude);
        console.log(`Frame: ${frame}, Bounced value: ${bouncedValue.toFixed(2)}`)
        bounceFrames.push({ frame, value: bouncedValue.toFixed(2) });
    }

    bounceAnimation.setKeys(bounceFrames);
    node.animations = [];
    node.animations.push(bounceAnimation);

    scene.beginAnimation(node, 0, numberOfFrames, false, 1.0, function () {
        // Animation completed
        console.log('Animation completed');
    });
}
