module.exports = app => {
    const genreList = require("../controllers/genreList.controller.js");
    var router = require("express").Router();
    // Create a new genre
    router.post("/", genreList.create);
    // Retrieve all genres
    router.get("/", genreList.findAll);
    app.use('/api/genreList', router);
  };
