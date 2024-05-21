import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MySphere } from "./MySphere.js";
import { MyGarden } from "./myGarden.js";
import { MyFlower } from "./Flowers/MyFlower.js";
import { MyBee } from "./MyBee.js"
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";
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

    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    // animation
    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime=Date.now(); // current time in milisecs

    this.animVal1=0;

    // Bee Animation values
    this.startVal=0;
    this.endVal=6;
    this.animStartTimeSecs=2;
    this.animDurationSecs=3;
    this.length=(this.endVal-this.startVal);
    this.oKeyPressed = false;
    this.fkeysPressed = false;

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

    this.rockSpawn = new MyRockSpawn(this); 
    this.rockSet = new MyRockSet(this);
    this.rock = new MyRock(this);
    this.grass = new MyGrass(this);
    //Objects connected to MyInterface
    this.displayAxis = true;
    this.speedFactor = 1;
    this.scaleFactor = 1;

    //shaders
    this.grassShader = new CGFshader(this.gl, "shaders/grass.vert", "shaders/grass.frag");
    this.grassShader.setUniformsValues({uTime: 0});

    this.setUpdatePeriod(50);

    //Textures
    this.enableTextures(true);

    // Panorama Texture
    this.sky = new CGFtexture(this, "textures/panorama2.jpg");
    this.skybox = new CGFappearance(this);
    this.skybox.setTexture(this.sky);
    this.skybox.setTextureWrap('REPEAT', 'REPEAT');

    // Plane Texture
    this.planeTexture = new CGFtexture(this,  "textures/grassGroundII.jpg");
    this.planeAppearance = new CGFappearance(this);
    this.planeAppearance.setTexture(this.planeTexture);
    this.planeAppearance.setTextureWrap('REPEAT', 'REPEAT');
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

      if(this.oKeyPressed){
        var distanceToTarget = Math.sqrt(Math.pow(this.bee.x - this.hive.x, 2) + Math.pow(this.bee.y - (this.hive.y+2), 2) + Math.pow(this.bee.z - this.hive.z, 2));
        if(distanceToTarget <= 0.1){
          this.hive.updateThisCurrPollenAdd();
          this.oKeyPressed = false;
        }
      }

      this.grassShader.setUniformsValues({uTime: t/100 % (2*Math.PI)});
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    var fKeysPressed = false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      keysPressed = true;
      this.bee.accelerate();
    }
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      keysPressed = true;
      this.bee.brake();
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
    if (this.gui.isKeyPressed("KeyO")){
      text += " O ";
      keysPressed = true;
      if(this.bee.transportToHive(this.hive.x, this.hive.y+2, this.hive.z)){
        this.oKeyPressed = true;
      }
      else{
        text += "\n Couldn't perform animation";
      }
    }
    if(this.gui.isKeyPressed("KeyF")){
      text += " F ";
      keysPressed = true;
      if(this.bee.findClosestFlower(this.garden)){
        this.fKeysPressed = true;
      }
      else{
        text += "\n Couldn't perform animation";
      }
    }
    if(this.gui.isKeyPressed("KeyP")){
      text += " P ";
      keysPressed = true;
      if(this.fKeysPressed){
        this.bee.waitingForP = true;
        this.bee.speedVector = this.bee.previousSpeedVector;
        this.fKeysPressed = false;
      }
    }
    if (keysPressed)
      console.log(text);
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

    
    // Panorama
    this.pushMatrix();
    this.skybox.apply();
    this.rotate(Math.PI, 1, 0,0);
    this.panorama.display();
    this.popMatrix();

    // Plane
    this.pushMatrix();
    this.planeAppearance.apply();
    this.translate(0, -1, 0);
    this.scale(300, 1, 300);
    this.rotate(-Math.PI/2, 1, 0, 0);
    this.plane.display();
    this.popMatrix();
    
    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.setActiveShader(this.grassShader);
    this.grass.display();
    this.popMatrix();

    this.pushMatrix();
    this.setActiveShader(this.defaultShader);
    this.rockSpawn.display();
    this.popMatrix();

    // Flowers
    this.pushMatrix();
    this.garden.display();
    this.popMatrix();

    // Hive
    this.pushMatrix();
    this.hive.display();
    this.popMatrix();

    this.pushMatrix(); 
    this.scale(2,2,2);
    this.translate(10, 0, 0);
    this.rockSet.display();
    this.popMatrix();

    // Bee
    this.pushMatrix();
    this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
    this.bee.display();
    this.popMatrix();

    // ---- END Primitive drawing section
  }
}
