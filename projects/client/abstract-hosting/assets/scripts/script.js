//Random background generator
var randomBackground = Math.floor(Math.random() * 5) + 1;

$("#headline").css("background-image", "url('assets/images/background" + randomBackground + ".png')");

//Dropdown menu
$("#help-button").on('click', function() {
  $("#help").slideToggle();
  $($("i")[1]).toggleClass("fa-caret-up");
});

$("#login-button").on('click', function() {
  $("#login").slideToggle();
  $($("i")[2]).toggleClass("fa-caret-up");
});

//Mobile and Tablet dropdown menu
$("#menu-icon").on('click', function() {
  $($("nav")[0]).slideToggle();
});
