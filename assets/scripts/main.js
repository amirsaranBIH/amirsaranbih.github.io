if (document.getElementsByClassName('svg-1')[0] && document.getElementsByClassName('svg-2')[0]) {
  document.getElementsByClassName('svg-1')[0].children[0].points[1].x = window.innerWidth;
  document.getElementsByClassName('svg-2')[0].children[0].points[1].x = window.innerWidth;
}

var navigation = document.getElementsByClassName('header-navigation')[0];
var menuIcon = document.getElementById('menu-icon');

menuIcon.addEventListener('click', () => {
  if (navigation.classList.value.includes('nav-show')) {
    navigation.classList.remove('nav-show');
    menuIcon.classList.remove('menu-icon-move');
  } else {
    navigation.classList.add('nav-show');
    menuIcon.classList.add('menu-icon-move');
  }
});

function displayProjectCategory(toDisplay) {
  var categories = document.getElementsByClassName('projects');

  [...categories].forEach(category => {
    if (toDisplay === 'all') {
      category.style.display = 'block';
    } else {
      if (category.dataset.category === toDisplay) {
        category.style.display = 'block';
      } else {
        category.style.display = 'none';
      }
    }
  });
}

if (document.getElementById('category-filter')) {
  var categoryFilter = document.getElementById('category-filter');

  categoryFilter.addEventListener('change', () => {
    displayProjectCategory(categoryFilter.value);
  });

  if(window.location && window.location.search) {
    var searchURL = window.location.search;
    var search = searchURL.match(/\?category=(\w+)/);

    [...categoryFilter.children].forEach((filter, index) => {
      if (filter.value === search[1]) {
        categoryFilter.selectedIndex = index;
        displayProjectCategory(filter.value);
      }
    });
  }
}

if (document.querySelector('.testimonials-slider .testimonial')) {
  var testimonials = [...document.querySelectorAll('.testimonials-slider .testimonial')];
  testimonials[1].style.display = 'none';
  testimonials[2].style.display = 'none';
  var counter = 1;

  function testimonialSlider() {
    testimonials.forEach((testimonial, index) => {
      if (!(counter === index)) {
        testimonial.style.display = 'none';
      } else {
        testimonial.style.display = 'block';
      }
    });

    if (counter === testimonials.length - 1) {
      counter = 0;
    } else {
      counter++;
    }
  }

  setInterval(testimonialSlider, 5000);
}
