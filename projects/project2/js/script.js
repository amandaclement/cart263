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
// The title (intro text) fades in and Alice (our virtual assistant) introduces herself
function intro() {
  // Hide the start button
    $('.start').hide();
    // Fade in 'Alice'
    $('h1').delay(200).fadeIn('slow');
    // Fade in 'Your Virtual Assistant'
    $('h2').delay(800).fadeIn('slow');
    // Fade in 'My name is _____'
    $('.instructions').delay(5000).fadeIn('slow');
    // Alice introduces herself
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
// and the user confirms whether it was said correctly by clicking appropriate button
function name(tag) {
  let repeatName = tag + ',did I say that correctly?';
  responsiveVoice.speak(repeatName, 'UK English Female');

  // Creating the yesButton
  let $yesButton = $('<div></div>');
  // Give it the yes class
  $yesButton.addClass('yes');
  // Set the text in the div to 'Yes'
  $yesButton.text('Yes');
  // Turn the div into a button using jQuery UI's .button() method
  $yesButton.button();
  // Listen for a click on the button - progress to the topics page
  $yesButton.on('click', topics);
  // Finally, add the button to the page so we can see it
  $('body').append($yesButton);

  // Creating the noButton
  let $noButton = $('<div></div>');
  // Give it the no class
  $noButton.addClass('no');
  // Set the text in the div to 'No'
  $noButton.text('No');
  // Turn the div into a button using jQuery UI's .button() method
  $noButton.button();
  // Listen for a click on the button - if clicked, ask them to try again
  $noButton.on('click', function() { responsiveVoice.speak('Please try again.', 'UK English Female') });
  // Finally, add the button to the page so we can see it
  $('body').append($noButton);
}

// topics()
//
// The user is prompted to select their preferred topic from the list
// which will determine the type of content that will appear next
function topics() {
  // Hide the intro text and the buttons
  $('#intro').hide();
  $('.yes').hide();
  $('.no').hide();
}
