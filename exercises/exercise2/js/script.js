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
let $secretsFound;
// For total number of secrets
let $secretsTotal;

// Storing the jQuery selection of all spans
let $spans;

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

  // Calculating total number of secrets and storing them in variable
  $secretsTotal = $('.secret').length;
  // Displaying it on page (for counter)
  $('#total').text($secretsTotal);

  // Saving selection of all spans
  $secrets = $('secret');

  $('.secret').on('mouseover', highlightSecret);
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
  $spans.each(updateSpan);
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
  }
}

// highlightSecret()
//
// Secret is highlighted when user hovers mouse over it
function highlightSecret() {
  // remember: 'this' refers to the targeted element
  $(this).removeClass('redacted');
  $(this).addClass('highlight');
  //}
}
