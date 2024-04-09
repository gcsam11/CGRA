import { CGFappearance, CGFobject} from '../lib/CGF.js';

export class MyPanorama extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius || 1.0;
        this.slices = slices || 50; // Number of horizontal slices
        this.stacks = stacks || 50; // Number of vertical stacks
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Iterate over vertical stacks and horizontal slices to generate vertices and texture coordinates
        for (let stack = 0; stack <= this.stacks; stack++) {
            const theta = stack * Math.PI / this.stacks;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);
        
            for (let slice = 0; slice <= this.slices; slice++) {
                const phi = slice * 2 * Math.PI / this.slices;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);
        
                const x = cosPhi * sinTheta;
                const y = cosTheta;
                const z = sinPhi * sinTheta;
        
                // Calculate inverted normal vector
                const normal = [-x, -y, -z]; // Invert the direction of the normal vector
        
                this.vertices.push(this.radius * x, this.radius * y, this.radius * z);
                this.normals.push(...normal);
                
                const s = 1 - (slice / this.slices); // Calculate s texture coordinate
                const t = 1 - (stack / this.stacks); // Calculate t texture coordinate
                this.texCoords.push(s, t);
            }
        }

        // Generate indices for triangles
        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                const first = (stack * (this.slices + 1)) + slice;
                const second = first + this.slices + 1;

                // Define the indices of the two triangles that form each square
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.initGLBuffers();
    }
}
