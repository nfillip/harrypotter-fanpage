// GLOBAL VARIABLES
var swearBtn = $("#iSwear");
var submitApplyBtn = $("#submitForm");
var urlSecond =
  "file:///Users/alexpurfield/Desktop/Project1/harrypotter-fanpage/application%20redirect/yourenotawizard.html";
// quiz-global variables
var quizSubmitButton = $("#quiz-submit-button");
var quizStartButton = $("#quiz-start-button");
var mainQuizDiv = $("#main-quiz-div");
var randomizeSection = $("#randomize-section");
var disableSubmitButton;
var secondsLeft = 15;
var textArea = $("#modal-textarea");
var blinkTimer = false;
var wandAdSpot = 0;
var wandDysfAdOnce = true;
var submitButtonClicked = false;
var GSRH = [
  [
    "Harry Potter",
    "Hermione Granger",
    "Ron Weasley",
    "Ginny Weasley",
    "Neville Longbottom",
    ,
  ],
  [
    "Draco Malfoy",
    "Severus Snape",
    "Lucius Malfoy",
    "Vincent Crabbe",
    "Tom Riddle",
    ,
  ],
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
    "Newt Scamander",
    "Susan Bones",
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
  "Newt Scamander",
  "Susan Bones",
  "Draco Malfoy",
  "Severus Snape",
  "Lucius Malfoy",
  "Vincent Crabbe",
  "Tom Riddle",
  "Harry Potter",
  "Hermione Granger",
  "Ron Weasley",
  "Ginny Weasley",
  "Neville Longbottom",
];
var characterUrl = "https://hp-api.onrender.com/api/characters";
// destination -global variables

var destination = $(".locationName");
var todayCastEl = $("#status");
var todayTempEl = $("#todayTemp");
var todayHighEl = $("#todayHigh");
var todayLowEl = $("#todayLow");
var todayWindEl = $("#todayWind");
var todayHumidEl = $("#todayHumid");
var placeInfo = $("#destinationInfo");
var destinationImg = $("#destImg");

var alley =
  "Diagon Alley is the main wizarding shopping street in London. On this street we can find any number of shops specifically for wizards, including an apothecary, Eeylops Owl Emporium, Florean Fortescue's Ice Cream Parlor, Flourish and Blott's bookstore, Gringotts Wizarding Bank, Madam Malkin's Robes for All Occasions, The Magical Menagerie pet store, Ollivanders: Makers of Fine Wands since 382 BC, and Quality Quidditch Supplies. The Leaky Cauldron pub, which serves as the gateway to Muggle London, backs onto this street, and the entrance to Knockturn Alley lies in this street as well. The merchants of Diagon Alley are well prepared for the annual influx of students needing to buy supplies for their year at Hogwarts.";
var hogwarts =
  "Founded around the 9th century and 10th century by Godric Gryffindor, Rowena Ravenclaw, Helga Hufflepuff and Salazar Slytherin, Hogwarts was established in the Highlands of Scotland to educate young wizards and witches as well as to keep students safe from Muggle persecution. Theory has it that Rowena Ravenclaw came up with the name of Hogwarts after dreaming of a warty hog that led her to a cliff by a lake.[4] Since then, Hogwarts educated most wizarding children with residence in Great Britain and Ireland, keeping its location hidden from other wizarding schools and Muggles.";
var meade =
  "Hogsmeade Village, or simply called Hogsmeade is the only all-wizarding village in Britain. It was founded by Hengist of Woodcroft. Students may sometimes come on weekend trips, but only third year students and above with guardian permission are allowed to visit. Mainly, students frequent the High Street in the village which contains the named specialty shops and pubs such as Zonko's Joke Shop and Honeydukes. Otherwise, they wander on to observe the infamous Shrieking Shack.";
var azzz =
  "Azkaban is a horrendous place, where Sirius Black, along with many Death Eaters, were imprisoned after Lord Voldemort fell from power. Guarded by the hideous dementors, it is located on a remote island and is virtually escape proof. According to Remus Lupin, it is a fortress... set on a tiny island, way out to sea, but they don't need walls and water to keep the prisoners in, not when they're all trapped inside their own heads, incapable of a single cheerful thought. Most of them go mad within weeks. Sirius Black is the first person known to have escaped unassisted. Although several Death Eaters also later escaped, it is believed they were able to escape only because the dementors had deserted the prison, having been promised richer feeding if they became loyal to Lord Voldemort.";

