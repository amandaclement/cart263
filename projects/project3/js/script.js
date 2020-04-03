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
let sun2SFX;
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

// For measuring the sound's amplitude
let analyzer;

// Size of each planet in relation to baseSize (10)
let baseSize = 10;
let mercurySize = baseSize;
let sunSize = baseSize * 6.5;
let venusSize = baseSize * 1.8;
let earthSize = baseSize * 2;
let moonSize = baseSize;
let marsSize = baseSize * 1.3;
let jupiterSize = baseSize * 5;
let saturnSize = baseSize * 4;
let uranusSize = baseSize * 2.9;
let neptuneSize = baseSize * 2.6;
let plutoSize = baseSize;

// Distance from center for each planet (length)
// baseDistance is 100
let baseDistance = 100;
let mercuryDistance = baseDistance;
let venusDistance = baseDistance + 50;
let earthDistance = baseDistance + 110;
// let moonDistance = baseDistance + 160;
let marsDistance = baseDistance + 160;
let jupiterDistance = baseDistance + 250;
let saturnDistance = baseDistance + 380;
let uranusDistance = baseDistance + 490;
let neptuneDistance = baseDistance + 585;
let plutoDistance = baseDistance + 655;

// Orbit speed for each planet relative to Earth's speed
// Information from https://www.sjsu.edu/faculty/watkins/orbital.htm
let earthSpeed = 7000;
let mercurySpeed = earthSpeed / 1.607;
let venusSpeed = earthSpeed / 1.174;
// let moonSpeed = earthSpeed * 1.75;
let marsSpeed = earthSpeed / 0.802;
let jupiterSpeed = earthSpeed / 0.434;
let saturnSpeed = earthSpeed / 0.323;
let uranusSpeed = earthSpeed / 0.228;
let neptuneSpeed = earthSpeed / 0.182;
let plutoSpeed = earthSpeed / 0.159;

// preload()
//
// Preloading the planet texture images and sounds
function preload() {
  // Loading images (planet textures)
  sunTextureImg = loadImage('../assets/images/sunTexture.jpg');
  mercuryTextureImg = loadImage('../assets/images/mercuryTexture.jpg');
  venusTextureImg = loadImage('../assets/images/venusTexture.jpg');
  earthTextureImg = loadImage('../assets/images/earthTexture.jpg');
  // moonTextureImg = loadImage('../assets/images/moonTexture.jpg');
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
  sun2SFX = loadSound('../assets/sounds/sunMusic.mp3');
  mercurySFX = loadSound('../assets/sounds/mercury.mp3');
  venusSFX = loadSound('../assets/sounds/venus.mp3');
  earthSFX = loadSound('../assets/sounds/earth.mp3');
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
  bg(); // background (stars and fog)

  // Create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to an volume analyzer
  analyzer.setInput(marsSFX);
  analyzer.setInput(sun2SFX);

  // Creating objects (planets)
  // (radius,texture,millisDivider,length)
  sun = new Planet(sunSize, sunTextureImg, 0, 0);
  mercury = new Planet(baseSize, mercuryTextureImg, mercurySpeed, mercuryDistance);
  venus = new Planet(venusSize, venusTextureImg, venusSpeed, venusDistance);
  earth = new Planet(earthSize, earthTextureImg, earthSpeed, earthDistance);
  mars = new Planet(marsSize, marsTextureImg, marsSpeed, marsDistance);
  jupiter = new Planet(jupiterSize, jupiterTextureImg, jupiterSpeed, jupiterDistance);
  saturn = new Planet(saturnSize, saturnTextureImg, saturnSpeed, saturnDistance);
  uranus = new Planet(uranusSize, uranusTextureImg, uranusSpeed, uranusDistance);
  neptune = new Planet(neptuneSize, neptuneTextureImg, neptuneSpeed, neptuneDistance);
  pluto = new Planet(baseSize, plutoTextureImg, plutoSpeed, plutoDistance);
}


// draw()
//
// Description of draw()
function draw() {
  // Clears everything to make all of the pixels 100% transparent
  clear(); // to use vanta fog bg without having planets leave a trail

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

// bg()
//
// Creating the moving background using particles.js for stars and vanta.js to create the fog
function bg() {
  // Loading particles (stars)
  particlesJS.load('particles-js', 'js/libraries/particles.json', function() {
    // Callback to let us know if particle.js successfully loaded
    console.log('callback - particles.js config loaded');
  });

  // Creating the fog
  VANTA.FOG({
    el: "body", // apply it to the body (so the entire canvas)
    highlightColor: 0xe2a, // navy blue
    midtoneColor: 0x311a, // dark green
    // lowlightColor: 0x1c3c, // navy blue
    baseColor: 0x0, // black
    blurFactor: 0.62,
    speed: 0.5,
    zoom: 0.8
  })
}

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
    let randomPosition = random(0, 360);

    //let v = p5.Vector.fromAngle(radians(myDegrees), 30);
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
    // To get amplitude (rms level) of music
    //analyzer.setInput(marsSFX);
    let rms = analyzer.getLevel();
    // Pulsating effect based on music amplitude
    let pulsation = rms * 20;

    // Apply the appropriate texture (img)
    texture(this.texture);
    // Leave the default sphere details
    sphere(this.radius + pulsation);
  }
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
