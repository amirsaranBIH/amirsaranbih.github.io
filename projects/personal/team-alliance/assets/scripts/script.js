$(window).on("load",function() {

  $("body").fadeIn('slow');

  // Featured work hover animation
  $(".featured-work-item").hover(function() {
    $(this).find(".hidden-info").slideToggle(400);
  });

  // Navigation animation slide
  $("#menu-icon").on("click", function() {
    if ($("#main-nav").css("width") === "0px") {
      $("#main-nav").animate({width: "150px"});
    } else {
      $("#main-nav").animate({width: "0px"});
    }
  });

  // Work selector logic
  $("#btn-all").click(function() {
    if (!$("#btn-all").hasClass("selected")) {
      $(this).toggleClass("selected");
      $("#btn-websites").removeClass("selected");
      $("#btn-designs").removeClass("selected");
    }

    $("#all-websites").fadeIn(100);
    $("#all-designs").fadeIn(100);
  });

  $("#btn-websites").click(function() {
    if (!$("#btn-websites").hasClass("selected")) {
      $(this).toggleClass("selected");
      $("#btn-all").removeClass("selected");
      $("#btn-designs").removeClass("selected");
    }

    $("#all-websites").fadeIn(100);
    $("#all-designs").fadeOut(100);
  });

  $("#btn-designs").click(function() {
    if (!$("#btn-designs").hasClass("selected")) {
      $(this).toggleClass("selected");
      $("#btn-websites").removeClass("selected");
      $("#btn-all").removeClass("selected");
    }

    $("#all-websites").fadeOut(100);
    $("#all-designs").fadeIn(100);
  });

});
