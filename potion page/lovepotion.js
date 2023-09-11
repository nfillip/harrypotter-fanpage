// Get the elements by their ID using jQuery
var $popupLink = $("#orderButton");
var $popupWindow = $("#popup-window");
var $closeButton = $("#close-button");
var $coverWindow = $("#cover");

// Show the pop-up window when the link is clicked
$popupLink.on("click", function (event) {
  event.preventDefault();
  $popupWindow.css("display", "block");
  $coverWindow.css("opacity", 0.7);
  $coverWindow.css("display", "block");
});

// Hide the pop-up window when the close button is clicked
$closeButton.on("click", function () {
  $popupWindow.css("display", "none");
  $coverWindow.css("display", "none");
});
