var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/checks", function(req, res) {
    db.Check.findAll({}).then(function(dbChecks) {
      res.json(dbChecks);
    });
  });

  // Create a new example
  app.post("/api/checks", function(req, res) {
    db.Check.create(req.body).then(function(dbCheck) {
      res.json(dbCheck);
    });
  });

  // Delete an example by id
  app.delete("/api/checks/:id", function(req, res) {
    db.Check.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCheck) {
      res.json(dbCheck);
    });
  });
};
