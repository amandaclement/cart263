"use strict";

/********************************************************************

Project 2
Amanda Clement

*********************************************************************/

let $heart;
let $repost;

let likeComments = [
  'Nice one!',
  'Glad you liked it',
  'I like that one too'
];

let repostComments = [
  'Great repost!',
  'Thanks for sharing that',
  'It has been reposted'
];

let $posts;

// When the document is loaded, we call the setup function
$(document).ready(setup);

// setup()
//
// This code will run when the document is ready
function setup() {
  // Storing HTML elements inside their respective variables
  $heart = $(".fa-heart");
  $repost = $(".fa-retweet");

  $heart.on('click',liked);
  $repost.on('click',reposted);

  $posts = $(".post");

  for (let i = 0; i < 2; i++) {
    //$posts[i].show();
}

  // startButton();
  // annyangSetup();
  newsFeed();
  //managingPosts();
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

  let $addName = $('#addName');
  $addName.text(tag);

  // Creating the yesButton
  let $yesButton = $('<div></div>');
  // Give it the yes class
  $yesButton.addClass('yes');
  // Set the text in the div to 'Yes'
  $yesButton.text('Yes');
  // Turn the div into a button using jQuery UI's .button() method
  $yesButton.button();
  // Listen for a click on the button - progress to the topics page
  $yesButton.on('click', newsFeed);
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

// newsFeed()
//
// Creating and displaying their newsfeed
function newsFeed() {
  // Hide the intro text and the buttons
  $('#intro').hide();
  $('.yes').hide();
  $('.no').hide();

  $('#mainContent').delay(400).fadeIn('slow');
  responsiveVoice.speak('I have just generated your newsfeed. Click on the microphone icon next to any section title for more information. Happy browsing!', 'UK English Female');

  // Listen for a click on the 'Recommended Articles' microphone icon (mic1)
  // if clicked, activate speech
  $('.mic1').on('click', function() { responsiveVoice.speak('Here is a list of articles I generated for you. I filtered them from a larger database to display the best content. Click on a link to read the full article.', 'UK English Female') });

  // Listen for a click on the 'Social Feed' microphone icon (mic2)
  // if clicked, activate speech
  $('.mic2').on('click', function() { responsiveVoice.speak('These topics appear to be frequently discussed on social media platforms. Here are some of the trending posts. You can repost or like them by clicking the appropriate icon.', 'UK English Female') });
}

// liked()
//
// Make heart red when clicked as if the user has liked the post, and generate
// a comment from the likeComments array for Alice to say
// after a delay, fade the entire post away
function liked() {
  $(this).css('color','#E60000');
  let generatingLikeComment = likeComments[Math.floor(Math.random() * likeComments.length)];
  responsiveVoice.speak(generatingLikeComment, 'UK English Female');
  $(this).parent().delay(300).fadeOut(500);
}

// reposted()
//
// Make repost icon blue when clicked as if the user has reposted it, and generate
// a comment from the repostComments array for Alice to say
// after a delay, fade the entire post away
function reposted() {
  $(this).css('color','#1A8CFF');
  let generatingRepostComment = repostComments[Math.floor(Math.random() * repostComments.length)];
  responsiveVoice.speak(generatingRepostComment, 'UK English Female');
}
