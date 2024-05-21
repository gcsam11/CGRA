import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSpawn extends CGFobject {
    constructor(scene, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 5;
        this.radius = 0.6;
        this.material = new CGFappearance(this.scene);
        this.positions = [];
        this.sizes = [];
        this.rocks = [];
        for (var numrocks = 0; numrocks < 10; numrocks++){
            this.rocks.push(new MyRock(this.scene, this.radius, this.slices, this.stacks));
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.positions.push([i * 10 + Math.random() * 5, j * 10 + Math.random() * 5]);
                this.sizes.push(Math.random() * 2 + 1);
            }
        }
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        
                
        this.rocktxt = new CGFtexture(this.scene, "textures/calsadaPortuguesa.jpg");
        this.calcario = new CGFappearance(this.scene);
        this.calcario.setTexture(this.rocktxt);
        this.calcario.setTextureWrap('REPEAT', 'REPEAT');

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display(){
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                this.scene.pushMatrix();
                this.calcario.apply();
                this.scene.translate(this.positions[i*5+j][0], 0, this.positions[i*5+j][1]);
                this.scene.scale(this.sizes[i*5+j], this.sizes[i*5+j], this.sizes[i*5+j]);
                this.scene.translate(-this.radius - 10, 0, -this.radius -8);
                for(var k = 0 ; k < 10; k++){
                    this.rocks[k].display();
                }
                this.scene.popMatrix();
            }
        }
    }
}