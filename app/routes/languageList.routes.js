module.exports = app => {
    const languageList = require("../controllers/languageList.controller.js");
    var router = require("express").Router();
    // Create a new Language
    router.post("/", languageList.create);
    // Retrieve all Languages
    router.get("/", languageList.findAll);
    app.use('/api/languageList', router);
  };
