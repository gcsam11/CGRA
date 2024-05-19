import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyWings extends CGFobject {
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene);
        this.wingsMaterial = new CGFappearance(this.scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.wingsMaterial.setAmbient(1.0, 1.0, 1.0, 0.1); 
        this.wingsMaterial.setDiffuse(1.0, 1.0, 1.0, 0.1);
        this.wingsMaterial.setSpecular(1.0, 1.0, 1.0, 0.1);
        this.wingsMaterial.setEmission(0, 0, 0, 0.1);
        this.wingsMaterial.setShininess(1.0);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(1.25, 0, 0);

        // Forewing
        this.scene.pushMatrix();
        this.wingsMaterial.apply();
        this.scene.scale(1.5, 0.05, 0.6);
        this.sphere.display();
        this.scene.popMatrix();

        // Hindwing
        this.scene.pushMatrix();
        this.wingsMaterial.apply();
        this.scene.translate(-0.65, 0, 1);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.scale(1, 0.05, 0.5);
        this.sphere.display();
        this.scene.popMatrix();
        super.display();
        this.scene.popMatrix();
    }
}