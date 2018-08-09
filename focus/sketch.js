var windowsize = { x: 1280, y: 720 };
var background;

var blurShader;

var p2d;

var avatar = {x: 325, y: 102};

function preload() {
  background = loadImage("landscape.jpg");
  blurShader = loadShader("simple.vert", "fastblur.frag");
}

function setup() {
  createCanvas(windowsize.x, windowsize.y, WEBGL);
  p2d = createGraphics(windowsize.x, windowsize.y, P2D);
}

function draw() {
  if (keyIsDown(65)) avatar.x += -3;
  if (keyIsDown(68)) avatar.x +=  3;
  if (keyIsDown(87)) avatar.y += -3;
  if (keyIsDown(83)) avatar.y +=  3;

  p2d.image(background, 50, 0);
  p2d.stroke(100,255,100);
  p2d.fill(150,155,150);
  p2d.ellipse(avatar.x, avatar.y, 10, 10);

  shader(blurShader);
  blurShader.setUniform("tex0", p2d);
  blurShader.setUniform("direction", [7,0]);
  blurShader.setUniform("avatar", [avatar.x, avatar.y]);
  blurShader.setUniform("mouse", [mouseX, mouseY]);
  plane(windowsize.x, windowsize.y);
}

