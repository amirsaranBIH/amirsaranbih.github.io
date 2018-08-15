// IMAGES, CAPTIONS AND SUBCAPTIONS ARRAYS
var images = [
  {
    image: 'url(assets/images/photos/image1.jpg)',
    caption: 'Okada, Manila',
    subcaption: 'Biggest Dancing Fountain in the world'
  },
  {
    image: 'url(assets/images/photos/image2.jpg)',
    caption: 'Okada, Manila',
    subcaption: 'Architecture'
  },
  {
    image: 'url(assets/images/photos/image3.jpg)',
    caption: 'Baler, Philippines',
    subcaption: 'Landscape'
  },
  {
    image: 'url(assets/images/photos/image4.jpg)',
    caption: 'Manila, Philippines',
    subcaption: 'City'
  },
  {
    image: 'url(assets/images/photos/image5.jpg)',
    caption: 'Pillila, Philippines',
    subcaption: 'Windmill'
  }
];

// BACKGROUND IMAGE SLIDER LOGIC
$('body').css('background-image', 'url(assets/images/photos/image1.jpg)');

var counter = 1;

function imageSlide() {
  $('body').css('background-image', images[counter].image);
  $('h1').text(images[counter].caption);
  $('.image-caption p').text(images[counter].subcaption);
  if (counter < images.length -1) {
    counter++;
  } else {
    counter = 0;
  }
}

setInterval(imageSlide, 10000);

// MUSIC ON AND OFF LOGIC
var muted = false;

$('#music-btn').on('click', function() {
  if (muted) {
    document.getElementById('music').muted = false;
    $('#music-btn img').attr('src', 'assets/images/icons/music-off-icon.png');
    $('#music-btn').attr('title', 'Turn music off');
    muted = false;
  } else {
    document.getElementById('music').muted = true;
    $('#music-btn img').attr('src', 'assets/images/icons/music-on-icon.png');
    $('#music-btn').attr('title', 'Turn music on');
    muted = true;
  }
});

// WORK MODULE LOGIC
$('#work-btn').on('click', function() {
  $('#work-modul').fadeIn();
});

$('.modul-background').on('click', function() {
  $('#work-modul').fadeOut();
  $('#about-modul').fadeOut();
  $('#share-modul').fadeOut();
});

$('.work-modul img').on('click', function() {
  var selectedImage = 'url(' + $(this).attr('src') + ')';
  var indexOfImage = images.findIndex(function(img) {
    if (selectedImage === img.image) return img;
  });

  $('body').css('background-image', images[indexOfImage].image);
  $('h1').text(images[indexOfImage].caption);
  $('.image-caption p').text(images[indexOfImage].subcaption);
  counter = indexOfImage;
});

// ABOUT MODULE LOGIC
$('#about-btn').on('click', function() {
  $('#about-modul').fadeIn();
});

// SHARE MODULE LOGIC
$('#share-btn').on('click', function() {
  $('#share-modul').fadeIn();
});
