import { CGFappearance, CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene, color) {
        super(scene);
        this.color = color || [1.0, 0.0, 0.0, 1.0]; // Default to red if no color provided
        this.initBuffers();
    }
    
	initBuffers() {
		this.vertices = [
			-2, 0, 0, 	//0
			0, 0, -2,	//1
			2, 0, 0,	//2
			-2, 0, 0, 	//3
			0, 0, -2,	//4
			2, 0, 0,	//5
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            5, 4, 3,
		];

		this.normals = [
			0, -1, 0,    //0
			0, -1, 0,	//1
			0, 1, 0,	//2
			0, -1, 0,	//3
			0, -1, 0,	//4
			0, -1, 0,	//5
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(...this.color);
        this.material.setDiffuse(...this.color);
        this.material.setSpecular(...this.color);
        this.material.setShininess(10.0);

		this.initGLBuffers();
	}

    display() {
        this.material.apply();
        super.display();
      }
}
