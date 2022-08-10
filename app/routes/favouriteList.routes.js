module.exports = app => {
    const favouriteList = require("../controllers/favouriteList.controller.js");
    var router = require("express").Router();
    
    router.post("/", favouriteList.create);
    router.get("/", favouriteList.find);
    router.delete("/", favouriteList.delete);
    app.use('/api/favouriteList', router);
};
