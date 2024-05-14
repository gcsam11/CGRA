import { CGFappearance, CGFobject, CGFtexture } from '../lib/CGF.js';
import { MyBeeBody } from './Bee/MyBeeBody.js';
import { MyStinger } from './Bee/MyStinger.js';
import { MyWings } from './Bee/MyWings.js';
import { MyAntenna } from './Bee/MyAntenna.js';
import { MyMandibles } from './Bee/MyMandibles.js';
import { MyBeeEye } from './Bee/MyBeeEye.js';
import { MyLegs } from './Bee/MyLegs.js';

export class MyBee extends CGFobject {
    constructor(scene, s=3, e=5, st=1, d=2.5, x=0, y=0, z=0, orientationAngle = 0, speedVector = { x: 0, y: 0, z:0 }, speedFactor = 0.1){
        super(scene);
        this.beeBodyTexture = new CGFtexture(this.scene, 'textures/beeStripes.jpg');
        this.beeBodyMaterial = new CGFappearance(this.scene);
        this.beeBodyMaterial.setTexture(this.beeBodyTexture);
        this.beeBodyMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.headMaterial = new CGFappearance(this.scene);
        this.material = new CGFappearance(this.scene);
        this.beeBody = new MyBeeBody(this.scene);
        this.stinger = new MyStinger(this.scene);
        this.wings = new MyWings(this.scene);
        this.antenna = new MyAntenna(this.scene);
        this.mandibles = new MyMandibles(this.scene);
        this.beeEye = new MyBeeEye(this.scene);
        this.legs = new MyLegs(this.scene);
        this.wingLength = 1.5;
        this.x = x;
        this.y = y;
        this.z = z;
        this.orientationAngle = orientationAngle;
        this.speedVector = speedVector;
        this.speedFactor = speedFactor;
        this.turnFactor = Math.PI / 90;
        this.direction = 0;
        
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
        if(this.direction == 1){
            this.speedVector.x += Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z += Math.sin(-this.currentOrientationAngle) * this.speedFactor;
        }
        else if(this.direction == -1){
            this.speedVector.x -= Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z -= Math.sin(-this.currentOrientationAngle) * this.speedFactor;
        }
        else{
            this.speedVector.x += Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z += Math.sin(-this.currentOrientationAngle) * this.speedFactor;
        }
    }
    
    brake(){
        this.currentOrientationAngle = this.orientationAngle;
        if(this.direction == -1){
            this.speedVector.x += Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z += Math.sin(-this.currentOrientationAngle) * this.speedFactor;
        }
        else if(this.direction == 1){
            this.speedVector.x -= Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z -= Math.sin(-this.currentOrientationAngle) * this.speedFactor;
        }
        else{
            this.speedVector.x -= Math.cos(-this.currentOrientationAngle) * this.speedFactor;
            this.speedVector.z -= Math.sin(-this.currentOrientationAngle) * this.speedFactor;
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

    display(){

        this.scene.translate(this.x, this.animVal, this.z);
        this.scene.rotate(this.orientationAngle, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);

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

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0, Math.sin(Math.PI/4), -2*Math.cos(Math.PI/4) - 1.3);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.antenna.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(0, Math.sin(Math.PI/4) - 0.63, -2*Math.cos(Math.PI/4) - 1.25);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.mandibles.display();
        this.scene.popMatrix();

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

        this.scene.pushMatrix();
        this.scene.translate(1.9, Math.sin(Math.PI/4), -Math.cos(Math.PI/4) - 1.1);
        this.wings.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.9, Math.sin(Math.PI/4), -Math.cos(Math.PI/4) - 1.1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.wings.display();
        this.scene.popMatrix();

        super.display();

    }

    update(timeSinceAppStart) {
        this.updateDirection();

        // Animation based on elapsed time since animation start
        var elapsedTimeSecs = timeSinceAppStart - this.animStartTimeSecs;
    
        // Calculate a value that oscillates between -1 and 1 over time
        var oscillation = Math.sin(elapsedTimeSecs * Math.PI * 2 / this.animDurationSecs);
    
        // Scale and shift the oscillation to the desired range
        this.animVal = this.startVal + oscillation * this.length;

        // Update x and z based on speedVector and elapsed time
        this.x += this.speedVector.x;
        this.z += this.speedVector.z;
    }
}