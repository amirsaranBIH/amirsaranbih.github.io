var menuIcon = document.querySelector('.menu-icon');
var navigation = document.querySelector('.header-navigation')

menuIcon.addEventListener('click', function() {
  if (navigation.style.transform === 'scale(1)') {
    navigation.style.transform = 'scale(0)';
  } else {
    navigation.style.transform = 'scale(1)';
  }
});
