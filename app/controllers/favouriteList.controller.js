const Favourite = require("../models/favouriteList.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create an category
    const favourite = new Favourite({
      steam_appid: req.body.steam_appid,
      user: req.body.user
    });
    // Save favourite in the database
    Favourite.create(favourite, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the category."
        });
      else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    Favourite.remove(req.body.steam_appid, req.body.user, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found favourite with id ${req.body.steam_appid} ${req.body.user}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete app with id " + req.body.steam_appid + " " + req.body.user
            });
          }
        } else res.send({ message: `Favourite was deleted successfully!` });
      });
  };

exports.find = (req, res) => {
    Favourite.find(req.body.steam_appid, req.body.user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found favourite with id ${req.body.steam_appid} ${req.body.user}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving app with id " + req.body.steam_appid + " " + req.body.user
            });
            }
        } else res.send(data);
        });
}
