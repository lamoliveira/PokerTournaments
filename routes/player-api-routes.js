// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the players
  app.get("/api/players", function (req, res) {
    var query = {};
    console.log("api/players");
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.League
    db.Player.findAll({
      where: query,
      include: [db.Tournament, db.User]
    }).then(function (dbPlayer) {
      console.log("dbPlayer");
      console.log(dbPlayer.UserId);
      res.json(dbPlayer);
    });
  });

  // Get route for retrieving a single player
  app.get("/api/players/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.League
    db.Player.findOne({
      where: {
        UserId: req.params.UserId,
        TournamentId: req.params.UserId
      },
      include: [db.Tournament, db.User]
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // POST route for saving a new player
  app.post("/api/players", function (req, res) {
    db.Player.create(req.body).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // DELETE route for deleting players
  app.delete("/api/players/:id", function (req, res) {
    db.Player.destroy({
      where: {
        TournamentId: req.params.TournamentId,
        UserId: req.params.UserId
      }
    }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // PUT route for updating players
  app.put("/api/players", function (req, res) {
    db.Player.update(
      req.body, {
        where: {
          UserId: req.body.UserId,
          TournamentId: req.body.UserId
        }
      }).then(function (dbPlayer) {
      res.json(dbPlayer);
    });
  });
};