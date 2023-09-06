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
