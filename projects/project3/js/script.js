"use strict";

/*****************

PROJECT 3 - A DIGITAL JOURNEY INTO SPACE
by Amanda Clement

Take a digital journey into space. You can interact with the solar system by
moving around their mouse (either by simply hovering it or by clicking while
dragging). You can also learn more about each planet by clicking the buttons on
the left hand-side. This displays some basic information about the selected
planet, and you can hear the sound it makes by hovering over it.

CREDITS
* The planet information is from from NASA's website.
* The sounds are from https://www.youtube.com/watch?v=IQL53eQ0cNA.
* The orbital velocity information is from https://www.sjsu.edu/faculty/watkins/orbital.htm.
* The planet textures are Google Images.
* The Milky Way photo was taken by Yong Chuan on Unsplash.
* The spaceship window frame image is from https://www.goodfon.com/wallpaper/window-spaceship-star-light-planet-sci-fi-meteorites.html
  and further edited on Adobe Photoshop.

******************/

// Checking whether the planets should be orbiting or not
let orbiting = true;

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
let $buttonGroup; // they are all in a group for organization/styling purposes

// To keep track of which planet is selected
// they are all false at first since the interface begins with the solar system
// (nothing is individually selected until user clicks button)
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

// Default size for planet when individually selected
let defaultSoloSize = 180;

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

// Sound effects (objects to store sound effects in)
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

  // Milky way image
  milkyWayImg = loadImage("assets/images/milkyWay.jpg");
  // Taken from https://www.goodfon.com/wallpaper/window-spaceship-star-light-planet-sci-fi-meteorites.html
  windowImg = loadImage("assets/images/window.png");

  // Loading sounds for each planet
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
// Setting up the canvas, background, buttons, and objects
function setup() {
  // Working in WEBGL
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Background (stars and fog)
  bg();

  planetButtons();

  // Storing HTML elements inside their respective variables
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

  // Creating objects (planet spheres)
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

  // Creating objects (sound effects)
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
  clear(); // avoids having planets leave a trail

  // Removing the stroke on all planets
  noStroke();

  // Draw the sun and each planet
  planets();

  // Draw saturn's ring
  push();
  saturnRing();
  pop();

  // P5's orbitControl() allows you to drag and move around the world
  // in this case, the zoom is disabled
  orbitControl();
}

