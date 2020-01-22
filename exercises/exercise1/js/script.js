"use strict";

/********************************************************************

Exercise 1 - Pixel Painter Pro
Original code by Pippin Bar
Edited by Amanda Clement

*********************************************************************/

// Constants
const numPixels = 1000;
const delay = 1000;
const defaultColor = '#000000';

// To rotate the pixels
let rotation = 0;

// Set up our starting function for when the page loads
window.onload = setup;

// rotate() is called when key is pressed down
document.addEventListener('keydown', rotate);

// setup
//
// Adds DIVs to the page along with event listeners that will allow
// then to change color on mouseover.
function setup() {
  // A loop that runs once per pixel we need
  for (let i = 0; i < numPixels; i++) {
    // Create a DIV and store it in a variable
    let pixel = document.createElement('div');
    // Add the 'pixel' class to the new element
    pixel.setAttribute('class', 'pixel');
    document.body.appendChild(pixel);

    // Add a mouseover handler to the new element
    pixel.addEventListener('mouseover', paint);
    // Add a click handler to the new element
    pixel.addEventListener('click', remove);
  }
}

// paint
//
// Called by the mouseover event handler on each pixel. Changes
// the pixel's color and sets a timer for it to revert
function paint(e) {
  // e.target contains the specific element moused over so let's
  // save that into a variable for clarity.
  let pixel = e.target;

  // Math.floor to round to nearest integer (downwards)
  // Math.random returns number in range of 0-1
  let r = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);

  let paintedColor = `rgb(${r},${g},${b})`;
  // To choose random painting color each time user paints a pixel
  pixel.style.backgroundColor = paintedColor;

  // Set a timeout to call the reset function after a delay
  // When we pass additional parameters (like 'pixel' below) they
  // are passed to the callback function (resetPixel)
  setTimeout(resetPixel, delay, pixel);
}

// resetPixel
//
// Takes provided pixel element and sets color back to black (bg color)
function resetPixel(pixel) {
  pixel.style.backgroundColor = defaultColor; // back to black
}

// remove
//
// To remove pixel color when user clicks on it
function remove(e) {
  let pixel = e.target;
  pixel.style.backgroundColor = defaultColor; // back to black
}

// rotate
//
// User can rotate all pixels using arrow keys
function rotate(e) {
  // Use pixel class to put them all into variable
  let pixels = document.getElementsByClassName('pixel');

  if (e.keyCode === 37) { // left arrow pressed
    rotation -= 1; // rotate counter-clockwise
  } else if (e.keyCode === 39) { // left arrow pressed
    rotation += 1; // rotate clockwise
  }
  // Updating rotation for all pixels
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.transform = `rotate(${rotation}deg)`;
  }
}
