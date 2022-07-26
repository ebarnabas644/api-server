module.exports = app => {
    const categoryList = require("../controllers/categoryList.controller.js");
    var router = require("express").Router();
    // Create a new category
    router.post("/", categoryList.create);
    // Retrieve all categorys
    router.get("/", categoryList.findAll);
    app.use('/api/categoryList', router);
  };
