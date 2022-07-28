const Genre = require("../models/genreList.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an genre
  const genre = new Genre({
    language: req.body.language,
    value: req.body.value
  });
  // Save genre in the database
  Genre.create(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the genre."
      });
    else res.send(data);
  });
};
// Retrieve all genres from the database (with condition).
exports.findAll = (req, res) => {
    const language = req.query.l;
    Genre.getAll(language, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving genres."
        });
      else res.send(data);
    });
  };
