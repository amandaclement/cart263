"use strict";

/********************************************************************

Project 1
Amanda Clement

*********************************************************************/

// sounds effects will go here as constants

let $heart;
let $face;

// When the document is loaded, we call the setup function
$(document).ready(setup);

function setup() {
  $heart = $("#heart");
  $face = $("#face");

  $heart.draggable({
    // reverts back to original position when dropped
    // revert: true,
    // putting clone (placeholder) in place so that only a copy of img is dragged
    // as if original image is fixed
    helper: "clone",
    // contain within container div to remove scroll
    containment: "#containment-wrapper",
    scroll: false
  });

  $face.droppable({
    drop: onDrop
  });
}

function onDrop(event, ui) {

}
