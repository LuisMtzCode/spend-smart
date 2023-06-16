$(document).ready(function () {
  // Add a click event on buttons to open a specific modal
  $(document).on("click", ".js-modal-trigger", function () {
    $(".modal#" + $(this).data("target")).addClass("is-active");
  });

  // Add a click event on various child elements to close the parent modal
  $(document).on(
    "click",
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button",
    function () {
      const target = $(this).closest(".modal");
      $(target).removeClass("is-active");
    }
  );

  // Add a keyboard event to close all modals
  $(document).on("keydown", function (event) {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      $(".modal").removeClass("is-active");
    }
  });
});
