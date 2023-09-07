$(document).ready(function () {
  //QUIZ! -FILLIP SECION
  var quizSubmitButton = $("#quiz-submit-button");
  var quizStartButton = $("#quiz-start-button");
  var mainQuizDiv = $("#main-quiz-div");
  var randomizeSection = $("#randomize-section");
  var answerKey = {
    gryffindor: ["Harry Potter", "Hermione", "Ron", "Ginny", "Neville"],
    slytherin: ["Draco", "Snape", "Lucius Malfoy", "Crab", "Tom Riddle"],
    hufflepuff: [
      "Cedric Diggory",
      "Helga Hufflepuff",
      "Nymphadora Tonks",
      "New Scamander",
      "Remus Lupin",
    ],
    ravenclaw: [
      "Rowena Ravenclaw",
      "Gilderoy Lockhart",
      "Luna Lovegood",
      "Cho Change",
      "Moaning Myrtle",
    ],
  };
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
  $(function () {
    $("#sortable1, #sortable2, #sortable3, #sortable4, #sortable5")
      .sortable({
        connectWith: ".connectedSortable",

        containment: ".quizsection",
      })
      .disableSelection();
  });

  //Quiz Functions
  //testanswers
  function testAnswers() {
    console.log(answerKey);
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
      for (var y = 0; y < 5; y++) {
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
  }
  //Event Listener
  quizStartButton.on("click", function () {
    console.log(5);
    showSubmitButton();
    shuffleQuiz();
  });
  //Event Listener - Submit button
  quizSubmitButton.on("click", function () {
    testAnswers();
  });

  // weather js

  var destination = $(".locationName");
  var todayCastEl = $("#status");
  var todayTempEl = $("#todayTemp");
  var todayHighEl = $("#todayHigh");
  var todayLowEl = $("#todayLow");
  var todayWindEl = $("#todayWind");
  var todayHumidEl = $("#todayHumid");
  var placeInfo = $("#destinationInfo");
  var alley =
    "Diagon Alley is the main wizarding shopping street in London. On this street we can find any number of shops specifically for wizards, including an apothecary, Eeylops Owl Emporium, Florean Fortescue's Ice Cream Parlor, Flourish and Blott's bookstore, Gringotts Wizarding Bank, Madam Malkin's Robes for All Occasions, The Magical Menagerie pet store, Ollivanders: Makers of Fine Wands since 382 BC, and Quality Quidditch Supplies. The Leaky Cauldron pub, which serves as the gateway to Muggle London, backs onto this street, and the entrance to Knockturn Alley lies in this street as well. The merchants of Diagon Alley are well prepared for the annual influx of students needing to buy supplies for their year at Hogwarts.";
  var hogwarts =
    "Founded around the 9th century and 10th century by Godric Gryffindor, Rowena Ravenclaw, Helga Hufflepuff and Salazar Slytherin, Hogwarts was established in the Highlands of Scotland to educate young wizards and witches as well as to keep students safe from Muggle persecution. Theory has it that Rowena Ravenclaw came up with the name of Hogwarts after dreaming of a warty hog that led her to a cliff by a lake.[4] Since then, Hogwarts educated most wizarding children with residence in Great Britain and Ireland, keeping its location hidden from other wizarding schools and Muggles.";
  var meade =
    "Hogsmeade Village, or simply called Hogsmeade is the only all-wizarding village in Britain. It was founded by Hengist of Woodcroft. Students may sometimes come on weekend trips, but only third year students and above with guardian permission are allowed to visit[1]. Mainly, students frequent the High Street in the village which contains the named specialty shops and pubs such as Zonko's Joke Shop and Honeydukes. Otherwise, they wander on to observe the infamous Shrieking Shack.";
  var azzz =
    "Azkaban is a horrendous place, where Sirius Black, along with many Death Eaters, were imprisoned after Lord Voldemort fell from power. Guarded by the hideous dementors, it is located on a remote island and is virtually escape proof. According to Remus Lupin, it is a fortress... set on a tiny island, way out to sea, but they don't need walls and water to keep the prisoners in, not when they're all trapped inside their own heads, incapable of a single cheerful thought. Most of them go mad within weeks. Sirius Black is the first person known to have escaped unassisted. Although several Death Eaters also later escaped, it is believed they were able to escape only because the dementors had deserted the prison, having been promised richer feeding if they became loyal to Lord Voldemort.";

  $("#dropDown").on("change", getWeather);

  function getWeather() {
    var selectedOption = $("#dropDown").val();
    var requestWeather =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      selectedOption +
      "&units=imperial&APPID=6125957e3b746825efbf44ae31af7452";

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

        if (selectedOption === "London,uk") {
          placeInfo.text(alley);
        } else if (selectedOption === "Alnwick,uk") {
          placeInfo.text(hogwarts);
        } else if (selectedOption === "Scarborough,uk") {
          placeInfo.text(meade);
        } else {
          placeInfo.text(azzz);
        }
      },
      error: function (error) {
        console.error(error);
      },
    });
    destination(selectedOption);
  }
  getWeather();
});
