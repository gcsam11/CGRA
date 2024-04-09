import { CGFobject } from '../lib/CGF.js';


export class MySphere extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius || 1.0;
        this.slices = slices || 20; // Number of horizontal slices
        this.stacks = stacks || 20; // Number of vertical stacks
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            const phi = (stack * Math.PI) / this.stacks;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);

            for (let slice = 0; slice <= this.slices; slice++) {
                const theta = (slice * 2 * Math.PI) / this.slices;
                const x = this.radius * Math.cos(theta) * sinPhi;
                const y = this.radius * cosPhi;
                const z = this.radius * Math.sin(theta) * sinPhi;

                this.vertices.push(x, y, z);
                this.normals.push(x / this.radius, y / this.radius, z / this.radius);

                const s = 1 - slice / this.slices;
                const t = 1 - stack / this.stacks;
                this.texCoords.push(s, t);
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = stack * (this.slices + 1) + slice;
                const second = first + this.slices + 1;

                this.indices.push(second, first, first + 1);
                this.indices.push(second+1, second, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
