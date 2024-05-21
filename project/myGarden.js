import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyFlower } from './Flowers/MyFlower.js';

export class MyGarden extends CGFobject {
    constructor(scene, leafColor, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 5;
        this.radius = 0.05;
        this.leafColor = leafColor;
        this.material = new CGFappearance(this.scene);
        this.initBuffers();
        this.flowersCreate = [
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
            new MyFlower(this.scene, this.getRandomInt(2.5, 5.5), 1.5, this.getRandomInt(40, 70), this.getRandomInt(40, 70), this.getRandomInt(5, 10), this.getRandomInt(1, 3), 0.1, this.getRandomColor(),[0, 1, 0, 1], [1, 1, 0, 1], this.getRandomColor(), 1, this.getRandomInt(70, 80)),
        ];

        this.flowers = [];

        var index = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 3; j++) {
                var flower = this.flowersCreate[index];
                flower.x = i * 10 - 10;
                flower.y = flower.stemLength * flower.stemSize;
                flower.z = j * 10 + 10;
                this.flowers.push(flower);
                index++;
            }
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomColor(){
        return [Math.random(), Math.random(), Math.random(), 1];
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display(){
        for (var i = 0; i < this.flowers.length; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.flowers[i].x, this.flowers[i].y, this.flowers[i].z);
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }
}