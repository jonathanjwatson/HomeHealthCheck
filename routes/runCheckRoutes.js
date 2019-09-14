var db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/runChecks/:checkId", function(req, res) {
    console.log(typeof req.params.checkId);
    db.Check.findOne({
      where: {
        id: parseInt(req.params.checkId)
      }
    }).then(function(dbCheck) {
      axios
        .get(dbCheck.url)
        .then(response => {
          console.log(response.status);
          res.json(response.status);
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
};
