//QUIZ! -FILLIP SECION
var quizSubmitButton = $("#quiz-submit-button");
var quizStartButton = $("#quiz-start-button")
var mainQuizDiv = $("#main-quiz-div");
var randomizeSection = $("#randomize-section");
var answerKey = {
  "gryffindor": ["Harry Potter", "Hermione", "Ron" ,"Ginny", "Neville"],
  "slytherin": ["Draco", "Snape", "Lucius Malfoy", "Crab", "Tom Riddle"],
  "hufflepuff": ["Cedric Diggory", "Helga Hufflepuff", "Nymphadora Tonks", "New Scamander", "Remus Lupin"],
  "ravenclaw": ["Rowena Ravenclaw", "Gilderoy Lockhart", "Luna Lovegood", "Cho Change", "Moaning Myrtle"]
}
var answerKeyHouses = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];
var answerKeyNames = ["Rowena Ravenclaw", "Gilderoy Lockhart", "Luna Lovegood", "Cho Change", "Moaning Myrtle", "Cedric Diggory", "Helga Hufflepuff", "Nymphadora Tonks", "New Scamander", "Remus Lupin" ,"Draco", "Snape", "Lucius Malfoy", "Crab", "Tom Riddle", "Harry Potter", "Hermione", "Ron" ,"Ginny", "Neville"]
//Sortable Function through jQueryUI - Fillip
$(function () {
  $("#sortable1, #sortable2, #sortable3, #sortable4, #sortable5")
    .sortable({
      connectWith: ".connectedSortable",

      containment: ".quizsection",
    })
    .disableSelection();
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

      containment: ".quiz-section"
    }).disableSelection();
  } );

  //Quiz Functions
  //testanswers
  function testAnswers(){

    console.log(answerKey);
  }
  
//Shuffle Names on Start of Quiz
  function shuffleQuiz(){
  var answerKeyNames2 = answerKeyNames.slice();
    //random name
    var randomArrayOfNames = [];
    for (var j = 0 ; j<20; j++) {
    var random = Math.floor(Math.random()*answerKeyNames2.length)
    randomArrayOfNames.push(answerKeyNames2[random]);
    answerKeyNames2.splice(random, 1);
    }
    console.log(randomArrayOfNames);
    console.log(answerKeyNames);
    console.log()
    var counter = 0;
    for (var x = 0; x<4; x++){
      for (var y = 0; y<5; y++){
        randomizeSection.children().eq(x).children().eq(y).text(randomArrayOfNames[counter]);
        counter++;
      }
    }
    
  }

  //submit button showing up
  function showSubmitButton(){
    console.log(50);
    randomizeSection.append('<button class = "btn btn-danger my-2" type = "button" id = "quiz-submit-button">SUBMIT </button>');
  }
//Event Listener
  quizStartButton.on("click", function(){
    console.log(5);
    showSubmitButton();
    shuffleQuiz();
  })
  //Event Listener - Submit button
  quizSubmitButton.on("click", function() {
    testAnswers();
  })


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

