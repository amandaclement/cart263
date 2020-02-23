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
  // For now, intro is triggered by user click
  $(document).one('click',intro);
  annyangSetup();
}

// intro
//
// Alice (our virtual assistant) introduces herself
function intro() {
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
