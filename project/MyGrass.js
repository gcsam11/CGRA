import { CGFobject, CGFtexture, CGFappearance } from '../lib/CGF.js';
import { MyGrassBlade } from './MyGrassBlade.js';

export class MyGrass extends CGFobject {
    constructor(scene, grassBlades){
        super(scene);
        this.grassBlades = grassBlades || 400;
        this.positions = [];
        this.sizes = [];

        for (var i = 0; i < this.grassBlades; i++) {
            this.positions.push([Math.random() * 50 -25 , Math.random() * 50-25]);
            this.sizes.push(Math.random() * 0.5 + 0.5);
        }
        this.grassblade = new MyGrassBlade(this.scene);

        this.bladetxt = new CGFtexture(this.scene, "textures/grassblade.jpg");
        this.blade = new CGFappearance(this.scene);
        this.blade.setTexture(this.bladetxt);
        this.blade.setTextureWrap('REPEAT', 'REPEAT');

    }
    display() {
        for (var i = 0; i < this.grassBlades; i++) {
            this.scene.pushMatrix();
            this.blade.apply();
            this.scene.translate(this.positions[i][0], 0, this.positions[i][1]);
            this.scene.scale(this.sizes[i], this.sizes[i], this.sizes[i]);
            this.grassblade.display();
            this.scene.popMatrix();
        }
    }
}