// ::FUNCTIONS
// ::::Quiz Functions
  //Sortable Function through jQueryUI - Fillip

function allowSortable() {
  $(function () {
    $("#sortable1, #sortable2, #sortable3, #sortable4")
      .sortable({
        connectWith: ".connectedSortable",
        containment: ".quiz-section",
      })
      .disableSelection();
  });
}

//Function: testanswers for quiz
function testAnswers() {
  var testCorrect = true;
  var countering = 0;
  for (var x = 0; x < 4; x++) {
    for (
      var y = 1;
      y < randomizeSection.children().eq(x).children().length;
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
        $(liBorderEdit).css({
          "background-color": "rgb(255, 0, 0, 0.3",
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
    $(mainQuizDiv).children("h1").text("CONGRATS YOU WIN!");
    $(this).prop("disabled", true);
    $("#page-refresh-button").show();
  } else {
    $(this).prop("disabled", true);
    $(mainQuizDiv)
      .children("h1")
      .text("YOU LOSE! but keep trying & then GO REREAD THOSE BOOKS!");
    $("#quiz-start-button").prop("disabled", true);
    $("#page-refresh-button").show();
  }
}

//Function: produce random array of names
function randomArrayCharacters() {
  var answerKeyNames2 = answerKeyNames.slice();
  //random name
  var randomArrayOfNames = [];
  for (var j = 0; j < 20; j++) {
    var random = Math.floor(Math.random() * answerKeyNames2.length);
    randomArrayOfNames.push(answerKeyNames2[random]);
    answerKeyNames2.splice(random, 1);
  }
  return randomArrayOfNames;
}

//function: Shuffle Names on Start of Quiz
function shuffleQuiz() {
  var randomArrayOfNames = randomArrayCharacters();
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
  allowSortable();
}

//Function: submit button showing up
function showSubmitButton() {
  randomizeSection.append(
    '<button class = "btn btn-danger my-2" type = "button" id = "quiz-submit-button">SUBMIT </button>'
  );
  disableSubmitButton = this;
}

// Function: start quiz timer
function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    quizStartButton.text(secondsLeft);
    if (secondsLeft <= 0 && submitButtonClicked === false) {
      clearInterval(timerInterval);
      testAnswers();
      quizStartButton.text("0");
      $("#page-refresh-button").prop("disabled", false);
    } else if (secondsLeft <= 0 && submitButtonClicked === true) {
      clearInterval(timerInterval);
      quizStartButton.text("0");
    }
  }, 1000);
}

// Function: Start the timer before ad pops up
function startAdTimer() {
  var secondsUntilAd = 4;
  var adStartTimer = setInterval(function () {
    secondsUntilAd--;
    if (secondsUntilAd <= 0) {
      clearInterval(adStartTimer);

      endAdTimer();
    }
  }, 1000);
}

// Function: Start timer after ad pops up for it to disappear
function endAdTimer() {
  mainQuizDiv.append('<div class = "popUpWand"></div>');
  $(".popUpWand").append('<p class = "popUpWandClose">Close [x]</p');
  $(".popUpWand").append('<div class = "popUpWandDiv1"></div');
  $(".popUpWandDiv1").append(
    '<p class = "popUpWandPar">Do You Have Wand Dysfunction? LOOK NO FURTHER!!!</p'
  );
  $(".popUpWandDiv1").append(
    '<button class = "popUpWandButton">Click Here</div'
  );
  var endAdTimerSecondsLeft = 40;
  var popUpColor = 0;
  var endAdTimerCount = setInterval(function () {
    if (popUpColor === 0) {
      $(".popUpWand").css("border", "2rem solid #740001");
    } else if (popUpColor === 1) {
      $(".popUpWand").css("border", "2rem solid #eeb939");
    } else if (popUpColor === 2) {
      $(".popUpWand").css("border", "2rem solid #222f5b");
    } else if (popUpColor === 3) {
      $(".popUpWand").css("border", "2rem solid #1a472a");
    }
    if (endAdTimerSecondsLeft <= 0) {
      clearInterval(endAdTimerCount);
      $(".popUpWand").remove();
    }
    popUpColor++;
    if (popUpColor === 4) {
      popUpColor = 0;
    }
    endAdTimerSecondsLeft--;
  }, 250);
}

