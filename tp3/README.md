# CG 2023/2024

## Group T07G09

## TP 3 Notes

- In exercise 1 we started by copying the Tangram and the UnitCube files from the previous TP.
We grouped the cube's vertices by faces, therefore making it easier to understand how to define the indexes and normals.
Then we created the 'Madeira' type material with Ambient and Diffuse components with the function `hexToRgbA` and color `#A1662F`, and Specular component with the value of 0.3 across all colors and tested on the Cube:

![alt text](./screenshots/cg-t07g09-tp3-1.png)

We then did the normals for the Tangram, simply by repeating vertices and doing a normal upwards and another downwards on the y axis. After that we applied the Custom Material to the Tangram and took a screenshot of the MyDiamond sub-piece (we played around with the custom values)

![alt text](./screenshots/cg-t07g09-tp3-2.png)