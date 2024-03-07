import { CGFappearance,CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
    constructor(scene, slices, stacks){

        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var j = 0; j < this.stacks; j++){
            for(var i = 0; i < this.slices; i++){
                var sa=Math.sin(ang);
                var saa=Math.sin(ang+alphaAng);
                var ca=Math.cos(ang);
                var caa=Math.cos(ang+alphaAng);
                this.vertices.push(ca, sa, j/this.stacks);
                this.vertices.push(ca, sa, (j+1)/this.stacks);
                this.vertices.push(caa, saa, j/this.stacks);
                this.vertices.push(caa, saa, (j+1)/this.stacks);
                var base = 4*i+4*j*this.slices;
            
                // original indices
                this.indices.push(base, base + 1, base + 2);
                this.indices.push(base + 1, base + 3, base + 2);

                // additional indices for the other side
                this.indices.push(base, base + 2, base + 1);
                this.indices.push(base + 1, base + 2, base + 3);

                // calculate vectors on the plane
                var v1 = [caa - ca, saa - sa, 0];
                var v2 = [0, 0, 1]; // vector pointing upwards

                // calculate the cross product of v1 and v2
                var normal = [
                    v1[1]*v2[2] - v1[2]*v2[1],
                    v1[2]*v2[0] - v1[0]*v2[2],
                    v1[0]*v2[1] - v1[1]*v2[0]
                ];

                // normalize the normal
                var magnitude = Math.sqrt(normal[0]*normal[0] + normal[1]*normal[1] + normal[2]*normal[2]);
                normal = [normal[0]/magnitude, normal[1]/magnitude, normal[2]/magnitude];

                // push normals for each vertex
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);
                this.normals.push(...normal);

                ang+=alphaAng;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;

    
        this.initGLBuffers();

    }

    updateBuffers(complexity, stackComplexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12
        
        this.stacks = 1 + Math.round(19 * stackComplexity); //complexity varies 0-1, so stacks varies 1-20

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}