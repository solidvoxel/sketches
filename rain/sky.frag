
uniform mat4 transform;

uniform vec4 colorStart;
uniform vec4 colorEnd;

in vec4 vertColor;
in vec4 vertTexCoord;

out vec4 fragColor;

void main() {
  float mix = vertTexCoord.y;
  fragColor = vec4(
    colorStart.x * (1.0-mix) + colorEnd.x * mix,
    colorStart.y * (1.0-mix) + colorEnd.y * mix,
    colorStart.z * (1.0-mix) + colorEnd.z * mix,
    colorStart.w * (1.0-mix) + colorEnd.w * mix
  );
}
