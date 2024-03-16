import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./myParallelogram.js";
import { MyTriangle } from "./myTriangle.js";
import { MyTriangleBig } from "./myTriangleBig.js";
import { MyTriangleSmall } from "./myTriangleSmall.js";
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
        this.triangleBig2 = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.1, 0.1, 0.1, 1);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
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
            this.material.apply();
            this.diamond.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(2,0,0.6);
            this.scene.rotate(3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 0, 255);
            this.material.apply();
            var coords = [
                0, 0,
                0, 0.5,
                0.25, 0.25,
                0, 0,
                0, 0.5,
                0.25, 0.25,
            ];
            this.triangleSmall.updateTexCoords(coords);
            this.triangleSmall.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,-1);
            this.scene.translate(1.3,0,1.5);
            this.scene.rotate(Math.PI/4,0,1,0);
            this.scene.setDiffuse(120, 255, 0);
            this.material.apply();
            this.parallelogram.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.11,0,-0.08);
            this.scene.scale(1,1,1);
            this.scene.rotate(-Math.PI/4,0,1,0);
            this.material.apply();
            this.triangleBig.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
            this.scene.translate(-1.52,0,-0.08)
            this.scene.rotate(-3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 255, 230);
            this.material.apply();
            this.triangle.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.scale(1,1,1);
            this.scene.translate(-1.52,0,1.33);
            this.scene.rotate(-7*Math.PI/4,0,1,0);
            this.scene.setDiffuse(0, 120, 255);
            this.material.apply();
            var coords2 = [
                1, 1,
                0.5, 0.5,
                1, 0,
                1, 1,
                0.5, 0.5,
                1, 0,
            ];
            this.triangleBig2.updateTexCoords(coords2);
            this.triangleBig2.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-2.21,0,2.02);
            this.scene.rotate(-3*Math.PI/4,0,1,0);
            this.scene.setDiffuse(120, 0, 20);
            this.material.apply();
            var coords = [
                0.25, 0.75,
                0.75, 0.75,
                0.5, 0.5,
                0.25, 0.75,
                0.75, 0.75,
                0.5, 0.5,
            ];
            this.triangleSmall.updateTexCoords(coords);
            this.triangleSmall.display();
            this.scene.popMatrix();
    }
}
