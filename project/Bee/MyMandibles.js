import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyCone } from '../MyCone.js';

export class MyMandibles extends CGFobject {
    constructor(scene){
        super(scene);
        this.cone = new MyCone(this.scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(0.15, 0, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.15, 0, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cone.display();
        this.scene.popMatrix();

        super.display();
    }
}