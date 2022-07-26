const Language = require("../models/languageList.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an language
  const language = new Language({
    language: req.body.language,
    languageValue: req.body.languageValue
  });
  // Save language in the database
  Language.create(language, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the language."
      });
    else res.send(data);
  });
};
// Retrieve all languages from the database (with condition).
exports.findAll = (req, res) => {
    const language = req.query.l;
    Language.getAll(language, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving languages."
        });
      else res.send(data);
    });
  };
