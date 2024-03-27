attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor; // Uniforme para o tempo atual
uniform float normScale; // Uniforme para o scaleFactor da interface

varying vec4 vPosition;

void main() {
    // Calcula o offset como uma onda sinusoidal do tempo, escalada pelo scaleFactor
    float offsetX = sin(timeFactor) * normScale;

    // Adiciona o offset à posição do vértice
    vec4 vertexPosition4 = vec4(aVertexPosition.x + offsetX, aVertexPosition.y, aVertexPosition.z, 1.0);

    vPosition = uPMatrix * uMVMatrix * vertexPosition4;
    gl_Position = vPosition;
}