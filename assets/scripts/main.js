document.getElementsByClassName('svg-1')[0] && document.getElementsByClassName('svg-2')[0] && (document.getElementsByClassName('svg-1')[0].children[0].points[1].x = window.innerWidth, document.getElementsByClassName('svg-2')[0].children[0].points[1].x = window.innerWidth);
var navigation = document.getElementsByClassName('header-navigation')[0],
    menuIcon = document.getElementById('menu-icon');

function displayProjectCategory(e) {
    var t = document.getElementsByClassName('projects');
    Array.from(t).forEach(function(t) {
        'all' === e ? t.style.display = 'block' : t.dataset.category === e ? t.style.display = 'block' : t.style.display = 'none'
    })
}
if (menuIcon.addEventListener('click', function() {
        navigation.classList.value.includes('nav-show') ? (navigation.classList.remove('nav-show'), menuIcon.classList.remove('menu-icon-move')) : (navigation.classList.add('nav-show'), menuIcon.classList.add('menu-icon-move'))
    }), document.getElementById('category-filter')) {
    var categoryFilter = document.getElementById('category-filter');
    if (categoryFilter.addEventListener('change', function() {
            displayProjectCategory(categoryFilter.value)
        }), window.location && window.location.search) {
        var searchURL = window.location.search,
            search = searchURL.match(/\?category=(\w+)/);
        Array.from(categoryFilter.children).forEach(function(e, t) {
            e.value === search[1] && (categoryFilter.selectedIndex = t, displayProjectCategory(e.value))
        })
    }
}
if (document.querySelector('.testimonials-slider .testimonial')) {
    var testimonials = Array.from(document.querySelectorAll('.testimonials-slider .testimonial'));
    testimonials[1].style.display = 'none', testimonials[2].style.display = 'none';
    var counter = 1;

    function testimonialSlider() {
        testimonials.forEach(function(e, t) {
            e.style.display = counter !== t ? 'none' : 'block'
        }), counter === testimonials.length - 1 ? counter = 0 : counter++
    }
    setInterval(testimonialSlider, 5e3)
}
