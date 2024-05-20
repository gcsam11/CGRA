import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./myGarden.js";
import { MyFlower } from "./Flowers/MyFlower.js";
import { MyRock } from "./MyRock.js";
import {MyRockSpawn} from "./MyRockSpawn.js";
import {MyRockSet} from "./MyRockSet.js";
import { MyGrass } from "./MyGrass.js";

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
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this, 200);
    this.sphere = new MySphere(this, 30);
    this.garden = new MyGarden(this);
    this.flower = new MyFlower(this);
    this.rockSpawn = new MyRockSpawn(this); 
    this.rockSet = new MyRockSet(this);
    this.rock = new MyRock(this);
    this.grass = new MyGrass(this);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    //shaders
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
    this.grassShader.setUniformsValues({uTime: 0});

    this.setUpdatePeriod(100);

    //Textures
    this.enableTextures(true);

    this.texture = new CGFtexture(this, "textures/grassGroundII.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.sky = new CGFtexture(this, "textures/panorama2.jpg");
    this.skybox = new CGFappearance(this);
    this.skybox.setTexture(this.sky);
    this.skybox.setTextureWrap('REPEAT', 'REPEAT');

    this.eye = new CGFtexture(this, "textures/eye.jpg");
    this.eyeball = new CGFappearance(this);
    this.eyeball.setTexture(this.eye);
    this.eyeball.setTextureWrap('REPEAT', 'REPEAT');


  }
  initLights() {
    this.lights[0].setPosition(15, 70, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.8, 0.8, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {
    this.grassShader.setUniformsValues({uTime: t/100 % (2*Math.PI)});
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
    

    /*this.pushMatrix();
    this.eyeball.apply();
    this.sphere.display();
    this.popMatrix();*/

    /*this.pushMatrix();
    this.skybox.apply();
    this.rotate(Math.PI, 1, 0,0);
    this.panorama.display();
    this.popMatrix();
    
    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-3,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.pushMatrix();
    this.translate(-50, -50, -50);
    this.garden.display();
    this.popMatrix();
    
    //this.flower.display();
    this.setActiveShader(this.grassShader);
    this.grass.display();
    this.setActiveShader(this.defaultShader);
    this.rockSpawn.display();*/

    this.rockSet.display();

    // ---- END Primitive drawing section
  }
}
