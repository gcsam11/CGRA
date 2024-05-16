import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyBeeBody } from './Bee/MyBeeBody.js';
import { MyStinger } from './Bee/MyStinger.js';
import { MyWings } from './Bee/MyWings.js';
import { MyAntenna } from './Bee/MyAntenna.js';
import { MyMandibles } from './Bee/MyMandibles.js';
import { MyBeeEye } from './Bee/MyBeeEye.js';
import { MyLegs } from './Bee/MyLegs.js';
import { MyPollen } from './MyPollen.js';

export class MyBee extends CGFobject {
    constructor(scene, s=3, e=5, st=1, d=2.5, x=0, y=0, z=0, orientationAngle = 0, speedVector = { x: 0, y: 0, z:0 }, speedFactor = 1){
        super(scene);

        // Textures and Materials
        this.beeBodyTexture = new CGFtexture(this.scene, 'textures/beeStripes.jpg');
        this.beeBodyMaterial = new CGFappearance(this.scene);
        this.beeBodyMaterial.setTexture(this.beeBodyTexture);
        this.beeBodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.headMaterial = new CGFappearance(this.scene);
        this.material = new CGFappearance(this.scene);

        // Components
        this.beeBody = new MyBeeBody(this.scene);
        this.stinger = new MyStinger(this.scene);
        this.wings = new MyWings(this.scene);
        this.antenna = new MyAntenna(this.scene);
        this.mandibles = new MyMandibles(this.scene);
        this.beeEye = new MyBeeEye(this.scene);
        this.legs = new MyLegs(this.scene);
        this.pollen = new MyPollen(this.scene);

        // Animation variables
        this.wingLength = 1.5;
        this.x = x;
        this.y = y;
        this.z = z;
        this.orientationAngle = orientationAngle;
        this.speedVector = speedVector;
        this.speedFactor = speedFactor;
        this.turnFactor = Math.PI / 90;
        this.direction = 0;
        this.hasPollen = true;
        this.midAnimation = false;
        this.hivePosition = null;
        this.animStartTime = null;
        this.turning = true;
        this.getBackFromHive = false;
        
        this.startVal=s;
        this.endVal=e;
        this.animStartTimeSecs=st;
        this.animDurationSecs=d;
        this.length=(this.endVal-this.startVal);

        this.animVal=this.startVal;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.material.setAmbient(0.28, 0.23, 0.19, 1.0);
        this.material.setDiffuse(0.28, 0.23, 0.19, 1.0);
        this.material.setSpecular(0.28, 0.23, 0.19, 1.0);

        this.headMaterial.setAmbient(0.6, 0.6, 0, 1);
        this.headMaterial.setDiffuse(0.6, 0.6, 0, 1);
        this.headMaterial.setSpecular(0.6, 0.6, 0, 1);

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    updateSpeedFactor(speedFactor){
        this.speedFactor = speedFactor;
    }

    updateDirection() {
        if(this.speedVector.x === 0 && this.speedVector.z === 0) {
            this.direction = 0; // stopped
        }
        else if (this.orientationAngle > this.currentOrientationAngle) {
            this.direction = 1; // turning right
        } 
        else if (this.orientationAngle < this.currentOrientationAngle) {
            this.direction = -1; // turning left
        } 
        else {
            this.direction = 0; // not turning
        }
    }

    resetPos(){
        this.x = 0;
        this.z = 0;
        this.speedVector.x = 0;
        this.speedVector.z = 0;
        this.orientationAngle = 0;
        this.direction = 0;
    }

    accelerate(){
        this.currentOrientationAngle = this.orientationAngle;
         
        this.speedVector.x += Math.cos(-this.currentOrientationAngle) * this.speedFactor;
        this.speedVector.z += Math.sin(-this.currentOrientationAngle) * this.speedFactor;
    }
    
    brake() {
        // Define a brake factor less than 1 but greater than 0
        var brakeFactor = 0.4;
    
        // Multiply the speed vector components by the brake factor
        this.speedVector.x *= brakeFactor;
        this.speedVector.z *= brakeFactor;
    
        // If the speed vector components are close to zero, set them to exactly zero
        if (Math.abs(this.speedVector.x) < 0.1) {
            this.speedVector.x = 0;
        }
        if (Math.abs(this.speedVector.z) < 0.1) {
            this.speedVector.z = 0;
        }
    }

    updateSpeedVector(){
        if(this.direction != 0){
            var speedMagnitude = Math.sqrt(this.speedVector.x**2 + this.speedVector.z**2);
            this.speedVector.x = Math.cos(-this.orientationAngle) * speedMagnitude;
            this.speedVector.z = Math.sin(-this.orientationAngle) * speedMagnitude;
        }
    }

    turnLeft(){
        this.orientationAngle += this.turnFactor;
        this.updateSpeedVector(this.orientationAngle);
    }
    
    turnRight(){
        this.orientationAngle -= this.turnFactor;
        this.updateSpeedVector(this.orientationAngle);
    }

    updateHasPollen(){
        this.hasPollen = !this.hasPollen;
    }

    updateMidAnimation(){
        this.midAnimation = !this.midAnimation;
    }

    transportToHive(targetX, targetY, targetZ){
        if(this.hasPollen && !this.midAnimation){
            this.updateMidAnimation();
            this.hivePosition = {x: targetX, y: targetY, z: targetZ};
            this.animStartTime = Date.now();
            return true;
        }
        else{
            return false;
        }
    }

    display(){

        this.scene.pushMatrix();

        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);

        // Body

        this.scene.pushMatrix();
        this.headMaterial.apply();
        this.scene.translate(0, Math.sin(Math.PI/4) - 0.2, -2*Math.cos(Math.PI/4) - 1.1);
        this.scene.rotate(10*Math.PI / 180, 1, 0, 0);
        this.scene.scale(0.5, 0.6, 0.4);
        this.beeBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beeBodyMaterial.apply();
        this.scene.rotate(Math.PI / 4, 1, 0, 0);
        this.scene.scale(0.6, 0.5, 0.9);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.beeBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.beeBodyMaterial.apply();
        this.scene.scale(0.6, 0.4, 0.8);
        this.scene.translate(0, Math.sin(Math.PI/4) + 1, -Math.cos(Math.PI/4) - 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.beeBody.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.stinger.display();
        this.scene.popMatrix();

        // Antenna

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0, Math.sin(Math.PI/4), -2*Math.cos(Math.PI/4) - 1.3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.antenna.display();
        this.scene.popMatrix();

        // Mandibles

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0, Math.sin(Math.PI/4) - 0.63, -2*Math.cos(Math.PI/4) - 1.25);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.mandibles.display();
        this.scene.popMatrix();

        // Eyes

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.4, Math.sin(Math.PI/4), -3*Math.cos(Math.PI/4) - 0.4);
        this.scene.rotate(10*Math.PI / 180, 1, 0, 0);
        this.scene.rotate(15*Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.2, 0.3, 0.2);
        this.beeEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(-0.4, Math.sin(Math.PI/4), -3*Math.cos(Math.PI/4) - 0.4);
        this.scene.rotate(10*Math.PI / 180, 1, 0, 0);
        this.scene.rotate(-15*Math.PI / 180, 0, 0, 1);
        this.scene.scale(0.2, 0.3, 0.2);
        this.beeEye.display();
        this.scene.popMatrix();

