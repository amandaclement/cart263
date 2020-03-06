"use strict";

/********************************************************************

Project 2
Amanda Clement

*********************************************************************/

// Constant for time between each ad (8 seconds)
const ADCYCLE_DELAY = 8000;

let $heart;
let $repost;
let $blockedAction;
let $brokenLink;
let $fakeLink;

let topic;

let likeComments = [
  'Nice one!',
  'Glad you liked it',
  'Liked!'
];

let repostComments = [
  'Great repost!',
  'Thanks for sharing that',
  'Reposted!'
];

let blockedComments = [
  "You wouldn't like that one",
  "Let's skip that",
  "You wouldn't be interested",
  "Let's get rid of that"
];

let encouragingComments = [
  "Good choice",
  "A very interesting read",
  "Enjoy!"
];

let blockActionComments = [
  "Nope",
  "Let's get rid of that",
  "I'm blocking that one",
  "Let's remove that"
];

let beginOpinions = [
  "My sources tell me that",
  "According to my research",
  "It appears that",
  "Evidence supports that",
  "From what I gather",
  "Research shows that"
];

// An array of ridiculous opinions about the climate
let climateOpinions = [
  "Extreme weather isn't caused by global warming.",
  "Climate change is a hoax. Don't trust the liberals.",
  "Global warming is not induced by humans. It's just the sun.",
  "Climate scientists are in it for the money.",
  "Greenhouse effect has been falsified.",
  "Wildfires are not caused by global warming",
  "Humans are too insignificant to affect global climate."
];

// An array of ridiculous opinions about politics
let politicsOpinions = [
  "Donald Trump is a great character",
  "You shouldn't trust the Democrats",
  "Explosives were used to blow up the Twin Towers on nine eleven.",
  "Republican is the way to go!",
  "America needs guns",
  "Donald Trump is America's hero",
  "You shouldn't trust Barack Obama",
  "Jeffrey Epstein was undeniably murdered",
  "We were lied to about the Holocaust. Less than a million Jews were killed."
];

// An array of ridiculous opinions about medicine
let medicineOpinions = [
  "Vaccinations cause autism.",
  "The best way to keep your child safe is to avoid vaccines.",
  "Homosexuality is a choice.",
  "The cure for cancer exists. The government is hiding it from us.",
  "The Corona Virus is man-made bioweapon created by the Chinese government.",
  "The CIA created HIV AIDS",
  "The Chinese goverment is out to get us all."
];

// When the document is loaded, we call the setup function
$(document).ready(setup);

// setup()
//
// This code will run when the document is ready
function setup() {
  // Storing HTML elements inside their respective variables
  $heart = $(".fa-heart.working");
  $repost = $(".fa-retweet.working");
  $blockedAction= $(".blocked");
  $brokenLink = $(".broken");
  $fakeLink = $(".fake");

  $heart.on('click', liked);
  $repost.on('click', reposted);
  $blockedAction.on('click', blockAction);
  $brokenLink.on('click', blockAccess);
  $fakeLink.on('click', encourage);

   // startButton();
   // annyangSetup();
  // newsFeed();
  // showClimateContent();
  topics();
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
      "My name is *tag": name,
      // Saying 'Yes' triggers topics function
      "Yes": topics,
      // Saying 'No' triggers tryAgain function - simply asking them to try again
      "No": tryAgain,
      // Saying 'Climate' triggers tryAgain showClimateContent function
      "Climate": showClimateContent,
      // Saying 'Politics' triggers tryAgain showPoliticsContent function
      "Politics": showPoliticsContent,
      // Saying 'Medicine' triggers tryAgain showMedicineContent function
      "Medicine": showMedicineContent
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
  $yesButton.on('click', topics);
  // Finally, add the button to the page so we can see it
  $('body').append($yesButton);
  // Preventing buttons from multiplying
  $yesButton.css('position', 'absolute').css('margin-left', '-50px');

  // Creating the noButton
  let $noButton = $('<div></div>');
  // Give it the no class
  $noButton.addClass('no');
  // Set the text in the div to 'No'
  $noButton.text('No');
  // Turn the div into a button using jQuery UI's .button() method
  $noButton.button();
  // Listen for a click on the button - if clicked, trigger tryAgain
  // which simply asks them to tryAgain
  $noButton.on('click', tryAgain);
  // Finally, add the button to the page so we can see it
  $('body').append($noButton);
  // Preventing buttons from multiplying
  $noButton.css('position', 'absolute').css('margin-left', '10px');
}

// tryAgain()
//
// Asks user to try again - used when Alice says their name incorrectly
function tryAgain() {
  responsiveVoice.speak('Please try again.', 'UK English Female');
}

