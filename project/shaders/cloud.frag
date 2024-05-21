#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float uTime;

void main() {
    vec2 tiledCoords = mod(vTextureCoord + vec2(uTime * 0.005, 0.0), 1.0);
    vec4 cloudColor = texture2D(uSampler2, tiledCoords);
    vec4 panoramaColor = texture2D(uSampler, vTextureCoord);

    float alpha = 0.2;
    vec4 finalColor = mix(panoramaColor, cloudColor, alpha);

    gl_FragColor = finalColor;
}