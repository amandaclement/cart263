"use strict";

/********************************************************************

Project 1
Amanda Clement

*********************************************************************/

// right format for audio constants??
// Sad background music
const sadMusic = new Audio("assets/sounds/sadMusic.mp3");

// 'Huh?' sound effect
// Sound credit to https://freesound.org/
const huhSound = new Audio("assets/sounds/huhSound.mp3");

// Crying sound effects
// Sound credit to https://www.pacdv.com/
const cryingSound1 = new Audio("assets/sounds/cryingSound1.mp3");
const cryingSound2 = new Audio("assets/sounds/cryingSound2.mp3");
const cryingSound3 = new Audio("assets/sounds/cryingSound3.mp3");
const cryingSound4 = new Audio("assets/sounds/cryingSound4.mp3");
const cryingSound5 = new Audio("assets/sounds/cryingSound5.mp3");

// Array of crying sounds
let cryingSounds = [cryingSound1, cryingSound2, cryingSound3, cryingSound4, cryingSound5];

// Setting up variables since they will be targetting multiple times
let $faceImg;
let $faceBg;
let $icon;
let $label;

// Array of responses
let responses = ["I don't feel loved", "I'm still unhappy", "I haven't accomplished enough", "I need more money", "I'm not funny enough", "but I'd like a drink", "I wish I was smarter", "I'm still lonely", "I'm not wealthy enough", "Not satisfied yet", "I wish"];

// When the document is loaded, we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Storing values inside their respective variables
  $faceImg = $("#face-img");
  $faceBg = $("#face-bg");
  $icon = $(".icon");
  $label = $(".label");

  // Specifying dimensions of instructions box
  // and disabling ability to drag and resize
  $("#instructions").dialog({
    width: 600,
    height: 300,
    draggable: false,
    resizable: false,
    close: closeInstructions
  });

  // Hide icon labels for now - they wil reveal once user closes the instructions
  // dialog box
  $label.hide();

  // Face will interchange (fade) between two shades of blue
  changingFaceColor();

  // Handling when user mouses over draggable elements (icons)
  // Deals with "master" version of images, and clones so you can keep
  // dragging and dropping them infinitly
  $icon.on('mouseover', '.master', function() {
    $(this).draggable({
      start: masterDrag,
      // Revert icon to original position if not dragged onto face
      revert: true,
      // contain within container div to remove scroll
      containment: "#containment-wrapper",
      scroll: false
    });
  });

  // Trigger onDrop function if icon is dropped on face
  $faceBg.droppable({
    drop: onDrop
  });

  // When user hovers mouse over one of the icons, display sad face image where
  // eyes are looking towards left (as if looking at the icons)
  $icon.mouseover(function() {
    $faceImg.attr('src', 'assets/images/sad-face-2.png');
  });

  // User can click question to ask if they're happy yet
  $("#question").on('click', respond);
  // Hide response - it will only be trigged when user clicks button
  $("#response").hide();
}

// onDrop()
//
// When user drops icon onto face, hide icon by scaling it down
// and play a random crying sound from the array
function onDrop(event, ui) {
  // Icons scale down (shrinks) until it disappears on face
  ui.draggable.hide('scale');

  // When user hovers drops icon onto face, display image where face is looking
  // towards center and appears a bit less sad
  $faceImg.attr('src', 'assets/images/sad-face-3.png');

  huhSound.play();
  huhSound.volume = 0.2;
}

// masterDrag()
//
// Called when the user starts to drag one of the master images
function masterDrag() {
  // Add new master version onto page (since we're dragging away it's element)
  // cloning currently selected icon
  $icon.append($(this).clone());
  // Now that clone has been made, we can safely make the one we're dragging not the master
  $(this).removeClass('master');
  // Remove the 'start' event so it doesn't keep duplicating
  $(this).draggable({
    start: undefined
  });
}

// respond()
//
// The face responds when asked if happy, by generating and displaying a response
// from the array of reponses
function respond() {
  // Generating a random response from the array
  let randomResponse = responses[Math.floor(Math.random() * responses.length)];
  // Displaying it, and fading it out after a delay
  $("#response").text('No ' + randomResponse);
  // ********** remove hard-coded values here
  $("#response").show().delay(3000).fadeOut(250);

  // When user clicks button asking face if it is happy, display image with tear
  // because they realize how sad they truly are
  $faceImg.attr('src', 'assets/images/sad-face-1.png');

  // Also play a random crying sound from the array to show how truly sad they are
  let randomCryingSound = cryingSounds[Math.floor(Math.random() * cryingSounds.length)];
  randomCryingSound.play();
}

// changingFaceColor
//
// Face will animate (fade) from one shade of blue to another
function changingFaceColor() {
  $faceBg.animate({
    backgroundColor: '#0077b3;'
  }, 2500, function() {
    changingFaceColor2();
  });
}

// changingFaceColor
//
// This is second part (other color) for face color fade effect
function changingFaceColor2() {
  $faceBg.animate({
    backgroundColor: '#005580'
  }, 2500, function() {
    changingFaceColor();
  });
}

// closeInstructions()
//
// Trigged when user closes instructions dialog box
// this starts the sad background music and makes icon labels appear then fade out
// after delay
function closeInstructions() {
  sadMusic.play();
  // Loop music
  sadMusic.loop = true;

  $label.show();

  setInterval(function() {
    $label.fadeOut(800);
  }, 5000);
}
