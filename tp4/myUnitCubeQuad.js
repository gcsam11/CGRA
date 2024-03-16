import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {


        this.scene.pushMatrix();
        this.scene.translate(-0.124, -3.53, 4);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.124, -3.53, -3);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.translate(-0.5, -3.53, 3.376);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.translate(-0.5, -3.53, -3.62);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.scene.translate(-0.124, -0.490, -0.025);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.scene.translate(-0.124, -0.490, -7);
        this.scene.scale(7, 7, 7);
        this.quad.display();
        this.scene.popMatrix();

        
    }


}