import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyLegs extends CGFobject {
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
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        this.scene.scale(0.06, 0.2, 0.06); 
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.cos(Math.PI/8)*0.06, -Math.sin(Math.PI / 8), 0);
        this.scene.scale(0.06, 0.2, 0.06);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.cos(Math.PI/8)*0.17, -Math.sin(Math.PI / 8)-0.26, 0.05);
        this.scene.rotate(Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.12, 0.04, 0.04);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.cos(Math.PI/8)*0.17, -Math.sin(Math.PI / 8)-0.26, -0.05);
        this.scene.rotate(-Math.PI/6, 0, 1, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.scale(0.12, 0.04, 0.04);
        this.sphere.display();
        this.scene.popMatrix();

        super.display();
    }
}