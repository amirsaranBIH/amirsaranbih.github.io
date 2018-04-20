var secondaryNav = document.querySelectorAll('.header-secondary-nav')[0];
var socialMedia = document.querySelectorAll('.header-social-media')[0];

$('#nav-icon').on('click', function() {
  if (socialMedia.classList.value.includes('show-social-media')) {
    socialMedia.classList.toggle('show-social-media');
  }
  secondaryNav.classList.toggle('show-secondary-nav');
});

$('#media-icon').on('click', function() {
  if (secondaryNav.classList.value.includes('show-secondary-nav')) {
    secondaryNav.classList.toggle('show-secondary-nav');
  }
  socialMedia.classList.toggle('show-social-media');
});

// Get todays date
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    date = new Date(),
    day = date.getDate(),
    month = date.getMonth(),
    year = date.getFullYear();

if (String(day).length < 2) {
  day = '0' + day;
}
var today = `${day}. ${months[month]} ${year}`;

document.getElementById('today').innerText = today;
