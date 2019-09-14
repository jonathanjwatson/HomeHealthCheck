var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Check.findAll({}).then(function(dbChecks) {
      res.render("index", {
        msg: "Welcome!",
        checks: dbChecks
      });
    });
  });

  //Load check page and pass in an check by id
  app.get("/check/:id", function(req, res) {
    db.Check.findOne({ where: { id: req.params.id } }).then(function(dbCheck) {
      res.render("check", {
        check: dbCheck
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
