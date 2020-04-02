"use strict";

/*****************

Project 3
Amanda Clement

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Declaring the sun, moon, and each planet
let sun;
let mercury;
let venus;
let earth;
let moon;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;
let pluto;

// Texture images
let sunTextureImg;
let mercuryTextureImg;
let venusTextureImg;
let earthTextureImg;
let moonTextureImg;
let marsTextureImg;
let jupiterTextureImg;
let saturnTextureImg;
let saturnRingTextureImg;
let uranusTextureImg;
let neptuneTextureImg;
let plutoTextureImg;

// Sounds effects
let sunSFX;
let mercurySFX;
let venusSFX;
let earthSFX;
let moonSFX;
let marsSFX;
let jupiterSFX;
let saturnSFX;
let uranusSFX;
let neptuneSFX;
let plutoSFX;

// preload()
//
// Preloading the planet texture images and sounds
function preload() {
  // Loading images (planet textures)
  sunTextureImg = loadImage('../assets/images/sunTexture.jpg');
  mercuryTextureImg = loadImage('../assets/images/mercuryTexture.jpg');
  venusTextureImg = loadImage('../assets/images/venusTexture.jpg');
  earthTextureImg = loadImage('../assets/images/earthTexture.jpg');
  moonTextureImg = loadImage('../assets/images/moonTexture.jpg');
  marsTextureImg = loadImage('../assets/images/marsTexture.png');
  jupiterTextureImg = loadImage('../assets/images/jupiterTexture.jpg');
  saturnTextureImg = loadImage('../assets/images/saturnTexture.png');
  saturnRingTextureImg = loadImage('../assets/images/saturnRingTexture.jpg'); // texture for saturn's ring
  uranusTextureImg = loadImage('../assets/images/uranusTexture.jpg');
  neptuneTextureImg = loadImage('../assets/images/neptuneTexture.jpg');
  plutoTextureImg = loadImage('../assets/images/plutoTexture.jpg');

  // Loading sounds for each planet
  // Sounds from https://www.youtube.com/watch?v=IQL53eQ0cNA & https://www.youtube.com/watch?v=UTAPvPLb7t4
  sunSFX = loadSound('../assets/sounds/sun.mp3');
  mercurySFX = loadSound('../assets/sounds/mercury.mp3');
  venusSFX = loadSound('../assets/sounds/venus.mp3');
  earthSFX = loadSound('../assets/sounds/earth.mp3');
  moonSFX = loadSound('../assets/sounds/moon.mp3');
  marsSFX = loadSound('../assets/sounds/mars.mp3');
  jupiterSFX = loadSound('../assets/sounds/jupiter.mp3');
  saturnSFX = loadSound('../assets/sounds/saturn.mp3');
  uranusSFX = loadSound('../assets/sounds/uranus.mp3');
  neptuneSFX = loadSound('../assets/sounds/neptune.mp3');
  plutoSFX = loadSound('../assets/sounds/pluto.mp3');
}


// setup()
//
// Description of setup
function setup() {
  // Working in WEBGL
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Creating objects (planets)
  // (radius,texture,millisDivider,length)
  sun = new Planet(60, sunTextureImg, 0, 0);
  mercury = new Planet(25, mercuryTextureImg, 8000, -150);
  venus = new Planet(40, venusTextureImg, 6000, 250);
  earth = new Planet(40, earthTextureImg, 7000, -350);
  moon = new Planet(20, moonTextureImg, 9000, 450);
  mars = new Planet(40, marsTextureImg, 5000, -550);
  jupiter = new Planet(50, jupiterTextureImg, 7000, 650);
  saturn = new Planet(40, saturnTextureImg, 6000, -750);
  uranus = new Planet(40, uranusTextureImg, 8000, 850);
  neptune = new Planet(40, neptuneTextureImg, 5000, -950);
  pluto = new Planet(30, plutoTextureImg, 9000, 1050);
}


// draw()
//
// Description of draw()
function draw() {
  background(0);

  // orbitControl is a p5 function allowing the user to drag and move around the scene
  // up and down scroll controls zoom
  // click-drag controls perspective angle
  orbitControl();

  // Removing the stroke on all planets
  noStroke();

  // Positioning, rotating, and displaying the planets
  push();
  sun.position();
  sun.rotation();
  sun.display();
  pop();

  // Adding shadow
  shadow();

  push();
  mercury.position();
  mercury.rotation();
  mercury.display();
  pop();

  push();
  venus.position();
  venus.rotation();
  venus.display();
  pop();

  push();
  earth.position();
  earth.rotation();
  earth.display();
  pop();

  push();
  moon.position();
  moon.rotation();
  moon.display();
  pop();

  push();
  mars.position();
  mars.rotation();
  mars.display();
  pop();

  push();
  jupiter.position();
  jupiter.rotation();
  jupiter.display();
  pop();

  push();
  saturn.position();
  saturn.rotation();
  saturn.display();
  pop();

  push();
  uranus.position();
  uranus.rotation();
  uranus.display();
  pop();

  push();
  neptune.position();
  neptune.rotation();
  neptune.display();
  pop();

  push();
  pluto.position();
  pluto.rotation();
  pluto.display();
  pop();
}

// mousePressed()
//
// User presses mouse to activate sound
// function mousePressed() {
//   // If music is already playing and mouse is pressed again, just keep playing it
//   if (marsSFX.isPlaying()) {
//     marsSFX.playMode('sustain');
//   } else {
//     marsSFX.loop(); // Music starts on first mouse press and loops
//   }
// }

// Adding a shadow onto each planet controlled by mouse location
// uses p5's directionalLight
function shadow() {
  // Moving mouse changes light direction
  let dirX = (mouseX / width - 0.5);
  let dirY = (mouseY / height - 0.5);

  // Adding directional light
  directionalLight(250, 250, 250, -dirX, -dirY, -1); // white
}

// Creating the planet
class Planet {
  constructor(radius, texture, millisDivider, length) {
    this.radius = radius; // size
    this.texture = texture; // texture (img)
    this.rotationSpeed = 0.000005;
    this.millisDivider = millisDivider; // millisecond divider for translation (planet position)
    this.length = length; // length of new vector (distance from center)
  }
  // Translating it to the appropriate position and making it orbit at appropriate speed
  position() {
    // p5.Vector.fromAngle() makes a new 2D vector from an angle
    // millis returns the number of milliseconds since starting the sketch when setup() is called)
    translate(p5.Vector.fromAngle(millis() / this.millisDivider, this.length));
  }
  // Rotating the planet (based on mouseX location)
  rotation() {
    // Map mouse location (horizontal)
    let distX = map(mouseX, width / 2, 2, 0, width);
    // Making it rotate according to mouseX
    let rotationValue = (frameCount * this.rotationSpeed * distX);

    // Making it rotate across each axis
    rotateY(rotationValue);
    rotateX(rotationValue);
    rotateZ(rotationValue);
  }
  // Displaying the planet
  display() {
    // Apply the appropriate texture (img)
    texture(this.texture);
    // Leave the default sphere details
    sphere(this.radius);
  }
}
