//Click to copy IP!
$("#copy").on('click', copyToClipboard);

function copyToClipboard() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($($("#copy")).text()).select();
  document.execCommand("copy");
  $temp.remove();

  $(".copied").fadeIn();
}

//Navigation toggle for tablet and mobile
$("#menu-icon").on('click', function() {
  $(".navigation").slideToggle();
});
