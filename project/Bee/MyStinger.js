import {CGFobject} from '../../lib/CGF.js';
import { MyCone } from '../MyCone.js';

export class MyStinger extends CGFobject {
    constructor(scene) {
        super(scene);
        this.cone = new MyCone(this.scene);
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, -Math.sin(Math.PI/4)+0.1, Math.cos(Math.PI/4) - 0.1);
        this.scene.rotate(3* Math.PI / 4, 1, 0, 0);
        this.scene.scale(0.1, 0.2, 0.1);
        this.cone.display();
        this.scene.popMatrix();

        super.display();
    }
}


