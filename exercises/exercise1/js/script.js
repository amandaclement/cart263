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
  }
}

function paint(e) {
  let pixel = e.target;
  pixel.style.backgroundColor = '#fff';

  setTimeout(resetPixel, delay, pixel);
}

function resetPixel(pixel) {
  pixel.style.backgroundColor = 'blue';
}
