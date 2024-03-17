import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';


export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, 
        side1 = 'images/default.png', 
        side2 = 'images/default.png', 
        side3 = 'images/default.png', 
        side4 = 'images/default.png', 
        top = 'images/default.png'
        , bottom = 'images/default.png') {

        super(scene);
        this.quad = new MyQuad(this.scene);

        this.side1 = new CGFtexture(this.scene, side1);
        this.side2 = new CGFtexture(this.scene, side2);
        this.side3 = new CGFtexture(this.scene, side3);
        this.side4 = new CGFtexture(this.scene, side4);
        this.top = new CGFtexture(this.scene, top);
        this.bottom = new CGFtexture(this.scene, bottom);

        this.material = new CGFappearance(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-0.124, -3.53, 4);
        this.scene.scale(7, 7, 7);
        this.material.setTexture(this.side1);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.124, -3.53, -3);
        this.scene.scale(-7, 7, 7);
        this.material.setTexture(this.side2);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.translate(-0.5, -3.53, 3.376);
        this.scene.scale(7, 7, 7);
        this.material.setTexture(this.side3);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.scene.translate(-0.5, -3.53, -3.62);
        this.scene.scale(-7, 7, 7);
        this.material.setTexture(this.side4);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.scene.translate(-0.124, -0.490, -0.025);
        this.scene.scale(7, 7, 7);
        this.material.setTexture(this.top);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.scene.translate(-0.124, -0.490, -7);
        this.scene.scale(7, -7, 7);
        this.material.setTexture(this.bottom);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display();
        this.scene.popMatrix();
    }
}