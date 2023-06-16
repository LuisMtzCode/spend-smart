$(document).ready(function () {
  //Card of the categories
  $(".categories-expenses .card").click(function () {
    window.location.href = "/transactions/add";
  });
  $(".button-cancel").click(function () {
    window.location.href = "/";
  });

  $("#buttonExpenses").click(function () {
    var expense = {
      id: $("#id").val() ? $("#id").val() : undefined,
      description: $("#description").val(),
      icon: $("#iconSelected").val(),
      amount: $("#amount").val(),
    };

    $.post("/transactions", expense, function (data) {
      if (data.error) {
        $("error-expenses").removeClass("is-hidden");
      } else {
        window.location.href = "/";
      }
    });
  });

  // Edit transaction
  $(".editTransaction").click(function () {
    var id = $(this).data("id");
    window.location.href = "/transactions/edit/" + id;
  });

  //Add expense form logic
  $(".icons-container .icon-item").click(function () {
    $(".icons-container .icon-item").removeClass("active");

    $("#iconActive").parent().removeClass("is-hidden");
    $("#iconActive")
      .removeClass()
      .addClass("fa-solid fa-" + $(this).data("icon"));

    $("#iconSelected").val($(this).data("icon"));
    $(this).addClass("active");
  });
});
