import { CGFappearance,CGFobject } from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
    constructor(scene,color) {
        super(scene);
        this.color = color || [1.0, 1.0, 1.0, 1.0]; // Default to red if no color provided
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0.5, -0.5, 0,	    //0 
            0.5, 0.5, 0,	    //1
            -0.5, 0.5, 0,	    //2
            -0.5, -0.5, 0,	    //3
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            3, 0, 1,
            3, 1 , 2
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