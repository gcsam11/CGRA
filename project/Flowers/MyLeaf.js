import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';
import { MyTriangleSmall } from './myTriangleSmall.js';

export class MyLeaf extends CGFobject {
    constructor(scene, leafColor, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 5;
        this.radius = 0.05;
        this.leafColor = leafColor;
        this.leafTexture = new CGFtexture(this.scene, 'textures/grassblade.png');
        this.leafMaterial = new CGFappearance(this.scene);
        this.leafMaterial.setTexture(this.leafTexture);
        this.leafMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.leafMaterial.setAmbient(...this.leafColor);
        this.leafMaterial.setDiffuse(...this.leafColor);
        this.leafMaterial.setSpecular(...this.leafColor);
        this.leafMaterial.setShininess(10.0);

        this.leaf = new MyTriangleSmall(this.scene, this.leafMaterial);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
        var height = 0.3;

        for(var j = 0; j < this.stacks; j++){
            ang = 0;
            for(var i = 0; i < this.slices; i++){
                var sa=Math.sin(ang) * this.radius;
                var saa=Math.sin(ang+alphaAng) * this.radius;
                var ca=Math.cos(ang) * this.radius;
                var caa=Math.cos(ang+alphaAng) * this.radius;
                this.vertices.push(ca, sa, (j/this.stacks) * height);
                this.vertices.push(ca, sa, ((j+1)/this.stacks) * height);
                this.vertices.push(caa, saa, (j/this.stacks) * height);
                this.vertices.push(caa, saa, ((j+1)/this.stacks) * height);
                var base = 4*i+4*j*this.slices;
            
                // original indices
                this.indices.push(base, base + 1, base + 2);
                this.indices.push(base + 1, base + 3, base + 2);

                // additional indices for the other side
                this.indices.push(base, base + 2, base + 1);
                this.indices.push(base + 1, base + 2, base + 3);

                // push normals for each vertex
                this.normals.push(ca, sa, 0);
                this.normals.push(ca, sa, 0);
                this.normals.push(caa, saa, 0);
                this.normals.push(caa, saa, 0);

                // Define texture coordinates
                this.texCoords.push(i / this.slices, j / this.stacks);
                this.texCoords.push(i / this.slices, (j + 1) / this.stacks);
                this.texCoords.push((i + 1) / this.slices, j / this.stacks);
                this.texCoords.push((i + 1) / this.slices, (j + 1) / this.stacks);

                ang+=alphaAng;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display(){
        this.scene.pushMatrix();
        this.leafMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.17, 0.17, 0.17);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(-0.8, 0, 0);
        this.leaf.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.17, 0.17, 0.17);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.scene.translate(0.8, 0, 0);
        this.leaf.display();
        this.scene.popMatrix();

        super.display();

        this.scene.popMatrix();
    }
}