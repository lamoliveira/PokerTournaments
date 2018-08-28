$(document).ready(function() {
    // Getting jQuery references to the tournament name, rules, date, user, form select
    var tournamentnameInput = $("#tournamentname-input");
    var tournamentdateInput = $("#tournamentdate-input");
    var tournamentrulesInput = $("#tournamentrules-input");
    var tournamentForm = $("#tournament");
    var userSelect = $("#user");
    // Adding an event listener for when the form is submitted
    $(tournamentForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a tournament)
    var url = window.location.search;
    var tournamentId;
    var userId;
    // Sets a flag for whether or not we're updating a tournament to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the tournament id from the url
    // In '?tournament_id=1', tournamentId is 1
    if (url.indexOf("?tournament_id=") !== -1) {
      tournamentId = url.split("=")[1];
      getTournamentData(tournamentId, "tournament");
    }
    // Otherwise if we have an user_id in our url, preset the user select box to be our User
    else if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
    }
  
    // Getting the users, and their tournaments
    getUsers();
  
    // A function for handling what happens when the form to create a new tournament is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the tournament if we are missing a tournamentname, tournamentrules, or user
      if (!tournamentrulesInput.val().trim() || !tournamentnameInput.val().trim() || !tournamentdateInput.val() || !userSelect.val()) {
        return;
      }
      // Constructing a newTournament object to hand to the database
      var newTournament = {
        tournamentrules: tournamentrulesInput
          .val()
          .trim(),
        tournamentdate: tournamentdateInput
        .val(),
        tournamentname: tournamentnameInput
          .val()
          .trim(),
        UserId: userSelect.val()
      };
  
      // If we're updating a tournament run updateTournament to update a tournament
      // Otherwise run submitTournament to create a whole new tournament
      if (updating) {
        newTournament.id = tournamentId;
        updateTournament(newTournament);
      }
      else {
        submitTournament(newTournament);
      }
    }
  
    // Submits a new tournament and brings user to blog page upon completion
    function submitTournament(tournament) {
      $.post("/api/tournaments", tournament, function() {
        window.location.href = "/tournaments";
      });
    }
  
    // Gets tournament data for the current tournament if we're editing, or if we're adding to an user's existing tournaments
    function getTournamentData(id, type) {
      var queryUrl;
      switch (type) {
      case "tournament":
        queryUrl = "/api/tournaments/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.UserId || data.id);
          // If this tournament exists, prefill our tournament forms with its data
          tournamentrulesInput.val(data.tournamentrules);
          tournamentnameInput.val(data.tournamentname);
          tournamentdateInput.val(data.tournamentdate);
          userId = data.UserId || data.id;
          // If we have a tournament with this id, set a flag for us to know to update the tournament
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Users and then render our list of Users
    function getUsers() {
      $.get("/api/users", renderUserList);
    }
    // Function to either render a list of users, or if there are none, direct the user to the page
    // to create an user first
    function renderUserList(data) {
      if (!data.length) {
        window.location.href = "/users";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      userSelect.empty();
      console.log(rowsToAdd);
      console.log(userSelect);
      userSelect.append(rowsToAdd);
      userSelect.val(userId);
    }
  
    // Creates the user options in the dropdown
    function createUserRow(user) {
      var listOption = $("<option>");
      listOption.attr("value", user.id);
      listOption.text(user.username);
      return listOption;
    }
  
    // Update a given tournament, bring user to the blog page when done
    function updateTournament(tournament) {
      $.ajax({
        method: "PUT",
        url: "/api/tournaments",
        data: tournament
      })
        .then(function() {
          window.location.href = "/tournament";
        });
    }
  });
  