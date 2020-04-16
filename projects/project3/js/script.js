"use strict";

/*****************

Project 3
Amanda Clement

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

//let $hello;


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
let orbitButton;
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

  $sunButton = $('<div></div>');
  $sunButton.addClass('buttonStyling');
  $sunButton.button();
  $sunButton.text('SUN');
  $sunButton.click(function() {
    reset();
    sunSFX.play();
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
    mercurySFX.play();
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
    venusSFX.play();
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
    earthSFX.play();
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
    marsSFX.play();
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
    jupiterSFX.play();
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
    saturnSFX.play();
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
    uranusSFX.play();
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
    neptuneSFX.play();
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
    plutoSFX.play();
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

  // For the planet information
  // Info taken from NASA: https://solarsystem.nasa.gov/solar-system/sun/overview/
  // constructor(planetName, subtitle, planetTypeInfo, sizeInfo, positionInfo, distanceInfo, lengthInfo, surfaceInfo, moonInfo, sound)
  // sunInfo = new PlanetInfo('S U N', 'OUR STAR', 'TERRESTRIAL', 'SMALLEST PLANET IN SOLAR SYSTEM', 'CLOSEST TO SUN', '36 MILLION MILES', '88 EARTH DAYS', 'ROCKY', '0', sunSFX);
  // mercuryInfo = new PlanetInfo('M E R C U R Y', 'THE SWIFTEST PLANET', 'TERRESTRIAL', 'SMALLEST PLANET IN SOLAR SYSTEM', 'CLOSEST TO SUN', '36 MILLION MILES', '88 EARTH DAYS', 'ROCKY', '0', mercurySFX);
  // venusInfo = new PlanetInfo('V E N U S', 'PLANETARY HOT SPOT', 'TERRESTRIAL', 'EARTH-SIZED', 'SECOND CLOSEST TO SUN', '67 MILLION MILES', '225 EARTH DAYS', 'DIVERSE TERRAIN', '0', venusSFX);
  // earthInfo = new PlanetInfo('E A R T H', 'OUR HOME PLANET', 'TERRESTRIAL', 'FIFTH LARGEST PLANET IN SOLAR SYSTEM', 'THIRD ROCK', '95 MILLION MILES', '365 DAYS', 'ROCKY', '1', earthSFX);
  // marsInfo = new PlanetInfo('M A R S', 'THE RED PLANET', 'TERRESTRIAL', 'SMALL PLANET', 'FOURTH ROCK', '228 MILLION MILES', '687 EARTH DAYS', 'RUGGED TERRAIN', '2', marsSFX);
  // jupiterInfo = new PlanetInfo('J U P I T E R', 'TWICE AS MASSIVE AS ALL THE OTHER PLANETS COMBINED', 'GAS GIANT', 'THE GRANDEST PLANET', 'FIFTH PLANET FROM THE SUN', '484 MILLION MILES', '12 EARTH YEARS', 'LACKS AN EARTH-LIKE SOLID SURFACE', 'OVER 75', jupiterSFX);
  // saturnInfo = new PlanetInfo('S A T U R N', 'JEWEL OF OUR SOLAR SYSTEM', 'GAS GIANT', 'NINE EARTHS WOULD ALMOST SPAN ITS DIAMETER', 'SIXTH PLANET FROM THE SUN', '886 MILLION MILES', '29 EARTH YEARS', 'LACKS AN EARTH-LIKE SOLID SURFACE', '82', saturnSFX);
  // uranusInfo = new PlanetInfo('U R A N U S', 'THE SIDEWAYS PLANET', 'ICE GIANT', 'HUGE', 'SEVENTH WANDERER', '1.8 BILLION MILES', '84 EARTH YEARS', 'ICY MATERIALS', '27', uranusSFX);
  // neptuneInfo = new PlanetInfo('N E P T U N E', 'THE WINDIEST PLANET', 'ICE GIANT', 'GIANT (4 TIMES WIDER THAN EARTH)', 'EIGHTH WANDERER', '2.8 BILLION MILES', '165 EARTH YEARS', 'ICY MATERIALS', '14', neptuneSFX);
  // plutoInfo = new PlanetInfo('P L U T O', 'DWARF PLANET', 'DWARF PLANET', 'ABOUT 1400 MILES WIDE', 'USUALLY FARTHEST FROM SUN', '3.6 BILLION MILES', '248 EARTH YEARS', 'COLD', '5', plutoSFX);
}

// draw()
//
// Description of draw()
function draw() {
  // Clears everything to make all of the pixels 100% transparent
  clear(); // to use vanta fog bg without having planets leave a trail

  // Removing the stroke on all planets
  noStroke();

  creatingButtons();

  displayPlanets();

  push();
  saturnRing();
  pop();

  if (orbitting) {
    orbitControl();
  }
}

// orbitButton()
// To return to main orbit
function creatingButtons() {
  orbitButton = createButton('RETURN TO ORBIT');
  orbitButton.position(20, 25);
  orbitButton.mousePressed(function() {
    reset();
    orbitting = true;
  });

  // let $sunButton = $('<div></div>');
  // $sunButton.addClass('buttonStyling');
  // $sunButton.text('Click here to begin');
  // $sunButton.button();
  // // $sunButton.hover(function() {
  // //   //(this.sound).play();
  // //   console.log('hovered');
  // // });
  // $('body').append($sunButton);



//   // sunButton = createButton('SUN');
//   // sunButton.position(20, 50);
//   // sunButton.mousePressed(function() {
//   //   reset();
//   //   sunSolo = true;
//   // });
//
//   let $playButton = $('<div></div');
//   $playButton.addClass('start');
//   $playButton.button();
//   $playButton.on('click', function() {
//     //(this.sound).play();
//   });
//   $('body').append($playButton);
// }

  // mercuryButton = createButton('MERCURY');
  // mercuryButton.position(20, 75);
  // mercuryButton.mousePressed(function() {
  //   reset();
  //   mercurySolo = true;
  // });
  //
  // venusButton = createButton('VENUS');
  // venusButton.position(20, 100);
  // venusButton.mousePressed(function() {
  //   reset();
  //   venusSolo = true;
  // });
  //
  // earthButton = createButton('EARTH');
  // earthButton.position(20, 125);
  // earthButton.mousePressed(function() {
  //   reset();
  //   earthSolo = true;
  // });
  //
  // marsButton = createButton('MARS');
  // marsButton.position(20, 150);
  // marsButton.mousePressed(function() {
  //   reset();
  //   marsSolo = true;
  // });
  //
  // jupiterButton = createButton('JUPITER');
  // jupiterButton.position(20, 175);
  // jupiterButton.mousePressed(function() {
  //   reset();
  //   jupiterSolo = true;
  // });
  //
  // saturnButton = createButton('SATURN');
  // saturnButton.position(20, 200);
  // saturnButton.mousePressed(function() {
  //   reset();
  //   saturnSolo = true;
  // });
  //
  // uranusButton = createButton('URANUS');
  // uranusButton.position(20, 225);
  // uranusButton.mousePressed(function() {
  //   reset();
  //   uranusSolo = true;
  // });
  //
  // neptuneButton = createButton('NEPTUNE');
  // neptuneButton.position(20, 250);
  // neptuneButton.mousePressed(function() {
  //   reset();
  //   neptuneSolo = true;
  // });
  //
  // plutoButton = createButton('PLUTO');
  // plutoButton.position(20, 275);
  // plutoButton.mousePressed(function() {
  //   reset();
  //   plutoSolo = true;
  // });

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
      // sunInfo.displayTitle();
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
      // mercuryInfo.displayTitle();
      // mercuryInfo.displayInfo();
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
      // venusInfo.displayTitle();
      // venusInfo.displayInfo();
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
      // earthInfo.displayTitle();
      // earthInfo.displayInfo();
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
      // marsInfo.displayTitle();
      // marsInfo.displayInfo();
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
      // jupiterInfo.displayTitle();
      // jupiterInfo.displayInfo();
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
      // saturnInfo.displayTitle();
      // saturnInfo.displayInfo();
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
      // uranusInfo.displayTitle();
      // uranusInfo.displayInfo();
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
      // neptuneInfo.displayTitle();
      // neptuneInfo.displayInfo();
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
      // plutoInfo.displayTitle();
      // plutoInfo.displayInfo();
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
  sunSFX.stop();
  mercurySolo = false;
  mercurySFX.stop();
  venusSolo = false;
  venusSFX.stop();
  earthSolo = false;
  earthSFX.stop();
  marsSolo = false;
  marsSFX.stop();
  jupiterSolo = false;
  jupiterSFX.stop();
  saturnSolo = false;
  saturnSFX.stop();
  uranusSolo = false;
  uranusSFX.stop();
  neptuneSolo = false;
  neptuneSFX.stop();
  plutoSolo = false;
  plutoSFX.stop();
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

// Displaying the planet information
// class PlanetInfo {
//   constructor(planetName, subtitle, planetTypeInfo, sizeInfo, positionInfo, distanceInfo, lengthInfo, surfaceInfo, moonInfo, sound) {
//     this.planetName = planetName;
//     this.subtitle = subtitle; // subtitle/nickname of the planet
//     this.planetTypeInfo = planetTypeInfo; // type of planet
//     this.sizeInfo = sizeInfo; // planet size
//     this.positionInfo = positionInfo; // position relative to sun (order)
//     this.distanceInfo = distanceInfo; // distance in miles from sun
//     this.lengthInfo = lengthInfo; // length of year it takes to orbit
//     this.surfaceInfo = surfaceInfo; // type of surface
//     this.moonInfo = moonInfo; // number of moons
//     this.categoryPositionX = 230; // positioning text next to planet
//     this.sound = sound; // planet sound effect
//   }
//   // Display the info
//   displayTitle() {
//     // textFont(karlaFontRegular);
//     // textSize(32);
//     // textAlign(CENTER);
//     // text(this.planetName, 0, -250);
//
//     $('.sunInfo').show();
//
//     //sunInfo.show();
//
//     // let $hello = $('<div></div');
//     // $hello.addClass('hello');
//     // $hello.text('helkjnkjnjsdncsnsaonxcoasncoiwnlo');
//     // $hello.button();
//     // $hello.on('click', function() {
//     //   (this.sound).play();
//     // });
//     // $('body').append($hello);
//
//     // textSize(15);
//     // text(this.subtitle, 0, -220);
//   }
//   displayInfo() {
//     textFont(karlaFontBold);
//     textAlign(LEFT);
//     text('PLANET TYPE:', this.categoryPositionX, -90);
//     text('SIZE:', this.categoryPositionX, -60);
//     text('POSITION:', this.categoryPositionX, -30);
//     text('DISTANCE FROM SUN:', this.categoryPositionX, 0);
//     text('LENGTH OF YEAR:', this.categoryPositionX, 30);
//     text('SURFACE:', this.categoryPositionX, 60);
//     text('NUMBER OF MOONS:', this.categoryPositionX, 90);
//
//     textFont(karlaFontItalic);
//     text(this.planetTypeInfo, this.categoryPositionX + 100, -90);
//     text(this.sizeInfo, this.categoryPositionX + 41, -60);
//     text(this.positionInfo, this.categoryPositionX + 75, -30);
//     text(this.distanceInfo, this.categoryPositionX + 158, 0);
//     text(this.lengthInfo, this.categoryPositionX + 126, 30);
//     text(this.surfaceInfo, this.categoryPositionX + 73, 60);
//     text(this.moonInfo, this.categoryPositionX + 150, 90);
//   }
  // playSound() {
  //   let $playButton = $('<div></div');
  //   $playButton.addClass('start');
  //   $playButton.button();
  //   $playButton.on('click', function() {
  //     //(this.sound).play();
  //   });
  //   $('body').append($playButton);
  // }
