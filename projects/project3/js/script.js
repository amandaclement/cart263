"use strict";

/*****************

Project 3
Amanda Clement

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Planet texture images
let marsTextureImg;

// Sounds effects
let marsSFX;

// preload()
//
// Description of preload
function preload() {
  // Loading images
  marsTextureImg = loadImage('../assets/images/marsTexture.png');

  // Loading sounds for each planet
  marsSFX = loadSound('../assets/sounds/mars.mp3');
}


// setup()
//
// Description of setup
function setup() {
  // Working in WEBGL
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Black background
  background(0);
}


// draw()
//
// Description of draw()
function draw() {
  background(0);
  // Removing the stroke on all planets
  noStroke();

  // orbitControl is a p5 function allowing the user to drag and move around the scene
  // up and down scroll controls zoom
  // click-drag controls perspective angle
  orbitControl();

  // For now I just created a bunch of copies of mars to visualize the scene
  push();
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 6000, 300));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 7000, 150));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 5000, 450));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 9000, 600));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 5000, -150));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 8000, -300));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 9000, -450));
  mars();
  pop();

  push();
  translate(p5.Vector.fromAngle(millis() / 7000, -600));
  mars();
  pop();
}

function mars() {
  push();

  // Removing stroke
  noStroke();

  // Apply the appropriate planet texture (img)
  // texture(marsTextureImg);

  // Map mouse location (horizontal)
  let distX = map(mouseX, width / 2, 2, 0, width);
  // Making it rotate according to mouseX
  let rotationValue = (frameCount * 0.000005 * distX);

  // Making it rotate across each axis
  rotateY(rotationValue);
  rotateX(rotationValue);
  rotateZ(rotationValue);

  // Move your mouse to change light direction
  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;

  // Adding directional light
  directionalLight(250, 250, 250, -dirX, -dirY, -1);

  // Draw the planet sphere
  sphere(50);
  pop();
}

// mousePressed()
//
// User presses mouse to activate sound
function mousePressed() {
  // If music is already playing and mouse is pressed again, just keep playing it
  if (marsSFX.isPlaying()) {
    marsSFX.playMode('sustain');
  } else {
    marsSFX.loop(); // Music starts on first mouse press and loops
  }
}