        // Legs

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(-0.65, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 0.65);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.65, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 0.65);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(-0.55, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 0.2);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.55, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 0.2);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(-0.55, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 1.1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.legs.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0.55, Math.sin(Math.PI/4) - 0.3, -Math.cos(Math.PI/4) - 1.1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.legs.display();
        this.scene.popMatrix();

        if(this.hasPollen){
            this.scene.pushMatrix();
            this.scene.translate(0.5, Math.sin(Math.PI/4) - 1, -Math.cos(Math.PI/4) - 1.1);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.scale(0.2, 0.2, 0.2);
            this.pollen.display();
            this.scene.popMatrix();
        }

        // Wings 

        this.scene.pushMatrix();
        this.scene.translate(1.9, Math.sin(Math.PI/4), -Math.cos(Math.PI/4) - 1.1);
        this.scene.translate(-1.3, 0, 0);
        this.scene.rotate(this.wingAnimVal, 0, 0, 1);
        this.wings.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.9, Math.sin(Math.PI/4), -Math.cos(Math.PI/4) - 1.1);
        this.scene.translate(1.3, 0, 0);
        this.scene.rotate(-this.wingAnimVal, 0, 0, 1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.wings.display();
        this.scene.popMatrix();

        super.display();
        this.scene.popMatrix();

    }

    update(timeSinceAppStart) {
        this.updateDirection();

        // Animation based on elapsed time since animation start
        var elapsedTimeSecs = timeSinceAppStart - this.animStartTimeSecs;
    
        if(!this.midAnimation){
            // Calculate a value that oscillates between -1 and 1 over time
            var oscillation = Math.sin(elapsedTimeSecs * Math.PI * 2 / (this.animDurationSecs / this.speedFactor));

            // Scale and shift the oscillation to the desired range
            this.speedVector.y = this.startVal + oscillation * this.length;
        }

        this.goToHiveAnimation();

        var wingOscillation = Math.sin(elapsedTimeSecs * Math.PI * 2 / (0.25 / this.speedFactor));

        this.wingAnimVal = wingOscillation;

        // Update x and z
        this.x += this.speedVector.x;
        if(this.midAnimation){
            this.y += this.speedVector.y;
        }
        else{        
            this.y = this.speedVector.y;
        }
        this.z += this.speedVector.z;
    }

    goToHiveAnimation(){
        if(this.midAnimation && this.hivePosition != null){
            this.goToHeight(this.hivePosition.y);

            var differenceY = Math.abs(this.hivePosition.y - this.y);
        
            if(differenceY < 0.1){
                // Turn to the place where the hive is
                this.turnToTarget(this.hivePosition.x, this.hivePosition.z);
            }
        
            if(!this.turning){
                // Go to the hive
                this.goToTarget(this.hivePosition.x, this.hivePosition.z);
            }

            var distanceToTarget = Math.sqrt(Math.pow(this.x - this.hivePosition.x, 2) + Math.pow(this.y - this.hivePosition.y, 2) + Math.pow(this.z - this.hivePosition.z, 2));
        
            // If the animation is finished, reset the target coordinates and the start time
            if (distanceToTarget < 0.01) {
                this.animStartTime = null;
                this.hivePosition = null;
                this.updateHasPollen();
                this.getBackFromHive = true;
            }
        }

        if(this.getBackFromHive){
            this.getAwayFromHive();    

            // If the bee has reached the target position, change getBackFromHive and MidAnimation
            if (this.y <= 3.05) {
                this.getBackFromHive = false;
                this.updateMidAnimation();
            }

        }
    }

    // Make the bee go to a specific height
    goToHeight(targetY) {
        // Calculate the new speed vector
        this.speedVector.x = 0;
        this.speedVector.y = (targetY - this.y) * 0.1;
        this.speedVector.z = 0;
    }

    turnToTarget(targetX, targetZ) {
        this.turning = true;

        // Calculate the angle between the current direction and the target direction
        var targetAngle = Math.atan2(targetZ - this.z, targetX - this.x);

        // Normalize targetAngle to the range [0, 2*Math.PI]
        if (targetAngle < 0) {
            targetAngle += 2 * Math.PI;
        }

        // Calculate the difference between the target angle and the current orientation
        var angleDifference = targetAngle - this.orientationAngle;

        // Adjust the angle difference to the range [-Math.PI, Math.PI]
        while (angleDifference > Math.PI) {
            angleDifference -= 2 * Math.PI;
        }
        while (angleDifference < -Math.PI) {
            angleDifference += 2 * Math.PI;
        }

        // Add a fraction of the angle difference to the current orientation to smoothly turn the bee
        this.orientationAngle += angleDifference * 0.1;

        // Normalize orientationAngle to the range [0, 2*Math.PI]
        if (this.orientationAngle < 0) {
            this.orientationAngle += 2 * Math.PI;
        }

        // If the bee has reached the target direction, stop turning
        if (Math.abs(angleDifference) < 0.01) {
            this.turning = false;
        }
    }

    goToTarget(targetX, targetZ) {
        // Calculate the new speed vector
        this.speedVector.x = (targetX - this.x) * 0.1;
        this.speedVector.z = (targetZ - this.z) * 0.1;
    }

    getAwayFromHive() {
        // Move to the new target position
        this.goToTarget(10, 0);
    
        // Call updateAwayFromHive in the next frame
        requestAnimationFrame(this.updateAwayFromHive.bind(this));
    }
    
    updateAwayFromHive() {
        // Update x, y, and z
        this.x += this.speedVector.x * 0.1 * this.speedFactor;
        this.y += this.speedVector.y * 0.1 * this.speedFactor;
        this.z += this.speedVector.z * 0.1 * this.speedFactor;
    
        // Calculate the distance to the target position
        var distanceToTarget = Math.sqrt(Math.pow(this.x - 10, 2) + Math.pow(this.y - this.y, 2) + Math.pow(this.z - 0, 2));
    
        // If the bee has reached the target position, go down
        if (distanceToTarget <= 0.01) {
            this.goToHeight(3);
        }

        // If the bee has not reached the target position, call updateAwayFromHive again in the next frame
        else {
            requestAnimationFrame(this.updateAwayFromHive.bind(this));
        }
    }
}