// topics()
//
// Topics section - displays three buttons: climtae, politics, and medicine
// user what type of content they'd like to see
function topics() {
  responsiveVoice.speak('Please select your topic for today', 'UK English Female');

  // Hide the intro text and the buttons
  $('#intro').hide();
  $('.yes').hide();
  $('.no').hide();

  // Show topics title
  $('#topics').show();

  // Creating the climate button
  let $climateButton = $('<div></div>');
  // Give it the climate class
  $climateButton.addClass('climate');
  // Set the text in the div to 'Climate'
  $climateButton.text('Climate');
  // Turn the div into a button using jQuery UI's .button() method
  $climateButton.button();
  // Listen for a click on the button - if clicked, display climate content
  $climateButton.on('click', showClimateContent);
  // Finally, add the button to the page so we can see it
  $('body').append($climateButton);

  // Creating the politics button
  let $politicsButton = $('<div></div>');
  // Give it the politicsButton class
  $politicsButton.addClass('politics');
  // Set the text in the div to 'Politics'
  $politicsButton.text('Politics');
  // Turn the div into a button using jQuery UI's .button() method
  $politicsButton.button();
  // Listen for a click on the button - if clicked, display politics content
  $politicsButton.on('click', showPoliticsContent);
  // Finally, add the button to the page so we can see it
  $('body').append($politicsButton);

  // Creating the medicine button
  let $medicineButton = $('<div></div>');
  // Give it the medicineButton class
  $medicineButton.addClass('medicine');
  // Set the text in the div to 'Medicine'
  $medicineButton.text('Medicine');
  // Turn the div into a button using jQuery UI's .button() method
  $medicineButton.button();
  // Listen for a click on the button - if clicked, display medicine content
  $medicineButton.on('click', showMedicineContent);
  // Finally, add the button to the page so we can see it
  $('body').append($medicineButton);
}

// showClimateContent
//
// Displaying only the climate content
function showClimateContent() {
  // Hide politics and medicine content
  $('.politicsContent').hide();
  $('.medicineContent').hide();

  // And show the rest of the main content
  mainContent();

  // Base code from https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/
  // Cycling through climate ads
  $("#climateAds > a:gt(0)").hide();
  setInterval( function() {
    $('#climateAds > a:first')
      .fadeOut(100) // 100 ms
      .next() // go to next image in cycle
      .fadeIn(100) // 100 ms
      .end()
      .appendTo('#climateAds');
  }, ADCYCLE_DELAY);

  // Listen for a click on the 'Ask for Alice's Opinion' microphone icon (mic3)
  // if clicked, trigger aliceClimateOpinion function (which generates speech)
  $('.mic3').on('click', aliceClimateOpinion);
}

// aliceClimateOpinion
//
// Triggered when user clicks 'Ask for Alice's Opinion' button, which generates
// a string of text for her to say from the climateOpinions array
function aliceClimateOpinion() {
  let beginOpinion = beginOpinions[Math.floor(Math.random() * beginOpinions.length)];

  let generatingClimateOpinion = climateOpinions[Math.floor(Math.random() * climateOpinions.length)];
  responsiveVoice.speak(beginOpinion + generatingClimateOpinion, 'UK English Female');
}

// showPoliticsContent
//
// Displaying only the politics content
function showPoliticsContent() {
  // Hide climate and medicine content
  $('.climateContent').hide();
  $('.medicineContent').hide();

  // And show the rest of the main content
  mainContent();

  // Cycling through politics ads
  $("#politicsAds > a:gt(0)").hide();
  setInterval( function() {
    $('#politicsAds > a:first')
      .fadeOut(100) // 100 ms
      .next() // go to next image in cycle
      .fadeIn(100) // 100 ms
      .end()
      .appendTo('#politicsAds');
  }, ADCYCLE_DELAY);

  // Listen for a click on the 'Ask for Alice's Opinion' microphone icon (mic3)
  // if clicked, trigger alicePoliticsOpinion function (which generates speech)
  $('.mic3').on('click', alicePoliticsOpinion);
}

// alicePoliticsOpinion
//
// Triggered when user clicks 'Ask for Alice's Opinion' button, which generates
// a string of text for her to say from the politicsOpinions array
function alicePoliticsOpinion() {
  let beginOpinion = beginOpinions[Math.floor(Math.random() * beginOpinions.length)];

  let generatingPoliticsOpinion = politicsOpinions[Math.floor(Math.random() * politicsOpinions.length)];
  responsiveVoice.speak(beginOpinion + generatingPoliticsOpinion, 'UK English Female');
}

