module.exports = app => {
    const detailList = require("../controllers/detailList.controller.js");
    var router = require("express").Router();
    // Create a new App
    //router.post("/:language", detailList.create);
    router.post("/", detailList.create);
    // Retrieve all Apps
    router.get("/", detailList.findAll);
    // Retrieve a single App with id
    router.get("/:steam_appid", detailList.findOne);
    // Update a App with id
    router.put("/:steam_appid", detailList.update);
    // Delete a App with id
    router.delete("/:steam_appid", detailList.delete);
    router.get("/getBatch/:first", detailList.getBatch);
    app.use('/api/detailList', router);
  };
