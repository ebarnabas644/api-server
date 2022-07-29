const Featured = require("../models/featured.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an Featured
  const featured = new Featured({
    id: req.body.id
  });
  // Save Featured in the database
  Featured.create(featured, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Featured."
      });
    else res.send(data);
  });
};
// Retrieve all Featureds from the database (with condition).
exports.getFeatured = (req, res) => {
    const language = req.query.l;
    Featured.getFeatured(language, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Featureds."
        });
      else res.send(data);
    });
  };

exports.deleteAll = (req, res) => {
    Featured.deleteAll((err, data) =>{
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Featureds."
        });
      else res.send(data);
    })
}
