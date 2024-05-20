import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
    constructor(scene, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 20;
        this.radius = 0.6;
        this.rock = new MyRock(this.scene, this.radius, this.slices, this.stacks);
        this.material = new CGFappearance(this.scene);
        this.sizes = [];
        this.rocks = [];
        for (var numrocks = 0; numrocks < 3; numrocks++){
            this.rocks.push(new MyRock(this.scene, this.radius, this.slices, this.stacks));
        }
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
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
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 6; j++) {
                this.scene.pushMatrix();
                this.calcario.apply();
                this.scene.rotate(j, 0, 1, 0);
                this.scene.translate(2.5, 0, 0);
                this.scene.rotate(-Math.PI/3 , 0, 0, 1);
                this.scene.scale(this.sizes[i*5+j], this.sizes[i*5+j], this.sizes[i*5+j]);
                for(var k = 0 ; k < 2; k++){
                    this.rocks[k].display();
                }
                this.scene.popMatrix();
            }
        }
        
        this.scene.pushMatrix();
        this.calcario.apply();
        this.scene.translate(0, 1.8, 0);
        this.scene.rotate(-Math.PI/18, 1, 0, 1);
        this.scene.scale(5, 3.5, 7);
        this.rock.display();
        this.scene.popMatrix();
    }
}