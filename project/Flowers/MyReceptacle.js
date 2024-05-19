import { CGFappearance, CGFobject, CGFtexture} from '../../lib/CGF.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius, color, slices, stacks) {
        super(scene);
        this.radius = radius || 0.5;
        this.slices = slices || 20; // Number of horizontal slices
        this.stacks = stacks || 10; // Number of vertical stacks
        this.color = color;
        this.receptacleTexture = new CGFtexture(this.scene, 'textures/flowerCentre.jpg');
        this.receptacleMaterial = new CGFappearance(this.scene);
        this.receptacleMaterial.setTexture(this.receptacleTexture);
        this.receptacleMaterial.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.receptacleMaterial.setAmbient(...this.color);
        this.receptacleMaterial.setDiffuse(...this.color);
        this.receptacleMaterial.setSpecular(...this.color);
        this.receptacleMaterial.setShininess(10.0);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        
        for (let stack = 0; stack <= this.stacks / 2 + 1; stack++) { // Only go up to half the stacks
            const phi = (stack * Math.PI) / this.stacks;
            const cosPhi = Math.cos(phi);
            const sinPhi = Math.sin(phi);
        
            for (let slice = 0; slice <= this.slices; slice++) {
                const theta = (slice * 2 * Math.PI) / this.slices + 1;
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
        
        for (var stack = 0; stack < this.stacks; stack++) {
            for (var slice = 0; slice < this.slices; slice++) {
                const first = (stack * (this.slices + 1)) + slice;
                const second = first + this.slices + 1;
        
                // Create two triangles for each square in the grid
                // Triangle for one side
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
        
                // Triangle for the other side
                this.indices.push(first + 1, second, first);
                this.indices.push(first + 1, second + 1, second);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display(){
        this.receptacleMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(1, 0.5, 1); // Scale the sphere in the y-axis to half its size
        super.display();
        this.scene.popMatrix();
    }
}
