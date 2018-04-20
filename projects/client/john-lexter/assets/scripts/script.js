// IMAGES, CAPTIONS AND SUBCAPTIONS ARRAYS
var images = ["url(assets/images/photos/image1.jpg)", "url(assets/images/photos/image2.jpg)", "url(assets/images/photos/image3.jpg)", "url(assets/images/photos/image4.jpg)", "url(assets/images/photos/image5.jpg)"];

var caption = ["Okada, Manila", "Okada, Manila", "Baler, Philippines", "Manila, Philippines", "Pillila, Philippines"];

var subcaption = ["Biggest Dancing Fountain in the world", "Architecture", "Landscape", "City", "Windmill"];


// BACKGROUND IMAGE SLIDER LOGIC
$("body").css("background-image", "url(assets/images/photos/image1.jpg)");

var counter = 1;

function imageSlide() {
  $("body").css("background-image", images[counter]);
  $("h1").text(caption[counter]);
  $(".image-caption p").text(subcaption[counter]);
  if (counter < images.length -1) {
    counter++;
  } else {
    counter = 0;
  }
}

setInterval(imageSlide, 10000);

// MUSIC ON AND OFF LOGIC
var muted = false;

$("#music-btn").on("click", function() {
  if (muted) {
    document.getElementById('music').muted = false;
    $("#music-btn img").attr("src", "assets/images/icons/music-off-icon.png");
    $("#music-btn").attr("title", "Turn music off");
    muted = false;
  } else {
    document.getElementById('music').muted = true;
    $("#music-btn img").attr("src", "assets/images/icons/music-on-icon.png");
    $("#music-btn").attr("title", "Turn music on");
    muted = true;
  }
});

// WORK MODULE LOGIC
$("#work-btn").on("click", function() {
  $("#work-modul").fadeIn();
});

$(".modul-background").on("click", function() {
  $("#work-modul").fadeOut();
  $("#about-modul").fadeOut();
  $("#share-modul").fadeOut();
});

$(".work-modul img").on("click", function() {
  var selectedImage = "url(" + $(this).attr("src") + ")";
  var indexOfImage = images.indexOf(selectedImage);

  $("body").css("background-image", images[indexOfImage]);
  $("h1").text(caption[indexOfImage]);
  $(".image-caption p").text(subcaption[indexOfImage]);
  counter = indexOfImage;
});

// ABOUT MODULE LOGIC
$("#about-btn").on("click", function() {
  $("#about-modul").fadeIn();
});

// SHARE MODULE LOGIC
$("#share-btn").on("click", function() {
  $("#share-modul").fadeIn();
});

webview.getSettings().setMediaPlaybackRequiresUserGesture(false);