// bg()
//
// Creating the moving background using particles.js for stars and vanta.js to create the fog
function bg() {
  // // Loading particles (stars)
  particlesJS.load('particles-js', 'js/libraries/particles.json', function() {
    // Callback to let us know if particle.js successfully loaded
    console.log('callback - particles.js config loaded');
  });

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

// planetButtons()
//
// Creating and displaying each planet button
// when the user clicks on, the reset() function is called to 'clear' any content
// that should no longer appear, and the appropriate planet displays alone
function planetButtons() {
// Buttons are all contained in .buttonGroup for grouping
// and buttonStyling class for styling purposes
$orbitButton = $('<div></div>').addClass('buttonStyling').button().text('RETURN TO ORBIT').click(function() {
  reset();
  orbiting = true;
});

$sunButton = $('<div></div>').addClass('buttonStyling').button().text('SUN').click(function() {
  reset();
  sunSolo = true;
  $sunInfo.show();
});

$mercuryButton = $('<div></div>').addClass('buttonStyling').button().text('MERCURY').click(function() {
  reset();
  mercurySolo = true;
  $mercuryInfo.show();
});

$venusButton = $('<div></div>').addClass('buttonStyling').button().text('VENUS').click(function() {
  reset();
  venusSolo = true;
  $venusInfo.show();
});

$earthButton = $('<div></div>').addClass('buttonStyling').button().text('EARTH').click(function() {
  reset();
  earthSolo = true;
  $earthInfo.show();
});

$marsButton = $('<div></div>').addClass('buttonStyling').button().text('MARS').click(function() {
  reset();
  marsSolo = true;
  $marsInfo.show();
});

$jupiterButton = $('<div></div>').addClass('buttonStyling').button().text('JUPITER').click(function() {
  reset();
  jupiterSolo = true;
  $jupiterInfo.show();
});

$saturnButton = $('<div></div>').addClass('buttonStyling').button().text('SATURN').click(function() {
  reset();
  saturnSolo = true;
  $saturnInfo.show();
});

$uranusButton = $('<div></div>').addClass('buttonStyling').button().text('URANUS').click(function() {
  reset();
  uranusSolo = true;
  $uranusInfo.show();
});

$neptuneButton = $('<div></div>').addClass('buttonStyling').button().text('NEPTUNE').click(function() {
  reset();
  neptuneSolo = true;
  $neptuneInfo.show();
});

$plutoButton = $('<div></div>').addClass('buttonStyling').button().text('PLUTO').click(function() {
  reset();
  plutoSolo = true;
  $plutoInfo.show();
});

// Add the buttons to the page (in .buttonGroup div) so we can see it
$('.buttonGroup').append(
  $orbitButton,
  $sunButton,
  $mercuryButton,
  $venusButton,
  $earthButton,
  $marsButton,
  $jupiterButton,
  $saturnButton,
  $uranusButton,
  $neptuneButton,
  $plutoButton
);
}

// reset()
//
// Resetting settings by removing all individual planet content, stopping the orbiting
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

  orbiting = false;
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

// planets()
//
// Positioning, rotating, and displaying each planet
// also controlling the sound effects
function planets() {
  // SUN
  if (sunSolo || orbiting) {
    push();
    // No positioning since it does not translate (rotates in place)
    sun.rotation();
    sun.display();
    pop();
    // If sun is selected, user can hover over it to play sound effect
    if (sunSolo) {
      sunSound.playSound();
    }
  }

  // Adding shadow
  shadow();

  // MERCURY
  if (orbiting || mercurySolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply mercury's position to make it orbit around sun
    if (!mercurySolo) {
      mercury.position();
    }
    // If mercury is selected, user can hover over it to play sound effect
    if (mercurySolo) {
      mercurySound.playSound();
    }
    // Apply rotation and display it
    mercury.rotation();
    mercury.display();
    pop();
  }

  // VENUS
  if (orbiting || venusSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply venus' position to make it orbit around sun
    if (!venusSolo) {
      venus.position();
    }
    // If venus is selected, user can hover over it to play sound effect
    if (venusSolo) {
      venusSound.playSound();
    }
    // Apply rotation and display it
    venus.rotation();
    venus.display();
    pop();
  }

  // EARTH
  if (orbiting || earthSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply earth's position to make it orbit around sun
    if (!earthSolo) {
      earth.position();
    }
    // If earth is selected, user can hover over it to play sound effect
    if (earthSolo) {
      earthSound.playSound();
    }
    // Apply rotation and display it
    earth.rotation();
    earth.display();
    pop();
  }

  // MARS
  if (orbiting || marsSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply mars' position to make it orbit around sun
    if (!marsSolo) {
      mars.position();
    }
    // If mars is selected, user can hover over it to play sound effect
    if (marsSolo) {
      marsSound.playSound();
    }
    // Apply rotation and display it
    mars.rotation();
    mars.display();
    pop();
  }

  // JUPITER
  if (orbiting || jupiterSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply jupiter's position to make it orbit around sun
    if (!jupiterSolo) {
      jupiter.position();
    }
    // If jupiter is selected, user can hover over it to play sound effect
    if (jupiterSolo) {
      jupiterSound.playSound();
    }
    // Apply rotation and display it
    jupiter.rotation();
    jupiter.display();
    pop();
  }

  // SATURN
  if (orbiting || saturnSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply saturn's position to make it orbit around sun
    if (!saturnSolo) {
      saturn.position();
    }
    // If saturn is selected, user can hover over it to play sound effect
    if (saturnSolo) {
      saturnSound.playSound();
    }
    // Apply rotation and display it
    saturn.rotation();
    saturn.display();
    pop();
  }

  // URANUS
  if (orbiting || uranusSolo) {
    push();
    // If planets are orbiting (meaning none are individually selected)
    // then apply uranus' position to make it orbit around sun
    if (!uranusSolo) {
      uranus.position();
    }
    // If uranus is selected, user can hover over it to play sound effect
    if (uranusSolo) {
      uranusSound.playSound();
    }
    // Apply rotation and display it
    uranus.rotation();
    uranus.display();
    pop();
  }

  // NEPTUNE
  if (orbiting || neptuneSolo) {
    // If planets are orbiting (meaning none are individually selected)
    // then apply neptune's position to make it orbit around sun
    push();
    if (!neptuneSolo) {
      neptune.position();
    }
    // If neptune is selected, user can hover over it to play sound effect
    if (neptuneSolo) {
      neptuneSound.playSound();
    }
    // Apply rotation and display it
    neptune.rotation();
    neptune.display();
    pop();
  }

  // PLUTO
  if (orbiting || plutoSolo) {
    // If planets are orbiting (meaning none are individually selected)
    // then apply pluto's position to make it orbit around sun
    push();
    if (!plutoSolo) {
      pluto.position();
    }
    // If pluto is selected, user can hover over it to play sound effect
    if (plutoSolo) {
      plutoSound.playSound();
    }
    // Apply rotation and display it
    pluto.rotation();
    pluto.display();
    pop();
  }
}

// saturnRing()
//
// Creating saturn's ring
function saturnRing() {
  // If the planet's are orbiting, saturn's ring must follow the same movement
  // pattern and speed as saturn
  if (orbiting) {
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
  // Apply the appropriate texture
  texture(saturnRingTextureImg);
  torus(saturnSize + 15, 5, 24, 5);

  // If saturn is singled out, make the ring stop rotating (stays stable)
  // also adjust its size
  if (saturnSolo) {
    push();
    // Rotate it
    rotateX(8);
    rotateY(100);
    // Make it wider/larger than the saturn sphere
    let ringSize = defaultSoloSize + 70;
    torus(ringSize, 50, 24, 2); // adding details to make it flat
    pop();
  }
}

// function shadow()
//
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

    // If planets are orbiting, use their respective (differing) radiuses
    if (orbiting) {
      sphere(this.radius);
    }
    // if a planet is singled out, make it default solo size (180)
    if (!orbiting) {
      sphere(defaultSoloSize);
    }
  }
}

// Controlling each planet's sound effects
class Sound {
  constructor(sound) {
    this.sound = sound; // using the appropriate sound based on the planet being displayed
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
