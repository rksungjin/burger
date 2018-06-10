$(document).ready(function() {
    $("#burgerform").submit(function(e) {
    e.preventDefault();
        var newBurger = {
      burger_name: $("#new_burgername").val().trim()
    };
    console.log("something");
        $.ajax("/burger/create", {
      type: "POST",
      data: newBurger
      
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
});

  $("#devourbtn").on("click", function(event) {
    var id = $(this).data("id");
    var newStatus = $(this).data("newstatus");

    var newStatusState = {
      status: newStatus
    };

    // Send the PUT request.
    $.ajax("/burger/eat/" + id, {
      type: "PUT",
      data: newStatusState
    }).then(
      function() {
        console.log("changed status to", newStatus);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


})