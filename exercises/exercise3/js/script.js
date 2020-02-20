"use strict";

/*****************

Exercise 3 - Slamina Special
Original Code by Pippin Barr
Edited by Amanda Clement

A simple guessing game based on voice synthesis. The computer reads out an
animal name, but it reads it backwards. The user selects the animal they
think it is and either gets it right or wrong. If right, a new level is generated.
If wrong, the voice reads it out again.

Uses:

ResponsiveVoice
https://responsivevoice.org/

Animal names from:
https://github.com/dariusk/corpora/blob/master/data/animals/common.json

******************/

// Verify if the game has started
let start = false;

// An array of animal names that we use to create our guessing game
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];

// Array of compliments to be said when correct answer is selected
let compliments = [
  "nice one!",
  "keep it up!",
  "well played!",
  "you got it!",
  "sweet!"
];

// Array of insults to be said when user gives up
let insults = [
  "seriously?",
  "are you even trying?",
  "you're not very good",
  "put in some effort"
];

// Array of negatives to be said when user selects wrong answer
let negatives = [
  "not that one",
  "no",
  "nope",
  "nah",
  "try again"
]

// A variable to store the giveUp text element
let commands;

// We need to track the correct button for each round
let $correctButton;
// We also track the set of buttons
let buttons = [];
// How many possible answers there are per round
const NUM_OPTIONS = 5;

// To calculate score - it starts at 0
let score = 0;

// Get setup!
$(document).ready(setup);

// setup()
//
// We just start a new round right away!
function setup() {
  // Making background color turquoise and content to center of page
  $('body').css('backgroundColor','#5DD7D2').css('textAlign','center');

  // Creating score div
  let $score = $('<div></div>');
  // Give it the store class
  $score.addClass("score");
  // Set the text in the div to the score
  $score.text(score);
  // Making it the same font as the animal labels (Helvetica)
  // and increase the font-size
  $score.css('fontFamily','Helvetica').css('fontSize','24px');
  // Add the score to the page so we can see it
  $('body').append($score);

  // Making sure annyang is available
  if (annyang) {
    // Add commands to annyang - it should listen
    let commands = {
      // Saying 'I think it is X' triggers the handleGuess function
      "I think it is *tag": handleGuess,
      // Saying 'I give up' triggers the giveUp function
      "I give up": giveUp,
      // Saying 'Say it again' makes it repeat the answer backwards
      "Say it again": function() { sayBackwards($correctButton.text()) }
    };

    // The giveUp command has been defined so give it to annyang
    // by using the .addCommands() function
    annyang.addCommands(commands);

    // Tell annyang to start listening
    // by using the .start() function
    annyang.start();
  }
newRound();// Instructions
}

// newRound()
//
// Generates a set of possible answers randomly from the set of animals
// and adds buttons for each one. Then chooses the correct button randomly.
function newRound() {
  // We empty the buttons array for the new round
  buttons = [];
  // Loop for each option we'll offter
  for (let i = 0; i < NUM_OPTIONS; i++) {
    // Choose the answer text randomly from the animals array
    let answer = getRandomElement(animals);
    // Add a button with this label
    let $button = addButton(answer);
    // Add this button to the buttons array
    buttons.push($button);
  }
  // Choose a random button from the buttons array as our correct button
  $correctButton = getRandomElement(buttons);
  // Say the label (text) on this button
  sayBackwards($correctButton.text());
}

// sayBackwards(text)
//
// Uses ResponsiveVoice to say the specified text backwards!
function sayBackwards(text) {
  // We create a reverse version of the name by:
  // 1. using .split('') to split the string into an array with each character
  // as a separate element.
  // e.g. "bat" -> ['b','a','t']
  // 2. using .reverse() on the resulting array to create a reverse version
  // e.g. ['b','a','t'] -> ['t','a','b']
  // 3. using .join('') on the resulting array to create a string version of the array
  // with each element forming the string (joined together with nothing in between)
  // e.g. ['t','a','b'] -> "tab"
  // (We do this all in one line using "chaining" because .split() returns an array for
  // for .reverse() to work on, and .reverse() returns an array for .join() to work on.)
  let backwardsText = text.split('').reverse().join('');

  // Set some random numbers for the voice's pitch and rate parameters for a bit of fun
  let options = {
    pitch: Math.random(),
    rate: Math.random()
  };

  // Use ResponsiveVoice to speak the string we generated, with UK English Male voice
  // and the options we just specified.
  responsiveVoice.speak(backwardsText, 'UK English Male', options);
}

// addButton(label)
//
// Creates a button using jQuery UI on a div with the label specified
// and adds it to the page, returning the button as well
function addButton(label) {
  // Create a div with jQuery using HTML
  let $button = $('<div></div>');
  // Give it the guess class
  $button.addClass("guess");
  // Set the text in the div to our label
  $button.text(label);
  // Turn the div into a button using jQuery UI's .button() method
  $button.button();
  // Listen for a click on the button which means the user has guessed
  $button.on('click', handleGuess);
  // Finally, add the button to the page so we can see it
  $('body').append($button);
  // Making buttons bluish-purple, making text white, and removing border
  $button.css('backgroundColor', '#7976FF').css('color', '#FFFFFF').css('border', '0').css('margin', '20px').css('display', 'block');
  // Return the button
  return $button;
}

// handleGuess()
//
// Checks whether this was the correct guess (button) and
// if so starts a new round
// if not indicates it was incorrect
function handleGuess(tag) {
  // If the button they clicked on has the same label as
  // the correct button, it must be the right answer...
  // this also applies if they said 'I think it is X', where X is the answer
  if (($(this).text() === $correctButton.text()) || (tag === $correctButton.text())) {
    // Clear the buttons
    clearButtons();
    // Start a new round
    setTimeout(newRound, 1000);
    // Adding 1 point to the score
    score += 1;
    // And displaying it
    $('.score').text(score);

    // Generate a random compliment from the array and say it when they get the correct answer
    let compliment = getRandomElement(compliments);
    responsiveVoice.speak(compliment, 'UK English Male');
  }   else {
    // Generate a random negative from the array and say it when they get the wrong answer
    let negative = getRandomElement(negatives);
    responsiveVoice.speak(negative, 'UK English Male');
    // Otherwise they were wrong, so shake the clicked button
    $(this).effect('shake');
    // And say the correct animal again to "help" them
    sayBackwards($correctButton.text());
    // Setting score back to zero
    score = 0;
    // And displaying it
    $('.score').text(score);
  }
}

// getRandomElement(array)
//
// Returns a random element from the provided array
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}

// giveUp()
//
// Called by annyang when it hears 'I give up'
// the correct answer is highlighted and the next round begins
function giveUp() {
    // Highlight the correct answer in orange
    $correctButton.css('backgroundColor','#FF812D');
    // Generate a random insult from the array and say it when they get they give up
    let insult = getRandomElement(insults);
    responsiveVoice.speak(insult, 'UK English Male');
    setTimeout (clearButtons, 1500);
    // Generate new round
    setTimeout(newRound, 2000);
}

// clearButtons
//
// Clear the buttons (so that we can generate new ones for the next round)
function clearButtons() {
  $('.guess').remove();
}
