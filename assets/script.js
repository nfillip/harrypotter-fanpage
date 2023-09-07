//QUIZ! -FILLIP SECTION
var quizSubmitButton = $("#quiz-submit-button");
var quizStartButton = $("#quiz-start-button");
var mainQuizDiv = $("#main-quiz-div");
var randomizeSection = $("#randomize-section");
var secondQuizDiv = $("#second-quiz-div");
var disableSubmitButton;
var GSRH = [
  ["Harry Potter", "Hermione", "Ron", "Ginny", "Neville"],
  ["Draco", "Snape", "Lucius Malfoy", "Crab", "Tom Riddle"],
  [
    "Rowena Ravenclaw",
    "Gilderoy Lockhart",
    "Luna Lovegood",
    "Cho Change",
    "Moaning Myrtle",
  ],
  [
    "Cedric Diggory",
    "Helga Hufflepuff",
    "Nymphadora Tonks",
    "New Scamander",
    "Remus Lupin",
  ],
];
var answerKeyHouses = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];
var answerKeyNames = [
  "Rowena Ravenclaw",
  "Gilderoy Lockhart",
  "Luna Lovegood",
  "Cho Change",
  "Moaning Myrtle",
  "Cedric Diggory",
  "Helga Hufflepuff",
  "Nymphadora Tonks",
  "New Scamander",
  "Remus Lupin",
  "Draco",
  "Snape",
  "Lucius Malfoy",
  "Crab",
  "Tom Riddle",
  "Harry Potter",
  "Hermione",
  "Ron",
  "Ginny",
  "Neville",
];
//Sortable Function through jQueryUI - Fillip
var characterUrl = "https://hp-api.onrender.com/api/characters";

$(function () {
  $("#sortable1, #sortable2, #sortable3, #sortable4")
    .sortable({
      connectWith: ".connectedSortable",
      containment: ".quiz-section",
    })
    .disableSelection();
});

$("#bio").on("click", async function () {
  await fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var input = $(".bioClass").val();
      var char = data.filter(function (char) {
        var name = char.name;

        return name.includes(input);
      });
    });
});

//Quiz Functions
//testanswers
function testAnswers() {
  var testCorrect = true;
  for (var x = 0; x < 4; x++) {
    for (
      var y = 1;
      y < randomizeSection.children().eq(x).children().length + 1;
      y++
    ) {
      var liTextItem = randomizeSection
        .children()
        .eq(x)
        .children()
        .eq(y)
        .text();
      var liBorderEdit = randomizeSection.children().eq(x).children().eq(y);
      if (GSRH[x].indexOf(liTextItem) === -1) {
        console.log("WRONG: " + liTextItem + " was in wrong spot");
        $(liBorderEdit).css({
          "background-color": "rgba(68, 22, 22, 0.5)",
          color: "white",
        });
        testCorrect = false;
      } else {
        $(liBorderEdit).css({
          "background-color": "rgba(76, 175, 80, 0.3)",
          color: "white",
        });
      }
    }
  }

  if (testCorrect) {
    console.log("YOU GOT IT!");
    $(secondQuizDiv).children("h1").text("CONGRATS YOU WIN!");
    $(this).prop("disabled", true);
  } else {
    console.log("YOU LOST");
    console.log(secondQuizDiv.children());
    $(this).prop("disabled", true);
    $(secondQuizDiv).children("h1").text("YOU LOSE! GO REREAD THOSE BOOKS!");
  }
}
//Shuffle Names on Start of Quiz
function shuffleQuiz() {
  var answerKeyNames2 = answerKeyNames.slice();
  //random name
  var randomArrayOfNames = [];
  for (var j = 0; j < 20; j++) {
    var random = Math.floor(Math.random() * answerKeyNames2.length);
    randomArrayOfNames.push(answerKeyNames2[random]);
    answerKeyNames2.splice(random, 1);
  }
  console.log(randomArrayOfNames);
  console.log(answerKeyNames);
  console.log();
  var counter = 0;
  for (var x = 0; x < 4; x++) {
    for (var y = 1; y < 6; y++) {
      randomizeSection
        .children()
        .eq(x)
        .children()
        .eq(y)
        .text(randomArrayOfNames[counter]);
      counter++;
    }
  }
}

//submit button showing up
function showSubmitButton() {
  console.log(50);
  randomizeSection.append(
    '<button class = "btn btn-danger my-2" type = "button" id = "quiz-submit-button">SUBMIT </button>'
  );
  disableSubmitButton = this;
}
//Event Listener
quizStartButton.on("click", function () {
  console.log(5);
  showSubmitButton();
  shuffleQuiz();
  $(this).prop("disabled", true);
});
//Event Listener - Submit button
randomizeSection.on("click", function () {
  var x = 0;
  testAnswers();
});

// weather js

var destination = $("#locationName");

$(document).ready(function () {
  $("#dropDown").on("change", getWeather);

  function getWeather() {
    var selectedOption = $("#dropDown").val();
    var requestWeather =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      selectedOption +
      "&APPID=6125957e3b746825efbf44ae31af7452";

    $.ajax({
      url: requestWeather,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("#locationName").text(selectedOption);
      },
      error: function (error) {
        console.error(error);
      },
    });
  }
});
