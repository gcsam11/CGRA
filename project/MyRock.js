import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';

export class MyRock extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius || 1.0;
        this.slices = slices || 20; // Number of horizontal slices
        this.stacks = stacks || 5; // Number of vertical stacks
        this.initBuffers();
    }

    
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

    
        const roughness = 0.15; 
    
        for (var stack = 0; stack <= this.stacks; stack++) {
            const phi = (stack * Math.PI) / this.stacks;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
    
            for (var slice = 0; slice <= this.slices; slice++) {
                const theta = (slice * 2 * Math.PI) / this.slices;
                const x = this.radius * Math.cos(theta) * sinPhi + (Math.random() - 0.5) * roughness;
                const y = this.radius * cosPhi * 0.4 + (Math.random() - 0.5) * roughness;
                const z = this.radius * Math.sin(theta) * sinPhi + (Math.random() - 0.5) * roughness;
    
                this.vertices.push(x, y, z);
                this.normals.push(x / this.radius, y / this.radius, z / this.radius);
    
                const s = 1 - slice / this.slices;
                const t = 1 - stack / this.stacks;
                this.texCoords.push(s, t);
            }
        }
    
        for (var stack = 0; stack < this.stacks; stack++) {
            for (var slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;
                
                if (slice === this.slices - 1) {
                    this.indices.push(second, first, stack * (this.slices + 1));
                    this.indices.push((stack + 1) * (this.slices + 1), second, stack * (this.slices + 1));
                } else {
                    this.indices.push(second, first, first + 1);
                    this.indices.push(second + 1, second, first + 1);
                }
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
    
}
