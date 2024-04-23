import { CGFappearance, CGFobject} from '../../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, radius, color, leafcolor, height, stacks, slices){
        super(scene);
        this.slices = slices || 20;
        this.stacks = stacks || 20;
        this.radius = radius;
        this.height = height;
        this.color = color;
        this.leafcolor = leafcolor;
        this.material = new CGFappearance(this.scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var j = 0; j < this.stacks; j++){
            ang = 0;
            for(var i = 0; i < this.slices; i++){
                var sa=Math.sin(ang) * this.radius;
                var saa=Math.sin(ang+alphaAng) * this.radius;
                var ca=Math.cos(ang) * this.radius;
                var caa=Math.cos(ang+alphaAng) * this.radius;
                this.vertices.push(ca, sa, j/this.stacks*this.height);
                this.vertices.push(ca, sa, (j+1)/this.stacks*this.height);
                this.vertices.push(caa, saa, j/this.stacks*this.height);
                this.vertices.push(caa, saa, (j+1)/this.stacks*this.height);
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

                ang+=alphaAng;
            }
        }

        this.material.setAmbient(...this.color);
        this.material.setDiffuse(...this.color);
        this.material.setSpecular(...this.color);
        this.material.setShininess(10.0);

        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    display(){
        this.material.apply();
        super.display();
    }
}