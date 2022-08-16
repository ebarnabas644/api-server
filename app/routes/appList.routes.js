module.exports = app => {
    const appList = require("../controllers/appList.controller.js");
    var router = require("express").Router();
    // Create a new App
    router.post("/", appList.create);
    // Retrieve all Apps
    router.get("/", appList.findAll);
    // Retrieve a single App with id
    router.get("/:appid", appList.findOne);
    // Update a App with id
    router.put("/:appid", appList.update);
    router.get("/updateStatus/:appid&:state", appList.setUpdateStatus);
    // Delete a App with id
    router.delete("/:appid", appList.delete);
    // Delete all Apps
    router.delete("/", appList.deleteAll);
    app.use('/api/appList', router);
  };
