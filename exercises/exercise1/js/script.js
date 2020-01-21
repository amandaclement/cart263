"use strict";

/********************************************************************

Title of Project
Author Name

This is a template. Fill in the title, author, and this description
to match your project! Write JavaScript to do amazing things below!

*********************************************************************/

let numPixels = 1000;
let delay = 1000;

window.onload = setup;

function setup() {
  console.log('hello');

  for (let i = 0; i < numPixels; i++) {
    let pixel = document.createElement('div');
    pixel.setAttribute('class','pixel');
    document.body.appendChild(pixel);

    pixel.addEventListener('mouseover', paint);

    pixel.addEventListener('click', remove);
  }
}

function paint(e) {
  // Math.floor to round to nearest integer (downwards)
  // Math.random returns number in range of 0-1
  let r = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);

  let pixel = e.target;
  // To choose random painting color each time user paints a pixel
  pixel.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";;

  setTimeout(resetPixel, delay, pixel);
}

function resetPixel(pixel) {
  pixel.style.backgroundColor = 'blue';
}

// Function to remove pixel color when user clicks on it
function remove(e) {
  let pixel = e.target;
  pixel.style.backgroundColor = '#000000';
}