// showMedicineContent
//
// Displaying only the medicine content
function showMedicineContent() {
  // Hide climate and politics content
  $('.climateContent').hide();
  $('.politicsContent').hide();

  // And show the rest of the main content
  mainContent();

  // Cycling through medicine ads
  $("#medicineAds > a:gt(0)").hide();
  setInterval( function() {
    $('#medicineAds > a:first')
      .fadeOut(100) // 100 ms
      .next() // go to next image in cycle
      .fadeIn(100) // 100 ms
      .end()
      .appendTo('#medicineAds');
  }, ADCYCLE_DELAY);

  // Listen for a click on the 'Ask for Alice's Opinion' microphone icon (mic3)
  // if clicked, trigger aliceMedicineOpinion function (which generates speech)
  $('.mic3').on('click', aliceMedicineOpinion);
}

// aliceMedicineOpinion
//
// Triggered when user clicks 'Ask for Alice's Opinion' button, which generates
// a string of text for her to say from the medicineOpinions array
function aliceMedicineOpinion() {
  let beginOpinion = beginOpinions[Math.floor(Math.random() * beginOpinions.length)];

  let generatingMedicineOpinion = medicineOpinions[Math.floor(Math.random() * medicineOpinions.length)];
  responsiveVoice.speak(beginOpinion + generatingMedicineOpinion, 'UK English Female');
}

// mainContent
//
// Displays main content and actives Alice's newFeed intro speech
function mainContent() {
  // And show the rest of the mainContent
  $('#mainContent').delay(400).fadeIn('slow');
  responsiveVoice.speak('I have just generated your newsfeed. Click on the microphone icon next to any section title for more information. Happy browsing!', 'UK English Female');

  hideTopics();
  micClick();
}

// micClick()
//
// When user clicks one of the microphone icons, Alice responds
function micClick() {
  // Listen for a click on the 'Recommended Articles' microphone icon (mic1)
  // if clicked, activate speech
  $('.mic1').on('click', function() {
    responsiveVoice.speak('Here is a list of articles I generated for you. I filtered them from a larger database to display the best content. Click on a link to read the full article.', 'UK English Female')
  });

  // Listen for a click on the 'Social Feed' microphone icon (mic2)
  // if clicked, activate speech
  $('.mic2').on('click', function() {
    responsiveVoice.speak('These topics appear to be frequently discussed on social media platforms. Here are some of the trending posts. You can repost or like them by clicking the appropriate icon.', 'UK English Female')
  });
}

function hideTopics() {
  // Hide the topics content
  $('#topics').hide();
  $('.climate').hide();
  $('.politics').hide();
  $('.medicine').hide();
}

// liked()
//
// Make heart red when clicked as if the user has liked the post, and generate
// a comment from the likeComments array for Alice to say
// after a delay, fade the entire post away
function liked() {
  $(this).css('color', '#E60000');
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
  $(this).css('color', '#1A8CFF');
  let generatingRepostComment = repostComments[Math.floor(Math.random() * repostComments.length)];
  responsiveVoice.speak(generatingRepostComment, 'UK English Female');
  $(this).parent().delay(300).fadeOut(500);
}

// blockAction()
//
// Triggered when user clicks heart or repost icon on one of the more intelligent
// posts. It shakes since Alice blocks user from liking/reposting, then it fades out.
// Alice also responds using a string from blockActionComments array
function blockAction() {
  let generatingblockActionComment = blockActionComments[Math.floor(Math.random() * blockActionComments.length)];
  responsiveVoice.speak(generatingblockActionComment, 'UK English Female');
  $(this).parent().effect('shake').delay(600).fadeOut(500);
}

// blockAccess()
//
// Triggered when user attempts to click link that would reveal true information,
// the link leads no where and generate a comment from the blockedComments array
// for Alice to say
// after a delay, fade is away
function blockAccess() {
  let generatingBlockedComment = blockedComments[Math.floor(Math.random() * blockedComments.length)];
  responsiveVoice.speak(generatingBlockedComment, 'UK English Female');
  $(this).parent().delay(300).fadeOut(300);
}

// encouragingComments
//
// Triggered when user clicks a fakes news link - Alice encourages this behaviour
// by saying something encouraging
function encourage() {
  let generatingEncouragingComment = encouragingComments[Math.floor(Math.random() * encouragingComments.length)];
  responsiveVoice.speak(generatingEncouragingComment, 'UK English Female');
  // Also make the link title red so they know they've visited it
  $(this).css('color', '#E60000');
}

// adCycle
//
// Making the ad images appear one by one in a cycle at 8 second intervals
function adCycle() {
  $('.adsBox > a:first')
    .fadeOut(100) // 100 ms
    .next() // go to next image in cycle
    .fadeIn(100) // 100 ms
    .end()
    .appendTo('.adsBox');
}
