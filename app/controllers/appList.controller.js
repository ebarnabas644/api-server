const SteamApp = require("../models/appList.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create an App
  const app = new SteamApp({
    appid: req.body.appid,
    name: req.body.name,
    dead_entry: req.body.dead_entry,
    update_scheduled: req.body.update_scheduled,
    not_a_game: req.body.not_a_game
  });
  // Save App in the database
  SteamApp.create(app, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the app."
      });
    else res.send(data);
  });
};
// Retrieve all Apps from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;
    SteamApp.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving apps."
        });
      else res.send(data);
    });
  };

// Find a single app with a id
exports.findOne = (req, res) => {
  SteamApp.findById(req.params.appid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found app with id ${req.params.appid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving app with id " + req.params.appid
        });
      }
    } else res.send(data);
  });
};

// Update an app identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  SteamApp.updateById(
    req.params.appid,
    new SteamApp(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found app with id ${req.params.appid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating app with id " + req.params.appid
          });
        }
      } else res.send(data);
    }
  );
};
// Delete an app with the specified id in the request
exports.delete = (req, res) => {
    SteamApp.remove(req.params.appid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found app with id ${req.params.appid}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete app with id " + req.params.appid
            });
          }
        } else res.send({ message: `App was deleted successfully!` });
      });
};
// Delete all apps from the database.
exports.deleteAll = (req, res) => {
    SteamApp.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all apps."
          });
        else res.send({ message: `All apps were deleted successfully!` });
      });
};

exports.setUpdateStatus = (req, res) => {
  const id = req.params.appid
  const state = req.params.state
  SteamApp.setUpdateStatus(id, state, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found app with id ${req.params.appid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not update app with id " + req.params.appid
        });
      }
    } else res.send({ message: `App was updated successfully!` });
  })
}
