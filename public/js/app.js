$(document).ready(function () {
  //Card of the categories
  $(".categories-expenses .card").click(function () {
    window.location.href = "add";
  });
  $(".button-cancel").click(function () {
    window.location.href = "/";
  });

  //Add expense form logic
  $(".icons-container .icon-item").click(function () {
    $(".icons-container .icon-item").removeClass("active");

    $("#iconActive").parent().removeClass("is-hidden");
    $("#iconActive")
      .removeClass()
      .addClass("fa-solid fa-" + $(this).data("icon"));

    $(this).addClass("active");
  });
});
