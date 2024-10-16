import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 1, 0,	//0
			1, 1, -1,	//1
			1, 1, 0,	//2
            2, 1, -1,    //3
            2, 1, 0,    //4
            3, 1, -1,    //5
		];

        this.vertices = this.vertices.concat(this.vertices);

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 1, 0,
            1, 3, 2,
            2, 3, 1,
            2, 3, 4,
            4, 3, 2,
            3, 5, 4,
            4, 5, 3
		];

        this.indices = this.indices.map(index => index + 6);

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

