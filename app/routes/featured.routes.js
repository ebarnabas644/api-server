module.exports = app => {
    const featured = require("../controllers/featured.controller.js");
    var router = require("express").Router();
    // Create a new genre
    router.post("/", featured.create);
    // Retrieve all genres
    router.get("/", featured.getFeatured);
    router.delete("/", featured.deleteAll)
    app.use('/api/featured', router);
  };
