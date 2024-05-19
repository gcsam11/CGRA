import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyUnitCubeQuad } from './myUnitCubeQuad.js';
import { MyPollen } from './MyPollen.js'


export class MyHive extends CGFobject {
    constructor(scene, currPollen, x=20, y=7, z=0) {
        super(scene);

        this.currPollen = currPollen;

        this.side1 = 'textures/whiteDrawers.jpg';
        this.side2 = 'textures/whiteDrawers.jpg';
        this.side3 = 'textures/whiteWood.jpg';
        this.side4 = 'textures/whiteWood.jpg';
        this.top = 'textures/eyeTexture.jpg';
        this.bottom = 'textures/whiteWood.jpg';

        this.cube = new MyUnitCubeQuad(this.scene, this.side1, this.side2, this.side3, this.side4, this.bottom, this.bottom);
        this.cubeTop = new MyUnitCubeQuad(this.scene, this.bottom, this.bottom, this.bottom, this.bottom, this.top, this.bottom);
        this.pollen = new MyPollen(this.scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.pollenPositions = [];
        for(var i = 0; i < this.currPollen; i++){
            var x = this.getRandomInt(-3.5, 3.5);
            var z = this.getRandomInt(-3.5, 3.5);
            this.pollenPositions.push({x: x, z: z});
        }
    }

    updateThisCurrPollenAdd(){
        this.currPollen += 1;
        this.pollenPositions.push({x: this.getRandomInt(-3.5, 3.5), z: this.getRandomInt(-3.5, 3.5)});
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);

        this.scene.pushMatrix();
        this.scene.translate(0, 7, 0);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 7, 0);
        this.scene.scale(1.1, 0.2, 1.1);
        this.cubeTop.display();
        this.scene.popMatrix();
        
        for(var i = 0; i < this.currPollen; i++){
            this.scene.pushMatrix();
            var pos = this.pollenPositions[i];
            this.scene.translate(pos.x, 7, pos.z);
            this.scene.scale(0.25, 0.25, 0.25);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}