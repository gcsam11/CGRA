import { CGFappearance, CGFobject } from '../../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, upperAngle, lowerAngle, height, color) {
        super(scene);
        this.upperAngle = upperAngle;
        this.lowerAngle = lowerAngle;
        this.height = height;
        this.color = color;
        this.material = new CGFappearance(this.scene);
        this.initBuffers();
    }

    initBuffers() {
        var cosUpperAngle = -Math.cos(this.upperAngle);
        var cosLowerAngle = Math.cos(this.lowerAngle);

        this.vertices = [
            0.5, cosLowerAngle, this.height, // 0
            -0.5, cosLowerAngle, this.height, // 1
            0, cosUpperAngle+cosLowerAngle, -1+this.height, // 2
            0.5, cosLowerAngle, this.height, // 3
            -0.5, cosLowerAngle, this.height, // 4
            0, 0, 1+this.height, // 5
            0.5, cosLowerAngle, this.height, // duplicated vertex 6 
            -0.5, cosLowerAngle, this.height, // duplicated vertex 7
            0, cosUpperAngle+cosLowerAngle, -1+this.height, // duplicated vertex 8
            0.5, cosLowerAngle, this.height, // duplicated vertex 9 
            -0.5, cosLowerAngle, this.height, // duplicated vertex 10
            0, 0, 1+this.height, // duplicated vertex 11
        ];
        
        this.indices = [
            0, 1, 2, // first triangle front
            3, 5, 4, // second triangle front
            2, 1, 0, // first triangle back
            4, 5, 3, // second triangle back
        ];

        this.normals = [];

        // Store the normals in temporary arrays first
        var normal1 = [];
        var normal2 = [];
        var normal1_back = [];
        var normal2_back = [];

       // Calculate the vectors for the edges of the first triangle (front face)
        var v1 = [
            this.vertices[0] - this.vertices[6],
            this.vertices[1] - this.vertices[7],
            this.vertices[2] - this.vertices[8]
        ];
        var v2 = [
            this.vertices[3] - this.vertices[6],
            this.vertices[4] - this.vertices[7],
            this.vertices[5] - this.vertices[8]
        ];

        // Calculate the normal for the first triangle (front face)
        normal1 = [
            v1[1] * v2[2] - v1[2] * v2[1],
            v1[2] * v2[0] - v1[0] * v2[2],
            v1[0] * v2[1] - v1[1] * v2[0]
        ];

        normal1_back = [-normal1[0],
                        -normal1[1],
                        -normal1[2]
                    ];

        // Calculate the vectors for the edges of the second triangle (front face)
        var v3 = [
            this.vertices[9] - this.vertices[15],
            this.vertices[10] - this.vertices[16],
            this.vertices[11] - this.vertices[17]
        ];
        var v4 = [
            this.vertices[12] - this.vertices[15],
            this.vertices[13] - this.vertices[16],
            this.vertices[14] - this.vertices[17]
        ];

        // Calculate the normal for the second triangle (front face)
        normal2 = [
            v3[1] * v4[2] - v3[2] * v4[1],
            v3[2] * v4[0] - v3[0] * v4[2],
            v3[0] * v4[1] - v3[1] * v4[0]
        ];

        normal2_back = [-normal2[0],
                        -normal2[1],
                        -normal2[2]
                    ];

        // Push the normals to the normals array
        this.normals.push(...normal1);
        this.normals.push(...normal1);
        this.normals.push(...normal1);

        this.normals.push(...normal2);
        this.normals.push(...normal2);
        this.normals.push(...normal2);

        this.normals.push(...normal1_back);
        this.normals.push(...normal1_back);
        this.normals.push(...normal1_back);

        this.normals.push(...normal2_back);
        this.normals.push(...normal2_back);
        this.normals.push(...normal2_back);
       
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.material.setAmbient(...this.color);
        this.material.setDiffuse(...this.color);
        this.material.setSpecular(...this.color);
        this.material.setShininess(10.0);
    
        this.initGLBuffers();
        
    }

    display(){
        this.material.apply();
        super.display();
    }
}
