$(document).ready(function () {
  //Variable Declarations
  var secretNumber = getRandomIntInclusive(1, 100);
  var guessedIt = false;
  var count = 0;
  var prevGuess = 0;
  var guessedByUser = 0;
  var diffPrev = 0;
  var inputList = [];

  //Starting new game in the beginning
  newGame();

  //Handles the form submit
  $("form").on("submit", function (event) {
    event.preventDefault();
    guessedByUser = $("#js-user-guess").val();
    inputList.push(guessedByUser);
    if (!guessedIt) {
      //Checks for previous inputs and calls getAdditionalFeedback
      if (inputList.length !== 0) {
        prevGuess = inputList[inputList.length - 1];
        diffPrev = Math.abs(secretNumber - prevGuess);
      } else {
        diffPrev = 0;
        prevGuess = 0;
      }
      getAdditionalFeedback(diffPrev);

      count += 1;
      $(".count").text(count);
      $("#guessList").append(`<li>` + guessedByUser + `</li>`);
      guessTemprature(guessedByUser);
    } else $("h2#feedback").text("You already won the game. Click New Game to start a new one :)");
    $(".text").val("");
  });

  //Starts new game on click
  $(".js-new-game").on("click", function (event) {
    event.preventDefault();
    newGame();
  });

  //Function to start new game
  function newGame() {
    guessedIt = false;
    $("ul#guessList li").remove();
    $("h2#feedback").text("Make your Guess!");
    $("h4#additional-feedback").text("It's a Fun Game 👌");
    secretNumber = getRandomIntInclusive(1, 100);
    count = 0;
    $(".text").val("");
  }

  //For instruction modal fade in
  $(".js-what").click(function () {
    $(".overlay").fadeIn(1000);
  });

  //For instruction modal fade out
  $(".js-close").click(function () {
    $(".overlay").fadeOut(1000);
  });

  //Gets random secret number to be guessed
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //Guesses Temprature of user input
  function guessTemprature(num) {
    var difference = Math.abs(secretNumber - num);
    if (difference === 0) {
      $("h2#feedback").text("Voila! You guessed it!!");
      $("h4#additional-feedback").text("You got it bud!!");
      guessedIt = true;
    } else if (difference <= 5)
      $("h2#feedback").text("Your Guess is boiling hot!!");
    else if (difference <= 10) $("h2#feedback").text("Your Guess is hot!!");
    else if (difference >= 10 && difference <= 20)
      $("h2#feedback").text("Your Guess is warm!!");
    else if (difference >= 20 && difference <= 30)
      $("h2#feedback").text("Your Guess is cold!");
    else if (difference >= 30 && difference <= 40)
      $("h2#feedback").text("Your Guess is too cold!");
    else $("h2#feedback").text("Your Guess is ice cold!");
  }

  //Function to get additional feedback about input
  function getAdditionalFeedback(num) {
    if (num > 1 && num <= 5)
      $("h4#additional-feedback").text("Recent guess was warmer.");
    else if (num === 1) $("h4#additional-feedback").text("You're very close!");
    else $("h4#additional-feedback").text("Recent guess was colder.");
  }
});
