"use strict";


// Exercise 4 - Condiments Cacophony by Amanda Clement
// Uses: Corpora
// https://github.com/dariusk/corpora

// An array of vowels
let vowels = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o'];

$(document).ready(setup);

function setup() {
  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON("assets/data/data.json")
    .done(dataLoaded)
    .fail(dataError);

  // Reloading content when user clicks
  $(document).click(function() {
    location.reload(true);
  });

  // Some basic styling
  $('body').css({
    'font-family': 'Arial',
    'font-weight': 'bold',
    'text-align': 'center',
    'margin-top': '100px',
    'background-color': '#FFDB58',
    'font-size': '150%',
    'color': '#000080'
  });
}

// dataLoaded(data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function dataLoaded(data) {
  // Now we select random elements from the three arrays inside
  // our JSON to get a random condiment, cat, and room. Then we add those
  // words onto our page by setting the text of the appropriate span.

  // Getting a random element from each array
  let randomCondiment = getRandomElement(data.condiments);
  let randomCat = getRandomElement(data.cats);
  let randomRoom = getRandomElement(data.rooms);
  let randomCountry = getRandomElement(data.countries);
  let randomWineDescription = getRandomElement(data.wine_descriptions);
  let randomMenuItems = getRandomElement(data.menuItems);

  // Assume it's singular
  let verb = "is";

  // Check if the last latter of the condiment is an 's'
  // charAt asks for a specific character in the string
  if (randomCondiment.charAt(randomCondiment.length - 1) === "s") {
    // If so, assume it's plural (this is a flawed assumption)
    verb = "are";
  }

  // Assume that the noun (randomCat) doesn't start with a vowel
  let articleCat = "a";

  // Assume that the noun (randomRoom) doesn't start with a vowel
  let articleRoom = "a";

  // Check if the randomCat or randomRoom starts with an a, e, i, or o
  // if so, make the respective article become 'an' instead of 'a'
  for (let i = 0; i < vowels.length; i++) {
    if (randomCat.charAt(0) === vowels[i]) {
      articleCat = "an";
    }
    if (randomRoom.charAt(0) === vowels[i]) {
      articleRoom = "an";
    }
  }

  // Generating a description (string)
  let description = `${randomCondiment} ${verb} like ${articleCat} ${randomCat} in ${articleRoom} ${randomRoom} in ${randomCountry}. On another note, don't you just love ${randomWineDescription} ${randomMenuItems}.`;
  // Add it to the page
  $('body').append(description);
}

// dataError()
//
// Called if the JSON does not load for some reason.
// Reports the error to the console.
function dataError(request, textStatus, error) {
  console.error(error);
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  // Math.floor means round a number downward to its nearest integer
  let element = array[Math.floor(Math.random() * array.length)];
  // return stops the execution of a function and returns a value
  // from that function
  return element;
}
