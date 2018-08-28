$(document).ready(function() {
  /* global moment */

  // tournamentContainer holds all of our tournaments
  var tournamentContainer = $(".tournament-container");
  //var tournamentUserSelect = $("#user");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleTournamentDelete);
  $(document).on("click", "button.edit", handleTournamentEdit);
  // Variable to hold our tournaments
  var tournaments;

  // The code below handles the case where we want to get tournament tournaments for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  //var userId;
  //if (url.indexOf("?user_id=") !== -1) {
  //  userId = url.split("=")[1];
  //  getTournaments(userId);
  //}
  // If there's no userId we just get all tournaments as usual
  //else {
    getTournaments();
  //}


  // This function grabs tournaments from the database and updates the view
  function getTournaments(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/tournaments" + userId, function(data) {
      console.log("tournaments", data);
      tournaments = data;
      if (!tournaments || !tournaments.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete tournaments
  function deleteTournament(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/tournaments/" + id
    })
      .then(function() {
        getTournaments(tournamentUserSelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed post HTML inside tournamentContainer
  function initializeRows() {
    tournamentContainer.empty();
    var tournamentsToAdd = [];
    for (var i = 0; i < tournaments.length; i++) {
      tournamentsToAdd.push(createNewRow(tournaments[i]));
    }
    tournamentContainer.append(tournamentsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newTournamentCard = $("<div>");
    newTournamentCard.addClass("card");
    var newTournamentCardHeading = $("<div>");
    newTournamentCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newTournamentName = $("<h2>");
    var newTournamentDate = $("<small>");
    var newTournamentUser = $("<h5>");
    var newTournamentRules = $("<p>");
    newTournamentUser.text("Written by: " + post.User.name);
    newTournamentUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newTournamentCardBody = $("<div>");
    newTournamentCardBody.addClass("card-body");
    var newTournamentBody = $("<p>");
    newTournamentName.text(post.name + " ");
    newTournamentRules.text(post.rules);
    newTournamentDate.text(formattedDate);
    newTournamentDate.append(newTournamentDate);
    newTournamentCardHeading.append(deleteBtn);
    newTournamentCardHeading.append(editBtn);
    newTournamentCardHeading.append(newTournamentName);
    newTournamentCardHeading.append(newTournamentUser);
    newTournamentCardBody.append(newTournamentBody);
    newTournamentCard.append(newTournamentCardHeading);
    newTournamentCard.append(newTournamentCardBody);
    newTournamentCard.data("tournament", post);
    return newTournamentCard;
  }

  // This function figures out which post we want to delete and then calls deleteTournament
  function handleTournamentDelete() {
    var currentTournament = $(this)
      .parent()
      .parent()
      .data("post");
    deleteTournament(currentTournament.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleTournamentEdit() {
    var currentTournament = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/tournament?tournament_id=" + currentTournament.id;
  }

  // This function displays a message when there are no tournaments
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    tournamentContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No tournaments yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    tournamentContainer.append(messageH2);
  }

});
