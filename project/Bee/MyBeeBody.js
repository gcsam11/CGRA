import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MySphere } from '../MySphere.js';

export class MyBeeBody extends CGFobject {
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
        this.sphere.display();
        super.display();
    }
}