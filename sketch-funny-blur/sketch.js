var windowsize = { x: 1280, y: 720 };
var background;

var blurShader;

var p2d;

function preload() {
  background = loadImage("landscape.jpg");
  blurShader = loadShader("simple.vert", "fastblur.frag");
}

function setup() {
  createCanvas(windowsize.x, windowsize.y, WEBGL);
  p2d = createGraphics(windowsize.x, windowsize.y, P2D);
}

function draw() {
  p2d.image(background, 0, 0);
  p2d.ellipse(windowsize.x/2, windowsize.y/2, 50, 50);
  //texture(p2d);
  // if (blurShader !== undefined && blurShader !== null)
  shader(blurShader);
  blurShader.setUniform("tex0", p2d);
  blurShader.setUniform("direction", [5,0]);
  blurShader.setUniform("mouse", [mouseX, mouseY]);
  plane(windowsize.x, windowsize.y);
}

