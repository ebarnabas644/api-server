const Category = require("../models/categoryList.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an category
  const category = new Category({
    language: req.body.language,
    value: req.body.value
  });
  // Save category in the database
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the category."
      });
    else res.send(data);
  });
};
// Retrieve all categorys from the database (with condition).
exports.findAll = (req, res) => {
    const language = req.query.l;
    Category.getAll(language, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categorys."
        });
      else res.send(data);
    });
  };
