import { CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

export class MyPollen extends MySphere {
    constructor(scene, slices, stacks) {
        super(scene, slices, stacks);

        this.texture = new CGFtexture(this.scene, "textures/pollen-texture.jpg");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(0, 0, 0, 1);
        this.material.setTexture(this.texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {
        super.initBuffers();

        for (let i = 0; i < this.vertices.length; i += 3) {
            if (this.vertices[i+1] > 0) {
                this.vertices[i+1] *= 1.5;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.material.apply();
        super.display();
    }
}