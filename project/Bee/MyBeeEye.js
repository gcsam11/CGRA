import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBeeEye extends CGFobject {
    constructor(scene){
        super(scene);
        this.sphere = new MySphere(this.scene);
        this.beeEyeTexture = new CGFtexture(this.scene, 'textures/eyeTexture.jpg');
        this.beeEyeMaterial = new CGFappearance(this.scene);
        this.beeEyeMaterial.setTexture(this.beeEyeTexture);
        this.beeEyeMaterial.setTextureWrap('REPEAT', 'REPEAT');
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
        this.beeEyeMaterial.apply();

        this.scene.pushMatrix();
        this.sphere.display();
        this.scene.popMatrix();
        super.display();
    }
}