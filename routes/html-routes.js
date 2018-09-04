// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  //app.get("/", function(req, res) {
  // If the user already has an account send them to the members page
  //if (req.user) {
  //res.redirect("/members");
  // }
  //res.sendFile(path.join(__dirname, "../public/signup.html"));
  //});

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/tours");
    } else {
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  //app.get("/signup", isAuthenticated, function (req, res) {

  app.get("/signup", function (req, res) {
    console.log("******get members");

    res.sendFile(path.join(__dirname, "../public/signup.html"));

  });

  // cms route loads cms.html
  app.get("/cms", function (req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/cms.html"));
    } else {
      res.redirect("/tours");
    }

  });

  // blog route loads blog.html
  app.get("/blog", function (req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/blog.html"));
    } else {
      res.redirect("/tours");
    }
  });

  // blog route loads blog.html
  app.get("/train", function (req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/train.html"));
    } else {
      res.redirect("/tours");
    }
  });

  // authors route loads author-manager.html
  app.get("/authors", function (req, res) {
    console.log("******get authors");
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/author-manager.html"));
    } else {
      res.redirect("/tours");
    }
  });

  // authors route loads author-manager.html
  app.get("/tournaments", function (req, res) {
    console.log("******get tournaments");
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/tournament.html"));
    } else {
      res.redirect("/tours");
    }
  });
  app.get("/leagues", function (req, res) {
    if (req.user) {
      db.League.findAll({
        //include: [db.Tournament]
      }).then(function (dbLeague) {
        var league = {
          league: dbLeague
        };
        res.render("leagues", league);
      });
    } else {
      res.redirect("/tours");
    }

  });
  app.get("/", function (req, res) {
    db.Tournament.findAll({
      //include: [db.Tournament]
    }).then(function (dbTournament) {
      var tournament = {
        tournament: dbTournament
      };
      res.render("tournament", tournament);
    });
  });
  app.get("/tours", function (req, res) {
    db.Tournament.findAll({
      //include: [db.Tournament]
    }).then(function (dbTournament) {
      var tournament = {
        tournament: dbTournament
      };
      res.render("tournament", tournament);
    });
  });
};