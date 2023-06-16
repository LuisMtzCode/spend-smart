$(document).ready(function () {
  //Card of the categories
  $(".categories-expenses .category-icon").click(function () {
    var category = $(this).data("category");
    window.location.href = "/transactions/add/" + category;
  });
  $(".button-cancel").click(function () {
    window.location.href = "/";
  });

  //Filters
  $(".filters .tag").click(function () {
    var filter = $(this).data("filter") || "";
    $(".filters .tag").removeClass("is-primary is-info is-danger is-selected");

    let color = "is-primary";
    if (filter === "income") {
      color = "is-info";
    } else if (filter === "expense") {
      color = "is-danger";
    }
    $(this).addClass(color + " is-selected");

    $.get("/transactions?type=" + filter, function (data) {
      $("#transactionsContainer").html(data);
    });
  });

  $("#buttonExpenses").click(function () {
    $(this).addClass("is-loading");
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
    }).always(function () {
      $("#buttonExpenses").removeClass("is-loading");
    });
  });

  // Edit transaction
  $(".editTransaction").click(function () {
    var id = $(this).data("id");
    window.location.href = "/transactions/edit/" + id;
  });

  // Delete transaction
  $(".deleteTransaction").click(function () {
    var id = $(this).data("id");
    $("#deleteTransactionModal").attr("data-id", id);
  });

  $("#deleteTransactionModal").click(function () {
    var id = $(this).data("id");
    $.ajax({
      url: "/transactions/" + id,
      type: "DELETE",
    }).done(function (data) {
      if (!data.error) {
        $(".filters .tag.is-selected").click();
      }
    });
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
