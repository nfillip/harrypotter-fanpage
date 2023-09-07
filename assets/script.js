//QUIZ! -FILLIP SECTION
var quizSubmitButton = $("#quiz-submit-button");
var quizStartButton = $("#quiz-start-button");
var mainQuizDiv = $("#main-quiz-div");
var randomizeSection = $("#randomize-section");
var secondQuizDiv = $("#second-quiz-div");
var disableSubmitButton;
var secondsLeft = 15;
var textArea = $("#modal-textarea");
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
      $("#name").text("Name: " + data[0].name);
      $("#house").text(data[0].house);
      $("#wandLength").text(data[0].wand.length);
      $("#wandWood").text(data[0].wand.wood);
      $("#wandCore").text(data[0].wand.core);
      $("#dateOfBirth").text(data[0].dateOfBirth);
      $("#gender").text(data[0].gender);
      $("#species").text(data[0].species);
      $("#patronus").text(data[0].patronus);
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
    $(secondQuizDiv)
      .children("h1")
      .text("YOU LOSE! but keep trying & then GO REREAD THOSE BOOKS!");
    $("#quiz-start-button").prop("disabled", true);
    $("#page-refresh-button").show();
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
  allowSortable();
}

//submit button showing up
function showSubmitButton() {
  console.log(50);
  randomizeSection.append(
    '<button class = "btn btn-danger my-2" type = "button" id = "quiz-submit-button">SUBMIT </button>'
  );
  disableSubmitButton = this;
}

function startTimer() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    quizStartButton.text(secondsLeft);
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      testAnswers();
      quizStartButton.text("0");
    }
  }, 1000);
}

//Event Listener - Start Button
quizStartButton.on("click", function () {});
//Event Listener - Submit button
randomizeSection.on("click", "#quiz-submit-button", function (event) {
  event.stopPropagation();
  event.preventDefault();
  testAnswers();
  var x = 0;
  secondsLeft = 0;
});


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
=======
//Event Listener - Modal Submit button
$("#modal-submit").on("click", function () {
  secondsLeft = $("#message-text").val();
  showSubmitButton();
  shuffleQuiz();
  startTimer();
  $("#quiz-start-button").prop("disabled", true);
});

//Event Listener - Refresh Quiz
secondQuizDiv.on("click", "#page-refresh-button", function () {
  console.log("refresh works");
});

//calls on refresh
$("#quiz-refresh-button").prop("disabled", true);
$("#page-refresh-button").hide();
////////// END OF FILLIP SECTION

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


$("#dropDown").on("change", getWeather);

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
        "https://imgix.bustle.com/rehost/2016/9/13/bc5f1c4d-c4a5-4ade-a16b-05fadd1ad391.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress";
      var hogImg =
        "https://static.wikia.nocookie.net/harrypotter/images/e/e1/Hogwarts_Castle_DHF2.jpg/revision/latest?cb=20120128145344";
      var meadeImg =
        "https://i.pinimg.com/originals/ca/e5/5a/cae55a87045ef2b7c2b303ffaad1ca1a.jpg";
      var azcaImg =
        "https://static.wikia.nocookie.net/harrypotter/images/b/b6/Azkaban_concept_art.png/revision/latest?cb=20161216053518";
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
getWeather();
