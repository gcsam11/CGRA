import {CGFappearance,CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //1 - BFR
			-0.5, 0.5, 0.5,	    //2 - TPF
            0.5, 0.5, 0.5,	    //3 - TPR
            -0.5, -0.5, -0.5,	//4 - BBL
			0.5, -0.5, -0.5,	//5 - BBR
			-0.5, 0.5, -0.5,	//6 - TPL
            0.5, 0.5, -0.5,	    //7 - TPR
			-0.5, -0.5, 0.5,	//8 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //9 - BFR
			-0.5, 0.5, 0.5,	    //10 - TPF
            0.5, 0.5, 0.5,	    //11 - TPR
            -0.5, -0.5, -0.5,	//12 - BBL
			0.5, -0.5, -0.5,	//13 - BBR
			-0.5, 0.5, -0.5,	//14 - TPL
            0.5, 0.5, -0.5,	    //15 - TPR
			-0.5, -0.5, 0.5,	//16 -  BFL -> Bottom Front Left
			0.5, -0.5, 0.5,	    //17 - BFR
			-0.5, 0.5, 0.5,	    //18 - TPF
            0.5, 0.5, 0.5,	    //19 - TPR
            -0.5, -0.5, -0.5,	//20 - BBL
			0.5, -0.5, -0.5,	//21 - BBR
			-0.5, 0.5, -0.5,	//22 - TPL
            0.5, 0.5, -0.5	    //23 - TPR
		];

		//Counter-clockwise reference of vertices
		this.indices = [

			2, 3, 6,
			7, 6, 3,

			5, 1, 0,
			4, 5, 0,

			1, 5, 3,
			7, 3, 5,

			2, 4, 0,
			4, 2, 6,

			3, 2, 0,
			1, 3, 0,

			5, 4, 7,
			6, 7, 4

		];
		
		this.normals = [
			0, 0, 1, //0
			0, 0, 1, //1
			0, 0, 1, //2
			0, 0, 1, //3
			0, 0,-1, //4
			0, 0,-1, //5
			0, 0,-1, //6
			0, 0,-1, //7
			-1, 0, 0, //8
			1, 0, 0, //9
			0, 1, 0, //10
			0, 1, 0, //11
			-1, 0, 0, //12
			1, 0, 0, //13
			-1, 0, 0, //14
			1, 0, 0, //15
			0, -1, 0, //16
			0, -1, 0, //17
			-1, 0, 0, //18
			1, 0, 0, //19
			0, -1, 0, //20
			0, -1, 0, //21
			0, 1, 0, //22
			0, 1, 0  //23
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	updateBuffers(complexity){
		this.initBuffers()
		this.initNormalVizBuffers();
	}

	
    display() {
        super.display();
      }
}