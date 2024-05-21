import { CGFobject, CGFtexture, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyPanorama } from './MyPanorama.js';

export class MySky extends CGFobject {
    constructor(scene){
        super(scene);

        this.panorama = new MyPanorama(this.scene, 200, 50, 50);
        this.bladetxt = new CGFtexture(this.scene, "textures/grassblade.jpg");
        this.blade = new CGFappearance(this.scene);
        this.blade.setTexture(this.bladetxt);
        this.blade.setTextureWrap('REPEAT', 'REPEAT');

        // Panorama Texture
        this.sky = new CGFtexture(this.scene, "textures/panorama2.jpg");
        this.skybox = new CGFappearance(this.scene);
        this.skybox.setTexture(this.sky);
        this.skybox.setTextureWrap('REPEAT', 'REPEAT');

        // cloud shaders
        this.cloudShader = new CGFshader(this.scene.gl, "shaders/cloud.vert", "shaders/cloud.frag");
        this.cloudtxt = new CGFtexture(this.scene, "textures/clouds.png");
        this.cloudShader.setUniformsValues({uSampler: 1, uSampler2: 2});

    }
    display() {
        // Panorama
        this.scene.pushMatrix();
        this.skybox.apply();
        this.scene.setActiveShader(this.cloudShader);
        this.sky.bind(1);
        this.cloudtxt.bind(2);
        this.scene.rotate(Math.PI, 1, 0,0);
        this.panorama.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);


    }

    update(t) {
        this.cloudShader.setUniformsValues({ uTime: t });
    }
}