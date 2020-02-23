"use strict";

/********************************************************************

Project 2
Amanda Clement

*********************************************************************/

// When the document is loaded, we call the setup function
$(document).ready(setup);

// setup()
//
// This code will run when the document is ready
function setup() {
  startButton();
  annyangSetup();
}

// startButton()
//
// Creating the start button
function startButton() {
  let $startButton = $('<div></div>');
  // Give it the start
  $startButton.addClass('start');
  // Set the text in the div
  $startButton.text('Click here to begin');
  // Turn the div into a button using jQuery UI's .button() method
  $startButton.button();
  // Listen for a click on the button which means Alice's intro should appear
  $startButton.on('click', intro);
  // Finally, add the button to the page so we can see it
  $('body').append($startButton);
}

// intro
//
// Alice (our virtual assistant) introduces herself
function intro() {
    $('.start').hide();
    $('h1').delay(200).fadeIn('slow');
    $('h2').delay(800).fadeIn('slow');
    $('.instructions').delay(5000).fadeIn('slow');
    responsiveVoice.speak('Welcome, my name is Alice. I am your virtual assistant. To get started, please say your name.', 'UK English Female');
  }

// annyangSetup()
//
// Using annyang for the user's name (annyang will repeat it)
function annyangSetup() {
  // Making sure annyang is available
  if (annyang) {
    // Add commands to annyang - it should listen
    let commands = {
      // Saying 'My name is X' triggers the name function
      "My name is *tag": name
    };

    // The name command has been defined so give it to annyang
    // by using the .addCommands() function
    annyang.addCommands(commands);

    // Tell annyang to start listening
    // by using the .start() function
    annyang.start();
  }
}

// name(tag)
//
// Annyang checks the user's name by repeating it
function name(tag) {
  let repeatName = tag + ',did I say that correctly?';
  responsiveVoice.speak(repeatName, 'UK English Female');
}
