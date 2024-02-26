import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    display() {


        this.pushMatrix();
        this.translate(-0.124, -3.53, 4);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-0.124, -3.53, -3);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(Math.PI/2, 0,1,0);
        this.translate(-0.5, -3.53, 3.376);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(Math.PI/2, 0,1,0);
        this.translate(-0.5, -3.53, -3.62);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(-Math.PI/2, 1,0,0);
        this.translate(-0.124, -0.490, -0.025);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        this.pushMatrix();
        this.rotate(-Math.PI/2, 1,0,0);
        this.translate(-0.124, -0.490, -7);
        this.scale(7, 7, 7);
        this.quad.display();
        this.popMatrix();

        
    }


}