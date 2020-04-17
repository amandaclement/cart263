"use strict";

/*****************

Project 3
Amanda Clement

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// Info taken from NASA: https://solarsystem.nasa.gov/solar-system/sun/overview/

let orbitting = true; // Checking whther it should be orbitting or not

let defaultSoloSize = 180; // default size for planet when individually selected

let sunSolo = false;
let mercurySolo = false;
let venusSolo = false;
let earthSolo = false;
let marsSolo = false;
let jupiterSolo = false;
let saturnSolo = false;
let uranusSolo = false;
let neptuneSolo = false;
let plutoSolo = false;

// Creating buttons
let $orbitButton;
let $sunButton;
let $mercuryButton;
let $venusButton;
let $earthButton;
let $marsButton;
let $jupiterButton;
let $saturnButton;
let $uranusButton;
let $neptuneButton;
let $plutoButton;
let $buttonGroup;

// Declaring the sun and each planet
let sun;
let mercury;
let venus;
let earth;
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
let marsTextureImg;
let jupiterTextureImg;
let saturnTextureImg;
let saturnRingTextureImg;
let uranusTextureImg;
let neptuneTextureImg;
let plutoTextureImg;
let milkyWayImg;
let windowImg;

// Sounds effects
let sunSFX;
let mercurySFX;
let venusSFX;
let earthSFX;
let marsSFX;
let jupiterSFX;
let saturnSFX;
let uranusSFX;
let neptuneSFX;
let plutoSFX;

// Sounds effects
let sunSound;
let mercurySound;
let venusSound;
let earthSound;
let marsSound;
let jupiterSound;
let saturnSound;
let uranusSound;
let neptuneSound;
let plutoSound;

// Planet information
let $sunInfo;
let $mercuryInfo;
let $venusInfo;
let $earthInfo;
let $marsInfo;
let $jupiterInfo;
let $saturnInfo;
let $uranusInfo;
let $neptuneInfo;
let $plutoInfo;

// Size of each planet in relation to baseSize (10)
let baseSize = 10;
let mercurySize = baseSize;
let sunSize = baseSize * 6.5;
let venusSize = baseSize * 1.8;
let earthSize = baseSize * 2;
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
let marsSpeed = earthSpeed / 0.802;
let jupiterSpeed = earthSpeed / 0.434;
let saturnSpeed = earthSpeed / 0.323;
let uranusSpeed = earthSpeed / 0.228;
let neptuneSpeed = earthSpeed / 0.182;
let plutoSpeed = earthSpeed / 0.159;

// Font styles
let karlaFontRegular;
let karlaFontBold;
let karlaFontItalic;

// preload()
//
// Preloading the planet texture images and sounds
function preload() {
  // Loading images (planet textures)
  // Google Images
  sunTextureImg = loadImage("assets/images/sunTexture.jpg");
  mercuryTextureImg = loadImage("assets/images/mercuryTexture.jpg");
  venusTextureImg = loadImage("assets/images/venusTexture.jpg");
  earthTextureImg = loadImage("assets/images/earthTexture.jpg");
  marsTextureImg = loadImage("assets/images/marsTexture.png");
  jupiterTextureImg = loadImage("assets/images/jupiterTexture.jpg");
  saturnTextureImg = loadImage("assets/images/saturnTexture.png");
  saturnRingTextureImg = loadImage("assets/images/saturnRingTexture.jpg"); // texture for saturn"s ring
  uranusTextureImg = loadImage("assets/images/uranusTexture.jpg");
  neptuneTextureImg = loadImage("assets/images/neptuneTexture.jpg");
  plutoTextureImg = loadImage("assets/images/plutoTexture.jpg");

  // Photo by Yong Chuan Tan on Unsplash
  milkyWayImg = loadImage("assets/images/milkyWay.jpg");
  // Taken from https://www.goodfon.com/wallpaper/window-spaceship-star-light-planet-sci-fi-meteorites.html
  windowImg = loadImage("assets/images/window.png");

  // Loading sounds for each planet
  // Sounds from https://www.youtube.com/watch?v=IQL53eQ0cNA & https://www.youtube.com/watch?v=UTAPvPLb7t4
  sunSFX = loadSound("assets/sounds/sun.mp3");
  mercurySFX = loadSound("assets/sounds/mercury.mp3");
  venusSFX = loadSound("assets/sounds/venus.mp3");
  earthSFX = loadSound("assets/sounds/earth.mp3");
  marsSFX = loadSound("assets/sounds/mars.mp3");
  jupiterSFX = loadSound("assets/sounds/jupiter.mp3");
  saturnSFX = loadSound("assets/sounds/saturn.mp3");
  uranusSFX = loadSound("assets/sounds/uranus.mp3");
  neptuneSFX = loadSound("assets/sounds/neptune.mp3");
  plutoSFX = loadSound("assets/sounds/pluto.mp3");

  // Loading font
  karlaFontRegular = loadFont("assets/fonts/Karla-Regular.ttf");
  karlaFontBold = loadFont("assets/fonts/Karla-Bold.ttf");
  karlaFontItalic = loadFont("assets/fonts/Karla-Italic.ttf");
}


// setup()
//
// Description of setup
function setup() {
  // Working in WEBGL
  createCanvas(windowWidth, windowHeight, WEBGL);

  bg(); // background (stars and fog)

  $sunInfo = $('.sunInfo');
  $mercuryInfo = $('.mercuryInfo');
  $venusInfo = $('.venusInfo');
  $earthInfo = $('.earthInfo');
  $marsInfo = $('.marsInfo');
  $jupiterInfo = $('.jupiterInfo');
  $saturnInfo = $('.saturnInfo');
  $uranusInfo = $('.uranusInfo');
  $neptuneInfo = $('.neptuneInfo');
  $plutoInfo = $('.plutoInfo');
  $buttonGroup = $('.buttonGroup');

  $orbitButton = $('<div></div>');
  $orbitButton.addClass('buttonStyling');
  $orbitButton.button();
  $orbitButton.text('RETURN TO ORBIT');
  $orbitButton.click(function() {
    reset();
    orbitting = true;
  });
  $('.buttonGroup').append($orbitButton);

  $sunButton = $('<div></div>');
  $sunButton.addClass('buttonStyling');
  $sunButton.button();
  $sunButton.text('SUN');
  $sunButton.click(function() {
    reset();
    sunSolo = true;
    $sunInfo.show();
  });
  $('.buttonGroup').append($sunButton);

  $mercuryButton = $('<div></div>');
  $mercuryButton.addClass('buttonStyling');
  $mercuryButton.button();
  $mercuryButton.text('MERCURY');
  $mercuryButton.click(function() {
    reset();
    mercurySolo = true;
    $mercuryInfo.show();
  });
  $('.buttonGroup').append($mercuryButton);

  $venusButton = $('<div></div>');
  $venusButton.addClass('buttonStyling');
  $venusButton.button();
  $venusButton.text('VENUS');
  $venusButton.click(function() {
    reset();
    venusSolo = true;
    $venusInfo.show();
  });
  $('.buttonGroup').append($venusButton);

  $earthButton = $('<div></div>');
  $earthButton.addClass('buttonStyling');
  $earthButton.button();
  $earthButton.text('EARTH');
  $earthButton.click(function() {
    reset();
    earthSolo = true;
    $earthInfo.show();
  });
  $('.buttonGroup').append($earthButton);

  $marsButton = $('<div></div>');
  $marsButton.addClass('buttonStyling');
  $marsButton.button();
  $marsButton.text('MARS');
  $marsButton.click(function() {
    reset();
    marsSolo = true;
    $marsInfo.show();
  });
  $('.buttonGroup').append($marsButton);

  $jupiterButton = $('<div></div>');
  $jupiterButton.addClass('buttonStyling');
  $jupiterButton.button();
  $jupiterButton.text('JUPITER');
  $jupiterButton.click(function() {
    reset();
    jupiterSolo = true;
    $jupiterInfo.show();
  });
  $('.buttonGroup').append($jupiterButton);

  $saturnButton = $('<div></div>');
  $saturnButton.addClass('buttonStyling');
  $saturnButton.button();
  $saturnButton.text('SATURN');
  $saturnButton.click(function() {
    reset();
    saturnSolo = true;
    $saturnInfo.show();
  });
  $('.buttonGroup').append($saturnButton);

  $uranusButton = $('<div></div>');
  $uranusButton.addClass('buttonStyling');
  $uranusButton.button();
  $uranusButton.text('URANUS');
  $uranusButton.click(function() {
    reset();
    uranusSolo = true;
    $uranusInfo.show();
  });
  $('.buttonGroup').append($uranusButton);

  $neptuneButton = $('<div></div>');
  $neptuneButton.addClass('buttonStyling');
  $neptuneButton.button();
  $neptuneButton.text('NEPTUNE');
  $neptuneButton.click(function() {
    reset();
    neptuneSolo = true;
    $neptuneInfo.show();
  });
  $('.buttonGroup').append($neptuneButton);

  $plutoButton = $('<div></div>');
  $plutoButton.addClass('buttonStyling');
  $plutoButton.button();
  $plutoButton.text('PLUTO');
  $plutoButton.click(function() {
    reset();
    plutoSolo = true;
    $plutoInfo.show();
  });
  $('.buttonGroup').append($plutoButton);

  // Creating objects (planets)
  // constructor(radius,texture,millisDivider,length)
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

  sunSound = new Sound(sunSFX);
  mercurySound = new Sound(mercurySFX);
  venusSound = new Sound(venusSFX);
  earthSound = new Sound(earthSFX);
  marsSound = new Sound(marsSFX);
  jupiterSound = new Sound(jupiterSFX);
  saturnSound = new Sound(saturnSFX);
  uranusSound = new Sound(uranusSFX);
  neptuneSound = new Sound(neptuneSFX);
  plutoSound = new Sound(plutoSFX);
}

// draw()
//
// Description of draw()
function draw() {
  // Clears everything to make all of the pixels 100% transparent
  clear(); // to use vanta fog bg without having planets leave a trail

  // Removing the stroke on all planets
  noStroke();

  displayPlanets();

  push();
  saturnRing();
  pop();

  if (orbitting) {
    orbitControl();
  }
}

// saturnRing()
//
// Creating saturn's ring
function saturnRing() {
  if (orbitting) {
    // Positioning (according saturn sphere)
    let formula = p5.Vector.fromAngle(millis() / saturnSpeed, saturnDistance);
    translate(formula);

    // Rotation
    // it rotates on its own (not affected by mouse)
    let rotationValue = (frameCount * 0.005);

    // Making it rotate across each axis
    rotateY(rotationValue);
    rotateX(rotationValue);
    rotateZ(rotationValue);
  }

  // Give it some opacity
  tint(255, 190);
  // Apply the appropriate texture (img)
  texture(saturnRingTextureImg);
  torus(saturnSize + 15, 5, 24, 5);

  // If saturn is singled out, make the ring stop rotating (stays stable)
  // also adjust its size
  if (!orbitting && saturnSolo) {
    push();
    // Rotate it
    rotateX(8);
    rotateY(100);
    // Make it wider/larger than the saturn sphere
    torus(defaultSoloSize + 70, 50, 24, 2); // adding details to make it flat
    pop();
  }
}

// displayPlanets()
//
// Displaying each planet (for orbitting and for solo planets)
function displayPlanets() {
  // Positioning, rotating, and displaying the planets
  if (orbitting || sunSolo) {
    push();
    if (!orbitting && sunSolo) {
      sunSound.playSound();
    }
    sun.rotation();
    sun.display();
    pop();
  }

  // Adding shadow
  shadow();

  if (orbitting || mercurySolo) {
    push();
    if (orbitting) {
      mercury.position();
    }
    if (!orbitting && mercurySolo) {
      mercurySound.playSound();
    }
    mercury.rotation();
    mercury.display();
    pop();
  }

  if (orbitting || venusSolo) {
    push();
    if (orbitting) {
      venus.position();
    }
    if (!orbitting && venusSolo) {
      venusSound.playSound();
    }
    venus.rotation();
    venus.display();
    pop();
  }

  if (orbitting || earthSolo) {
    push();
    if (orbitting) {
      earth.position();
    }
    if (!orbitting && earthSolo) {
      earthSound.playSound();
    }
    earth.rotation();
    earth.display();
    pop();
  }

  if (orbitting || marsSolo) {
    push();
    if (orbitting) {
      mars.position();
    }
    if (!orbitting && marsSolo) {
      marsSound.playSound();
    }
    mars.rotation();
    mars.display();
    pop();
  }

  if (orbitting || jupiterSolo) {
    push();
    if (orbitting) {
      jupiter.position();
    }
    if (!orbitting && jupiterSolo) {
      jupiterSound.playSound();
    }
    jupiter.rotation();
    jupiter.display();
    pop();
  }

  if (orbitting || saturnSolo) {
    push();
    if (orbitting) {
      saturn.position();
    }
    if (!orbitting && saturnSolo) {
      saturnSound.playSound();
    }
    saturn.rotation();
    saturn.display();
    pop();
  }

  if (orbitting || uranusSolo) {
    push();
    if (orbitting) {
      uranus.position();
    }
    if (!orbitting && uranusSolo) {
      uranusSound.playSound();
    }
    uranus.rotation();
    uranus.display();
    pop();
  }

  if (orbitting || neptuneSolo) {
    push();
    if (orbitting) {
      neptune.position();
    }
    if (!orbitting && neptuneSolo) {
      neptuneSound.playSound();
    }
    neptune.rotation();
    neptune.display();
    pop();
  }

  if (orbitting || plutoSolo) {
    push();
    if (orbitting) {
      pluto.position();
    }
    if (!orbitting && plutoSolo) {
      plutoSound.playSound();
    }
    pluto.rotation();
    pluto.display();
    pop();
  }
}

// reset()
//
// Resetting settings by removing all individual planet content, stopping the orbitting
// and stopping any sounds playing
function reset() {
  $('.sunInfo').hide();
  $('.mercuryInfo').hide();
  $('.venusInfo').hide();
  $('.earthInfo').hide();
  $('.marsInfo').hide();
  $('.saturnInfo').hide();
  $('.jupiterInfo').hide();
  $('.uranusInfo').hide();
  $('.neptuneInfo').hide();
  $('.plutoInfo').hide();

  orbitting = false;
  sunSolo = false;
  mercurySolo = false;
  venusSolo = false;
  earthSolo = false;
  marsSolo = false;
  jupiterSolo = false;
  saturnSolo = false;
  uranusSolo = false;
  neptuneSolo = false;
  plutoSolo = false;
}

// bg()
//
// Creating the moving background using particles.js for stars and vanta.js to create the fog
function bg() {
  // Loading particles (stars)
  // particlesJS.load('particles-js', 'js/libraries/particles.json', function() {
  //   // Callback to let us know if particle.js successfully loaded
  //   console.log('callback - particles.js config loaded');
  // });

  // Creating the fog
  VANTA.FOG({
    el: "#fog", // apply it to the body (so the entire canvas)
    highlightColor: 0xe2a, // navy blue
    midtoneColor: 0x311a, // dark green
    lowlightColor: 0x6978aa, // navy blue
    baseColor: 0x0, // black
    blurFactor: 0.6,
    speed: 4,
    zoom: 0.5
  });
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
    let formula = p5.Vector.fromAngle(millis() / this.millisDivider, this.length);
    translate(formula);
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

    // If planets are orbitting, use their respective (differing) radiuses
    if (orbitting) {
      sphere(this.radius);
    }
    // if a planet is singled out, make it default solo size (180)
    if (!orbitting) {
      sphere(defaultSoloSize);
    }
  }
}

// Controlling each planet's sound effects
class Sound {
  constructor(sound) {
    this.sound = sound; // using the appropriate sound based on the planet displayed
  }
  // Checking if the mouse is overlapping the planet
  // if it is, play the sound effect
  playSound() {
    let d = dist(width / 2, height / 2, mouseX, mouseY);
    if (d < defaultSoloSize) {
      (this.sound).play();
    } else {
      (this.sound).stop(); // stop the sound if the user hovers away from the planet
    }
  }
}
