import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './Flowers/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, leafColor, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 20;
        this.radius = 0.05;
        this.leafColor = leafColor;
        this.material = new CGFappearance(this.scene);
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
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.scene.pushMatrix();
                this.scene.scale(3, 3, 3);
                this.scene.rotate(Math.PI / 2, 1, 0, 0); // Rotate the garden to be horizontal
                this.scene.translate(i * 10, j * 10, 0); // Adjust the multiplier to change distance between flowers
                var flower = new MyFlower(this.scene); // Replace with your flower class
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}