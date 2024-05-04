import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyAntenna extends CGFobject {
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene);
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
        this.scene.translate(0.2, 0, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.03, 0.2, 0.03);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.25, Math.sin(Math.PI / 6) * 0.14, Math.cos(Math.PI / 6) * 0.3);
        this.scene.rotate(Math.PI / 5.5, 1, 0, 0);
        this.scene.rotate(Math.PI / 12, 0, 1, 0);
        this.scene.scale(0.03, 0.03, 0.2);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0, 0);
        this.scene.rotate(Math.PI / 6, 1, 0, 0);
        this.scene.scale(0.03, 0.2, 0.03);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.25, Math.sin(Math.PI / 6) * 0.14, Math.cos(Math.PI / 6) * 0.3);
        this.scene.rotate(Math.PI / 5.5, 1, 0, 0);
        this.scene.rotate(-Math.PI / 12, 0, 1, 0);
        this.scene.scale(0.03, 0.03, 0.2);
        this.sphere.display();
        this.scene.popMatrix();
        
        super.display();
    }
}