// Function: Get Weather Info: 
function getWeather() {
  var selectedOption = $("#dropDown").val();
  var requestWeather = `https://api.openweathermap.org/data/2.5/weather?q=${selectedOption}&units=imperial&APPID=6125957e3b746825efbf44ae31af7452`;

  $.ajax({
    url: requestWeather,
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      destination.text($("#dropDown option:selected").text());

      todayCastEl.text(data.weather[0].description);
      todayTempEl.text(`Current Temp: ${data.main.temp}°`);
      todayHighEl.text(`High Today: ${data.main.temp_max}°`);
      todayLowEl.text(`Low Today: ${data.main.temp_min}°`);
      todayWindEl.text(`Wind: ${data.wind.speed} mph`);
      todayHumidEl.text(`Humidity: ${data.main.humidity}%`);

      var alleyImg =
        "https://imgix.bustle.com/rehost/2016/9/13/bc5f1c4d-c4a5-4ade-a16b-05fadd1ad391.jpg";
      var hogImg =
        "https://static.wikia.nocookie.net/harrypotter/images/e/e1/Hogwarts_Castle_DHF2.jpg";
      var meadeImg =
        "https://i.pinimg.com/originals/ca/e5/5a/cae55a87045ef2b7c2b303ffaad1ca1a.jpg";
      var azcaImg =
        "https://static.wikia.nocookie.net/harrypotter/images/b/b6/Azkaban_concept_art.png";
      destinationImg.empty();

      if (selectedOption === "London,uk") {
        placeInfo.text(alley);
        const img = $("<img>");
        img.attr("id", "infoImg");
        img.attr("class", "col-12 m-1 align-self-center");
        img.attr("src", alleyImg);
        destinationImg.append(img);
      } else if (selectedOption === "Alnwick,uk") {
        placeInfo.text(hogwarts);
        const img = $("<img>");
        img.attr("id", "infoImg");
        img.attr("class", "col-12 m-1 align-self-center");
        img.attr("src", hogImg);
        destinationImg.append(img);
      } else if (selectedOption === "Scarborough,uk") {
        placeInfo.text(meade);
        const img = $("<img>");
        img.attr("src", meadeImg);
        img.attr("id", "infoImg");
        img.attr("class", "col-12 m-1");
        destinationImg.append(img);
      } else {
        placeInfo.text(azzz);
        const img = $("<img>");
        img.attr("src", azcaImg);
        img.attr("id", "infoImg");
        img.attr("class", "col-12 m-1");
        destinationImg.append(img);
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}

// ::::EVENT LISTENERS
//Event Listener - WandDysf Ad Close X
mainQuizDiv.on("mouseover", ".popUpWandClose", function () {
  if (wandAdSpot === 0) {
    $(".popUpWand").css({ top: "10vh", left: "10vw" });
  } else if (wandAdSpot === 1) {
    $(".popUpWand").css({ top: "50vh", left: "10vw" });
  } else if (wandAdSpot === 2) {
    $(".popUpWand").css({ top: "50vh", left: "50vw" });
  } else if (wandAdSpot === 3) {
    $(".popUpWand").css({ top: "10vw", left: "50vw" });
    wandAdSpot = 0;
  }
  wandAdSpot++;
});
//Event Listener - WandDysf Ad Button
mainQuizDiv.on("click", ".popUpWandButton", function () {
  if (wandAdSpot === 0) {
    $(".popUpWand").css({ top: "10vh", left: "10vw" });
  } else if (wandAdSpot === 1) {
    $(".popUpWand").css({ top: "40vh", left: "10vw" });
  } else if (wandAdSpot === 2) {
    $(".popUpWand").css({ top: "40vh", left: "40vw" });
  } else if (wandAdSpot === 3) {
    $(".popUpWand").css({ top: "10vw", left: "40vw" });
    wandAdSpot = 0;
  }
  wandAdSpot++;
});
//Event Listener - Start Quiz Button
quizStartButton.on("click", function () {
  $("#page-refresh-button").prop("disabled", true);

  blinkTimer = false;
});
//Event Listener - Submit Quiz button
randomizeSection.on("click", "#quiz-submit-button", function (event) {
  event.stopPropagation();
  event.preventDefault();
  testAnswers();
  var x = 0;
  submitButtonClicked = true;
  secondsLeft = 0;
  $("#page-refresh-button").prop("disabled", false);
});
//Event Listener - Modal Quiz Submit button
$("#modal-submit").on("click", function () {
  if (parseInt($("#message-text").val())) {
    $(mainQuizDiv).children("h1").text("QUIZ- Sort The Houses! ");
    secondsLeft = $("#message-text").val();
    showSubmitButton();
    shuffleQuiz();
    startTimer();
    $("#quiz-start-button").prop("disabled", true);
    if (wandDysfAdOnce) {
      startAdTimer();
      wandDysfAdOnce = !wandDysfAdOnce;
    }
  } else {
    blinkTimer = true;
    $(mainQuizDiv)
      .children("h1")
      .text("ERROR: YOU NEED TO TYPE A NUMBER IN THE TEXT BOX");
    var blink = true;
    var blinkerInterval = setInterval(function () {
      blink = !blink;
      if (blink) {
        $(mainQuizDiv).children("h1").css("background", "black");
      } else {
        $(mainQuizDiv).children("h1").css("background", "white");
      }
      if (blinkTimer === false) {
        clearInterval(blinkerInterval);
        $(mainQuizDiv).children("h1").css("background", "none");
      }
    }, 500);
  }
});
//Event Listener - Refresh Quiz Button
mainQuizDiv.on("click", "#page-refresh-button", function () {
  var RandomArrayOfTwentyNames = randomArrayCharacters();
  var z = 0;
  for (var x = 0; x < 4; x++) {
    randomizeSection.children().eq(x).children().remove("li");
    for (var y = 1; y < 6; y++) {
      randomizeSection
        .children()
        .eq(x)
        .append(
          '<li class = "list-group-item">' +
            RandomArrayOfTwentyNames[z] +
            "</li>"
        );
      z++;
    }
    $("#page-refresh-button").prop("disabled", true);
  }
  randomizeSection.children().remove("button");
  $("#quiz-start-button").prop("disabled", false);
  $("#quiz-start-button").text("Start/Shuffle Quiz");
});
// Event Listener - Character Bio Pull Information 
$("#bio").on("click", async function () {
  await fetch(characterUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var input = $(".bioClass").val();
      var char = data.filter(function (char) {
        var name = char.name;
        return name.toLowerCase().includes(input.toLowerCase());
      });
      return char;
    })
    .then(function (data) {
      console.log(data);
      $("#name").text("Name: " + data[0].name);
      $("#house").text("House: " + data[0].house);
      $("#wand").text("   Wand Details   ");
      $("#descriptors").text("   Descriptors   ");
      $("#wandLength").text("Length: " + data[0].wand.length + " inches");
      $("#wandWood").text("Type of Wood: " + data[0].wand.wood);
      $("#wandCore").text("Core Materiel: " + data[0].wand.core);
      $("#dateOfBirth").text("Date of Birth: " + data[0].dateOfBirth);
      $("#gender").text("Gender: " + data[0].gender);
      $("#species").text("Species: " + data[0].species);
      $("#patronus").text("Patronus: " + data[0].patronus);
      $("#ancestry").text("Ancestry: " + data[0].ancestry);
      $("#eyeColor").text("Eye Color: " + data[0].eyeColour);
      $("#hairColor").text("Hair Color: " + data[0].hairColour);
      if(data[0].image !== ""){
        $("#characterImageDiv").children().remove();
        $("#characterImageDiv").append('<img id = "characterImage" alt = "image of char" src =' +data[0].image + '></img>');
      }else {
        $("#characterImageDiv").children().remove();
      }
      $(".hidden").addClass("visible").removeClass("hidden");
    });

  $(".charClass").css("background-color", "rgb(105,105,105,0.4)");
});
// EventListener - Up-To-No-Good-page modal
$(document).ready(function (event) {
  $("#myPageModal").modal("show");
  return false;
});
// Event Listener - Up-to-no-good modal close
$("#iSwear").on("click", function (event) {
  $("#myPageModal").modal("hide");

  return false;
});
$("#submitForm").click(function () {
  window.open(urlSecond, "_blank");
  return false;
});

//IMMEDIATE OCCURRENCES 
$("#quiz-refresh-button").prop("disabled", true);
$("#page-refresh-button").hide();
$("#dropDown").on("change", getWeather);
getWeather();

