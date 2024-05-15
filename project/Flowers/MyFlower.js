import { CGFappearance, CGFobject} from '../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyLeaf } from './MyLeaf.js';

export class MyFlower extends CGFobject {
    constructor(scene, externalRadius, receptacleRadius, petalUpperAngle, petalLowerAngle, petalNumber, stemSize, stemRadius, petalColor, stemColor, receptacleColor, leafColor, stemLength) {
        super(scene);
        // Define maximum values
        const maxExternalRadius = 4;
        const maxReceptacleRadius = 2;
        const maxPetalUpperAngle = 90;
        const maxPetalLowerAngle = 90;
        const maxPetalNumber = 12;
        const maxStemSize = 4;
        const maxStemRadius = 0.5;

        // Check and set maximum values
        this.receptacleRadius = Math.min(receptacleRadius || 1, maxReceptacleRadius);
        this.petalHeight = Math.min(externalRadius || 2.5, maxExternalRadius) - this.receptacleRadius;
        this.petalUpperAngle = Math.min(petalUpperAngle || 70, maxPetalUpperAngle) * Math.PI / 180;
        this.petalLowerAngle = Math.min(petalLowerAngle || 70, maxPetalLowerAngle) * Math.PI / 180;
        this.petalNumber = Math.min(petalNumber || 6, maxPetalNumber);
        this.stemSize = Math.min(stemSize || 2, maxStemSize);
        this.stemRadius = Math.min(stemRadius || 0.1, maxStemRadius);
        this.petalColor = petalColor || [1, 0, 0, 1] ; //red
        this.stemColor = stemColor || [0, 1, 0, 1]; //green
        this.receptacleColor = receptacleColor || [1, 1, 0, 1]; //yellow
        this.leafColor = leafColor || [0, 1, 0, 1]; //green
        this.stemLength = stemLength || 1;

        this.receptacle = new MyReceptacle(this.scene, this.receptacleRadius, this.receptacleColor);
        this.petal = new MyPetal(this.scene, this.petalUpperAngle, this.petalLowerAngle, this.petalHeight, this.petalColor);
        this.stem = new MyStem(this.scene, this.stemRadius, this.stemColor, this.leafColor, this.stemLength);
        this.myLeaf = new MyLeaf(this.scene, this.leafColor);

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
    }

    display() {

        //this.receptacle.display();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.receptacleRadius-0.1);
        this.stem.display();
        this.scene.popMatrix();
        var stemAngle = 80 * Math.PI / 180;
        var y = 0;

        var stemHeight = this.stemLength; // Each stack represents a portion of the stem's height
        for (var i = 1; i < 3; i++) {
            // Calculate the new y and z coordinates
            if(i != 1){
                y += Math.cos(stemAngle);
            }
            var z = (this.receptacleRadius + (stemHeight * i) - 0.1) * Math.sin(stemAngle);
            this.scene.pushMatrix();
            this.scene.translate(0, -y, z);
            this.scene.rotate(-stemAngle, 1, 0, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.stem.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(0, -y, z);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.myLeaf.display();
            this.scene.popMatrix();
        }

        var maxAng = 360 / this.petalNumber;
        for (var i = 0; i < this.petalNumber; i++) {
            this.scene.pushMatrix();
            this.scene.rotate(maxAng * i * Math.PI / 180, 0, 1, 0);
            //this.petal.display();
            this.scene.popMatrix();
        }
    }
}
