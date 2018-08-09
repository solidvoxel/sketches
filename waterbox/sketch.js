var skyShader;
var skyImageTop;
var skyImageBottom;

var pings;

const FPS = 120;
const GAMESPEED = 60;

var lastFrameTime, deltaDiv, deltaTime;

function setup() {
  // put setup code here
  frameRate(FPS);
  createCanvas(1280, 720, P2D);
  //background(0);
  //noFill();

  skyShader = loadShader("sky.frag"/*, "sky.vert"*/);
  skyShader.setUniform("colorStart", 109 / 255, 225 / 255, 255 / 255, 1);
  skyShader.setUniform("colorEnd", 255 / 255, 204 / 255, 66 / 255, 1);

  skyImageBottom = loadImage("sky.jpg");
  skyImageTop = loadImage("sky_cropped.jpg");

  //debugComposition();
  lastFrameTime = millis();

  pings = [];
}

function draw() {
  //deltaDiv = lastFrameTime / millis();
  //deltaTime = (GAMESPEED / FPS) * deltaDiv;
  //lastFrameTime = millis();

  deltaTime = (millis() - lastFrameTime) / 1000;
  lastFrameTime = millis();

  //fill(100);
  noStroke();
  //shader(skyShader);
  //rect(x(0),y(0),x(1),y(0.66));
  push();
  translate(0, y(1));
  scale(1, -1);
  //rect(x(0),y(0),x(1),y(0.34));
  image(skyImageBottom, x(0), y(0), x(1), y(0.34));
  //resetShader();
  pop();

  for (i = 0; i < pings.length; ++i) {
    var ping = pings[i];
    if (ping.alive) {
      ping.tick(deltaTime);
      ping.draw();
    }
  }
  blendMode(BLEND);

  image(skyImageTop, x(0), y(0), x(1), y(0.66));

  //debugComposition();
  // var allDead = true;
  // for (i=0; i<pings.length; ++i) {
  //   if (pings[i].alive) {
  //     allDead = false;
  //     break;
  //   }
  // }
  // if (allDead) noLoop();
}

function mouseClicked() {
  dropPing(mouseX, mouseY);
  // loop();
}

function dropPing(x, y) {
  var ping = null;
  for (i = 0; i < pings.length; ++i) {
    if (!pings[i].alive) {
      ping = pings[i];
    }
  }
  if (ping == null) {
    ping = new Ping();
    pings.push(ping);
  }

  ping.start(x + random(-5, 5), y + random(-5, 5), 300, 1, 3 / 16);
}

function Ping() {
  this.origin = new p5.Vector(0, 0);
  this.start = function (x, y, radiusSpeed, lifeTime, ratio) {
    this.origin.x = x;
    this.origin.y = y;
    this.radius = 0;
    this.radiusSpeed = radiusSpeed;
    this.lifeTime = lifeTime;
    this.ratio = ratio;
    this.alive = true;
  };
  this.tick = function (dt) {
    if (!this.alive) return;

    this.radius += this.radiusSpeed * dt * this.perspectiveFactor(this.origin.y);
    this.lifeTime -= dt;
    if (this.lifeTime < 0) {
      this.alive = false;
    }
  };
  this.draw = function () {
    stroke(255, 255, 255, 30 * this.lifeTime);
    blendMode(ADD);
    strokeWeight(3 * (1 / (this.lifeTime + 1)));
    noFill();
    ellipse(this.origin.x, this.origin.y, this.radius, this.radius * this.ratio);
  }
  this.perspectiveFactor = function (y) {
    /*
    240  <>  -1
    480  <>   0
    720  <>   1
    960  <>   2
    */
    return y * (1 / 240) - 2;
  }
}

function debugComposition() {
  stroke(0, 153, 0);
  line(x(0), y(0.66), x(1), y(0.66));
}


function x(v) { 
  return v * (width);
}
function y(v) { 
  return v * (height);
}
