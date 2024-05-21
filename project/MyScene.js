import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./myGarden.js";
import { MyFlower } from "./Flowers/MyFlower.js";
import { MyBee } from "./MyBee.js"
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";

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

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    // animation
    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime=Date.now(); // current time in milisecs

    this.animVal1=0;
    this.animVal2=0;
    this.animVal3=0;

    // Bee Animation values
    this.startVal=0;
    this.endVal=6;
    this.animStartTimeSecs=2;
    this.animDurationSecs=3;
    this.length=(this.endVal-this.startVal);

    this.beeSpeedVector = {x: 0, y: 0, z: 0};

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this, 200);
    this.sphere = new MySphere(this, 30);
    this.garden = new MyGarden(this);
    this.flower = new MyFlower(this);
    this.bee = new MyBee(this);
    this.pollen = new MyPollen(this);
    this.hive = new MyHive(this, 3);

    // Animated Objects
    this.animObjs = [this.bee];
    this.numAnimObjs = 1;

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.speedFactor = 1;
    this.scaleFactor = 1;

    this.enableTextures(true);

    this.texture = new CGFtexture(this, "textures/terrain.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    // Panorama Texture
    this.sky = new CGFtexture(this, "textures/panorama2.jpg");
    this.skybox = new CGFappearance(this);
    this.skybox.setTexture(this.sky);
    this.skybox.setTextureWrap('REPEAT', 'REPEAT');

  }
  updateSpeedFactor(){
    this.bee.updateSpeedFactor(this.speedFactor);
  }
  update(t)
  {
      this.checkKeys();
      // Update without considering time - BAD
      this.animVal1+=0.1;

      //#region Ex.2 
      // Continuous animation based on current time and app start time 
      var timeSinceAppStart=(t-this.appStartTime)/1000.0;

      //#region Ex. 4 
      // delegate animations to objects
      for (var i=0;i<this.numAnimObjs;i++)
        this.animObjs[i].update(timeSinceAppStart);
      //#endregion
      //#endregion
      //#endregion
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
      if(this.bee.direction == 1){
        this.bee.accelerate();
      }
      else if(this.bee.direction == -1){
        this.bee.brake();
      }
      else{
        this.bee.accelerate();
      }
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      if(this.bee.direction == 1){
        this.bee.brake();
      }
      else if(this.bee.direction == -1){
        this.bee.accelerate();
      }
      else{
        this.bee.brake();
      }
    }
    if(this.gui.isKeyPressed("KeyA")){
      text += " A ";
      keysPressed = true;
      this.bee.turnLeft();
    }
    if(this.gui.isKeyPressed("KeyD")){
      text += " D ";
      keysPressed = true;
      this.bee.turnRight();
    }
    if( this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      keysPressed = true;
      this.bee.resetPos();
    }
    if (keysPressed)
      console.log(text);
  }  
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
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

/*  // Panorama
    this.pushMatrix();
    this.skybox.apply();
    this.rotate(Math.PI, 1, 0,0);
    this.panorama.display();
    this.popMatrix();
    
    // ---- BEGIN Primitive drawing section

    // Plane
    /*this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    // Flowers
    /*this.pushMatrix();
    this.translate(-50, -50, -50);
    this.garden.display();
    this.popMatrix();*/
    
    // Bee
    this.pushMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
