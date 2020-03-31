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
  // Angles are in degrees
  angleMode(DEGREES);

}


// draw()
//
// Description of draw()

function draw() {
  // Drawing mars
  marsSphere();
}

function marsSphere() {
  // Map mouse location (horizontal)
  let distX = map(mouseX, width / 2, 2, 0, width);
  // Making it rotate according to mouseX
  let rotationValue = (frameCount * 0.0001 * distX);

  // Making it rotate across each axis
  rotateY(rotationValue);
  rotateX(rotationValue);
  rotateZ(rotationValue);

  // Removing stroke
  noStroke();
  // Apply the appropriate planet texture (img)
  texture(marsTextureImg);

  // Draw the planet sphere
  sphere(100, 100, 24, 24);
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
