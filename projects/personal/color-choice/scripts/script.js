var colors = [];
var selectedColors = [];

var logo = document.getElementById('logo-color');
var colorList = document.getElementById('color-list');
var selectedColorsDiv = document.getElementById('selected-colors');
var selectedColorsList = document.getElementById('selected-colors-list');
var arrow = document.getElementById('arrow');

var previewMode = false;

// Number of colors generaed and max number of
const numberOfColorsGenerated = 48;
const maxNumberOfSelectedColors = 7;

// Setting the max number of selected colors in the counter preview
document.getElementById('max-selected-colors').innerText = maxNumberOfSelectedColors;

// Creating a RGB value
function createRGB() {
  var value1 = Math.floor(Math.random() * 255) + 1;
  var value2 = Math.floor(Math.random() * 255) + 1;
  var value3 = Math.floor(Math.random() * 255) + 1;

  // Constructing the RGB value
  var rgbValue = `rgb(${value1}, ${value2}, ${value3})`;

  return rgbValue;
}


// Generating random colors for the logo every time page loads
(function createLogoColor() {
  var logoLetters = logo.innerText.split('');
  logo.innerText = '';

  // Adding the colors to the logo
  for ( var i = 0; i < logoLetters.length; i++) {
    let spanID = `logo-letter-${i}`;
    logo.innerHTML += `<span id="${spanID}">${logoLetters[i]}</span>`;
    document.getElementById(spanID).style.color = createRGB();
  }

}());

(function generateColors() {
  colors = [];
  colorList.innerHTML = '';

  // Filling the colors array with RGB values
  for (var i = 0; i < numberOfColorsGenerated; i++) {
    colors.push(createRGB());
  }

  // Constructing the color element
  colors.forEach(function(color, index) {
    var slicedColor = color.slice(4, -1);

    var colorHTML = `<div class="col-md-3 col-sm-6 color"><div class="color-info"><div class="color-section"><p class="rgb-value">${slicedColor}</p><i class="copy-btn fa fa-clipboard" aria-hidden="true"></i></div><span class="add-to-selected-btn">ADD TO SWATCH</span></div></div>`;
    colorList.insertAdjacentHTML('beforeend', colorHTML);

    var createdColor = document.getElementsByClassName('color')[index];
    createdColor.style.backgroundColor = color;

    var addToSelectedBtn = document.getElementsByClassName('add-to-selected-btn')[index];
    addToSelectedBtn.addEventListener('click', function() {
      if (!previewMode) {
        addToSelectedColors(this.parentNode.parentNode.style.backgroundColor);
      }
    });

    document.getElementsByClassName('copy-btn')[index].addEventListener('click', copyToClipboard);
  });

  // Assigning the genearteColors function to the window to use it outside this IIFE
  window.generateColors = generateColors;
}());

// Adding the selected color to the selected colors list
function addToSelectedColors(color) {
  if (selectedColors.length < maxNumberOfSelectedColors) {
    selectedColorsList.innerHTML = '';

    selectedColors.push(color);

    selectedColors.forEach(function(color, index) {
      var slicedColor = color.slice(4, -1);

      var selectedColorHTML = `<div class="selected-color"><div class="selected-color-preview"></div><div class="selected-color-info"><p class="selected-color-value">${slicedColor}</p><i class="selected-copy-btn fa fa-clipboard" aria-hidden="true"></i></div></div>`;
      selectedColorsList.insertAdjacentHTML('beforeend', selectedColorHTML);

      var createdSelectedColor = document.getElementsByClassName('selected-color')[index];
      createdSelectedColor.childNodes[0].style.backgroundColor = color;

      document.getElementsByClassName('selected-copy-btn')[index].addEventListener('click', copyToClipboard);

      document.getElementsByClassName('selected-color-preview')[index].addEventListener('click', removeSelectedColor);
    });

    document.getElementById('selected-colors-counter').innerText = selectedColors.length;

    selectedColorsDiv.style.display = 'block';
  }
}

// Selecting random colors from the color list and adding to selected colors list
function selectRandomColors() {
  selectedColorsList.innerHTML = '';
  selectedColors = [];

  var noDuplicates;
  var generate = function genRandom() {
    var randomNumbers = Array(maxNumberOfSelectedColors).fill(1).map(each => Math.floor(Math.random() * numberOfColorsGenerated));
    noDuplicates = Array.from(new Set(randomNumbers));
    if (noDuplicates.length === maxNumberOfSelectedColors) return noDuplicates;
    return genRandom();
  }
  generate();

  for (var i = 0; i < noDuplicates.length; i++) {
    let randomColor = noDuplicates[i];
    addToSelectedColors(colors[randomColor]);
  }
}

function removeSelectedColor() {
  selectedColorsList.removeChild(this.parentNode);
  var colorIndex = selectedColors.indexOf(this.style.backgroundColor);

  selectedColors.splice(colorIndex, 1);
  document.getElementById('selected-colors-counter').innerText = selectedColors.length;

  if (selectedColors.length === 0) {
    previewMode = false;
    colorList.style.filter = 'brightness(100%)';
    selectedColorsDiv.style.display = 'none';
    arrow.classList.add('fa-angle-left');
    arrow.classList.remove('fa-angle-right');
    selectedColorsDiv.style.right = '-155px';
  }
}

// Copying to clipboard
function copyToClipboard() {
  var temp = document.createElement("input");
  document.getElementsByTagName("body")[0].appendChild(temp);
  temp.value =  `rgb(${this.previousSibling.innerText})`;
  temp.select();
  document.execCommand("copy");
  document.getElementsByTagName("body")[0].removeChild(temp);
}

// Sliding animation with arrow on the chosen colors
arrow.addEventListener('click', function() {
  if (selectedColors.length) {
    if (selectedColorsDiv.style.right === '' || selectedColorsDiv.style.right === '-155px') {
      selectedColorsDiv.style.right = '0';
      arrow.classList.remove('fa-angle-left');
      arrow.classList.add('fa-angle-right');
      colorList.style.filter = 'brightness(10%)';
      previewMode = true;
    } else {
      selectedColorsDiv.style.right = '-155px';
      arrow.classList.add('fa-angle-left');
      arrow.classList.remove('fa-angle-right');
      colorList.style.filter = 'brightness(100%)';
      previewMode = false;
    }
  }
});

// Event listener for the header buttons
document.getElementById('generate-new-btn').addEventListener('click', generateColors);
document.getElementById('select-random-btn').addEventListener('click', selectRandomColors);
