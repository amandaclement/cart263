"use strict";

/********************************************************************

Exercise 2 - Raving Redactionist Redux
Original Code by Pippin Barr
Edited by Amanda Clement

*********************************************************************/

// CONSTANTS
// The chance a span will be revealed per update
const REVEAL_POSSIBILITY = 0.1;
// How often to update the spans (potentially revealing them)
const UPDATE_FREQUENCY = 500;

// To track how many secrets have been found
let secretsFound = 0;
// For total number of secrets
let $secretsTotal;

// To track how many spans are revealed
let numRevealed = 0;

// Storing the jQuery selection of all spans
let $spans;
// And of secrets
let $secrets;

// When the document is loaded we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  // Saving selection of all spans
  $spans = $('span');
  // Setting click handler on spans so we know when they're clicked
  $spans.on('click', spanClicked);
  // Setting time interval (500 milliseconds) to update state of page
  setInterval(update, UPDATE_FREQUENCY);

  // Saving selection of all spans
  $secrets = $('.secret');
  // Setting mouseover handler on secrets
  $secrets.on('mouseover', highlightSecret);

  // Calculating total number of secrets and storing them in variable
  $secretsTotal = $secrets.length;
  // Displaying it on page (for counter)
  $('#total').text($secretsTotal);
}

// spanClicked()
//
// Removing revealed class and adding redacted class when span is clicked
// to black it out
function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

// update()
//
// Updates all spans on page using jQuery's each() function which calls
// the specific function on _each_ of the elements in the selection
// (called every 500 milliseconds)
function update() {
  $('.redacted').each(updateSpan);
}

// updateSpan()
//
// Randomly unblanks current span by removing the redacted class
// and adding the revealed class
// Because this function is called by each(), "this" refers to the current
// element that each has selected.
function updateSpan() {
  let randomNumber = Math.random();
  // 10% probability that redaction on any span will disappear
  if (randomNumber < REVEAL_POSSIBILITY) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
    // Keeping track of number of revealed spans
    numRevealed = $('.revealed').length;
    console.log(numRevealed);

    trackingLoss();
  }
}

// highlightSecret()
//
// Secret is highlighted when user hovers mouse over it
function highlightSecret() {
  // remember: 'this' refers to the targeted element
  $(this).removeClass('redacted');
  $(this).addClass('highlight');

  // Removing mouseover event from secret once it's been found
  $(this).off('mouseover');

  trackingSecrets();
  trackingLoss();
}

// trackingSecrets()
//
// Counting/displaying number of secrets found
function trackingSecrets() {
  // Increase secretsFound counter by 1
  secretsFound += 1;
  // Display total found
  $('#found').text(secretsFound);
}

// trackingLoss()
//
// Tracking whether playing has lost
function trackingLoss() {
  // Player loses right before finding all secrets
  // or once all spans are revealed
  // therefore they lose regardless
  if (secretsFound === ($secretsTotal - 1) || numRevealed === 5) {
    // title changes to tell them they lost
    $('h1').text('You loose.');
    // hide the rest of the content
    $('p').hide();
  }
}
