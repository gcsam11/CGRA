import {CGFobject} from '../../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, leafMaterial) {
		super(scene);
        this.leafMaterial = leafMaterial || null;
		this.initBuffers();
	}
	
initBuffers() {
    this.vertices = [
        -1, 0, 0,   //0
        1, 0, 0,    //1
        0, 0, -1,   //2
        -1, 0, 0,   //3
        1, 0, 0,    //4
        0, 0, -1,   //5
    ];

    //Counter-clockwise reference of vertices
    this.indices = [
        0, 1, 2,
        5, 4, 3,          
    ];

    this.normals = [
        0, 1, 0,    //0
        0, 1, 0,    //1
        0, 1, 0,    //2
        0, -1, 0,   //3
        0, -1, 0,   //4
        0, -1, 0,   //5
    ];

    this.texCoords = [
        0, 0,    //0
        1, 0,    //1
        0.5, 1,  //2
        0, 0,    //3
        1, 0,    //4
        0.5, 1,  //5
    ];

    //The defined indices (and corresponding vertices)
    //will be read in groups of three to draw triangles
    this.primitiveType = this.scene.gl.TRIANGLES;

    this.initGLBuffers();
}
display(){
    if(this.leafMaterial != null){
        this.leafMaterial.apply();
    }

    super.display();
}
}
