import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./myTriangle.js";
import { MyParallelogram } from "./myParallelogram.js";
import { MyTriangleSmall } from "./myTriangleSmall.js";
import { MyTriangleBig } from "./myTriangleBig.js";
import { MyTangram } from "./myTangram.js";
import { MyUnitCube } from "./myUnitCube.js";
import { MyQuad } from "./MyQuad.js";
import { MyUnitCubeQuad } from "./myUnitCubeQuad.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    this.triangleSmall = new MyTriangleSmall(this);
    this.triangleBig = new MyTriangleBig(this, [1.0, 0.0, 0.0, 1.0]);
    this.tangram = new MyTangram(this);
    this.unitcube = new MyUnitCube(this);
    this.quad = new MyQuad(this);
    this.cubeQuad = new MyUnitCubeQuad(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
    this.displayTriangle = true;
    this.displayParallelogram = true;
    this.displayTriangleSmall = true;
    this.displayTriangleBig = true;
    this.displaytangram = true;
    this.displayUnitCube = false;
    this.displayQuad = true;
    this.displayCubeQuad = true;
    this.scaleFactor = 1;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

    /*if(this.displayDiamond){
      this.pushMatrix()
      this.translate(2,0,2);
      this.rotate((Math.PI)/4,0,1,0);
      this.diamond.display();
      this.popMatrix();
    }

    if(this.displayTriangleSmall){
      this.pushMatrix();
      this.translate(2,0,0.6);
      this.rotate(3*Math.PI/4,0,1,0);
      this.triangleSmall.display();
      this.popMatrix();
    }

    if(this.displayParallelogram){
      this.pushMatrix();
      this.scale(1,1,-1);
      this.translate(1.3,0,1.5);
      this.rotate(Math.PI/4,0,1,0);
      this.parallelogram.display();
      this.popMatrix();
    }

    if(this.displayTriangleBig){
      this.pushMatrix();
      this.translate(-0.11,0,-0.08);
      this.rotate(-Math.PI/4,0,1,0);
      this.triangleBig.display();
      this.popMatrix();
    }

    if(this.displayTriangle){
      this.pushMatrix();
      this.translate(-1.52,0,-0.08)
      this.rotate(-3*Math.PI/4,0,1,0);
      this.triangle.display();
      this.popMatrix();
    }

    if(this.displayTriangleBig){
      this.pushMatrix();
      this.scale(-1,1,1)
      this.translate(1.52,0,1.33);
      this.rotate(-Math.PI/4,0,1,0);
      this.triangleBig.display();
      this.popMatrix();
    }

    if(this.displayTriangleSmall){
      this.pushMatrix();
      this.translate(-2.21,0,2.02);
      this.rotate(-3*Math.PI/4,0,1,0);
      this.triangleSmall.display();
      this.popMatrix();
    }*/

    if(this.displaytangram){
      this.translate(0.1,0,0);
      this.tangram.display();
    }

    /*if(this.displayQuad){
      this.pushMatrix();
      this.translate(-0.124, -3.53, 4);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }
    if(this.displayQuad){
      this.pushMatrix();
      this.translate(-0.124, -3.53, -3);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }
    if(this.displayQuad){
      this.pushMatrix();
      this.rotate(Math.PI/2, 0,1,0);
      this.translate(-0.5, -3.53, 3.376);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }
    if(this.displayQuad){
      this.pushMatrix();
      this.rotate(Math.PI/2, 0,1,0);
      this.translate(-0.5, -3.53, -3.62);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }
    if(this.displayQuad){
      this.pushMatrix();
      this.rotate(-Math.PI/2, 1,0,0);
      this.translate(-0.124, -0.490, -0.025);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }
    if(this.displayQuad){
      this.pushMatrix();
      this.rotate(-Math.PI/2, 1,0,0);
      this.translate(-0.124, -0.490, -7);
      this.scale(7, 7, 7);
      this.quad.display();
      this.popMatrix();
    }*/

    if(this.displayCubeQuad){
      this.cubeQuad.display();
    }

    if(this.displayUnitCube){
      this.pushMatrix();
      this.rotate(3 * Math.PI / 2, 1, 0, 0);
      this.translate(-0.124,-0.5, -3.53);
      this.scale(7, 7, 7);
      this.unitcube.display();
      this.popMatrix();
    }



    // ---- END Primitive drawing section
  }
}
