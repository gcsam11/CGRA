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
			-0.5, -0.5, 0.5, //0 - BFL -> Bottom Front Left
			0.5, -0.5, 0.5, //1 - BFR -> Bottom Front Right
			-0.5, 0.5, 0.5, //2 - TFL -> Top Front Left
			0.5, 0.5, 0.5, //3 - TFR -> Top Front Right

			-0.5, -0.5, -0.5, //4 - BBL -> Bottom Back Left
			0.5, -0.5, -0.5, //5 - BBR -> Bottom Back Right
			-0.5, 0.5, -0.5, //6 - TBL -> Top Back Left
			0.5, 0.5, -0.5, //7 - TBR -> Top Back Right

			0.5, -0.5, 0.5, //8 - BRF -> Bottom Right Front
			0.5, -0.5, -0.5, //9 - BRB -> Bottom Right Back
			0.5, 0.5, 0.5, //10 - TRF -> Top Right Front
			0.5, 0.5, -0.5, //11 - TRB -> Top Right Back

			-0.5, -0.5, 0.5, //12 - BLF -> Bottom Left Front
			-0.5, -0.5, -0.5, //13 - BLB -> Bottom Left Back
			-0.5, 0.5, 0.5, //14 - TLF -> Top Left Front
			-0.5, 0.5, -0.5, //15 - TLB -> Top Left Back

			0.5, 0.5, 0.5, //16 - TFRF -> Top Face Right Front
			0.5, 0.5, -0.5, //17 - TFRB -> Top Face Right Back
			-0.5, 0.5, 0.5, //18 - TFLF -> Top Face Left Front
			-0.5, 0.5, -0.5, //19 - TFLB -> Top Face Left Back

			0.5, -0.5, 0.5, //20 - BFRF -> Bottom Face Right Front
			0.5, -0.5, -0.5, //21 - BFRB -> Bottom Face Right Back
			-0.5, -0.5, 0.5, //22 - BFLF -> Bottom Face Left Front
			-0.5, -0.5, -0.5 //23 - BFLB -> Bottom Face Left Back
		];

		//Counter-clockwise reference of vertices
		this.indices = [

			0, 1, 2,
			3, 2, 1,

			4, 5, 6,
			7, 6, 5,

			8, 9, 10,
			11, 10, 9,

			12, 13, 14,
			15, 14, 13,

			16, 17, 18,
			19, 18, 17,

			20, 21, 22,
			23, 22, 21

		];
		
		this.normals = [
			0, 0, 1, //0
			0, 0, 1, //1
			0, 0, 1, //2
			0, 0, 1, //3

			0, 0, -1, //4
			0, 0, -1, //5
			0, 0, -1, //6
			0, 0, -1, //7

			1, 0, 0, //8
			1, 0, 0, //9
			1, 0, 0, //10
			1, 0, 0, //11

			-1, 0, 0, //12
			-1, 0, 0, //13
			-1, 0, 0, //14
			-1, 0, 0, //15

			0, 1, 0, //16
			0, 1, 0, //17
			0, 1, 0, //18
			0, 1, 0, //19

			0, -1, 0, //20
			0, -1, 0, //21
			0, -1, 0, //22
			0, -1, 0 //23
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

	
    display(enableViz) {
        super.display();
      }
}