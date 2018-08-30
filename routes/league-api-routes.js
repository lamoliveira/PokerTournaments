// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the leagues
  
  app.get("/api/leagues", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.League
    db.League.findAll({
      include: [db.Tournament]
    }).then(function(dbLeague) {
      res.json(dbLeague);
    });
  });

  // Get route for retrieving a single league
  app.get("/api/leagues/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.League.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Tournament]
    }).then(function(dbLeague) {
      res.json(dbLeague);
    });
  });

  // POST route for saving a new league
  app.post("/api/leagues", function(req, res) {
    db.League.create(req.body).then(function(dbLeague) {
      res.json(dbLeague);
    });
  });

  // DELETE route for deleting leagues
  app.delete("/api/leagues/:id", function(req, res) {
    db.League.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbLeague) {
      res.json(dbLeague);
    });
  });

  // PUT route for updating leagues
  app.put("/api/leagues", function(req, res) {
    db.League.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLeague) {
      res.json(dbLeague);
    });
  });
};
