import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "../tp2/myParallelogram.js";
import { MyTriangle } from "../tp2/myTriangle.js";
import { MyTriangleBig } from "../tp2/myTriangleBig.js";
import { MyTriangleSmall } from "../tp2/myTriangleSmall.js";
/**
 * scene
 * @constructor
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    }


    updateBuffers(complexity, stackComplexity){
		this.initBuffers()
		this.initNormalVizBuffers();
	}

    display(enableViz) {

            this.scene.pushMatrix();
            let translationMatrix = [1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]

            this.scene.multMatrix(translationMatrix)

            if(enableViz){
                this.diamond.enableNormalViz();
                this.triangle.enableNormalViz();
                this.triangleBig.enableNormalViz();
                this.triangleSmall.enableNormalViz();
                this.parallelogram.enableNormalViz();
            }
            else{
                this.diamond.disableNormalViz();
                this.triangle.disableNormalViz();
                this.triangleBig.disableNormalViz();
                this.triangleSmall.disableNormalViz();
                this.parallelogram.disableNormalViz();
            }

            this.scene.pushMatrix()
            this.scene.translate(2,0,2);
            this.scene.rotate((Math.PI)/4,0,1,0);
            this.scene.setDiffuse(0, 255, 0);
            this.diamond.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(2,0,0.6);
            this.scene.rotate(3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 0, 255);
            this.triangleSmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,-1);
            this.scene.translate(1.3,0,1.5);
            this.scene.rotate(Math.PI/4,0,1,0);
            this.scene.setDiffuse(120, 255, 0);
            this.parallelogram.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.11,0,-0.08);
            this.scene.rotate(-Math.PI/4,0,1,0);
            this.triangleBig.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(-1.52,0,-0.08)
            this.scene.rotate(-3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 255, 230);
            this.triangle.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,1);
            this.scene.translate(-1.52,0,1.33);
            this.scene.rotate(-7*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 120, 255);
            this.triangleBig.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-2.21,0,2.02);
            this.scene.rotate(-3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(120, 0, 20);
            this.triangleSmall.display();
            this.scene.popMatrix();

    }
}
