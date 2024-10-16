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
			0, 0, 0,	//0
			1, 0, -1,	//1
			1, 0, 0,	//2
            2, 0, -1,   //3
            2, 0, 0,    //4
            3, 0, -1,   //5
			0, 0, 0,	//6
			1, 0, -1,	//7
			1, 0, 0,	//8
            2, 0, -1,   //9
            2, 0, 0,    //10
            3, 0, -1,   //11
		];

		this.texCoords = [
			0.25, 0.75,
			0.5, 1,
			0.5, 0.75,
			0.75, 1,
			0.75, 0.75,
			1, 1,
			0.25, 0.75,
			0.5, 1,
			0.5, 0.75,
			0.75, 1,
			0.75, 0.75,
			1, 1,
		];

        //this.vertices = this.vertices.concat(this.vertices);

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,
            8, 7, 6,
            1, 3, 2,
            8, 9, 7,
            2, 3, 4,
            10, 9, 8,
            3, 5, 4,
            10, 11, 9
		];

        this.indices = this.indices.map(index => index + 6);

		this.normals = [
			0, -1, 0,    //0
			0, -1, 0,	//1
			0, -1, 0,	//2
			0, -1, 0,	//3
			0, -1, 0,	//4
			0, -1, 0,	//5
			0, 1, 0,	//6
			0, 1, 0,	//7
			0, 1, 0,	//8
			0, 1, 0,	//9
			0, 1, 0,	//10
			0, 1, 0,	//11
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

