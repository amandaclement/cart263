"use strict";

/********************************************************************

Project 1
Amanda Clement

*********************************************************************/

// sounds effects will go here as constants

let $heart;
let $faceImg;
let $faceBg;

// When the document is loaded, we call the setup function
$(document).ready(setup);

// setup()
//
// Sets the click handler and starts the time loop
function setup() {
  $heart = $("#heart");
  $faceImg = $("#face-img");
  $faceBg = $("#face-bg");

  // Handling when user mouses over draggable elements (icons)
  // Deals with "master" version of images, and clones so you can keep
  // dragging and dropping them infinitly
  $('.icon').on('mouseover', '.master', function() {
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
  $faceImg.droppable({
    drop: onDrop
  });
}

// onDrop()
//
// When user drops icon onto face - hide icon by scaling it down
function onDrop(event, ui) {
  //$faceImg.attr('src', 'assets/images/sad-face-1.png');
  // Icons scale down (shrinks) until it disappears on face
  ui.draggable.hide('scale');
}

// masterDrag()
//
// Called when the user starts to drag one of the master images
function masterDrag() {
  // Add new master version onto page (since we're dragging away it's element)
  // cloning currently selected icon
  $('.icon').append($(this).clone());
  // Now that clone has been made, we can safely make the one we're dragging not the master
  $(this).removeClass('master');
  // Remove the 'start' event so it doesn't keep duplicating
  $(this).draggable({
    start: undefined
  });
}
