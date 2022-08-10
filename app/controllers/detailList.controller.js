const AppDetail = require("../models/detailList.model.js");
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    const language = req.query.l;
    if(language){
        if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        }
        // Create an App
        const app = new AppDetail({
            steam_appid: req.body.steam_appid,
            name: req.body.name,
            required_age: req.body.required_age,
            is_free: req.body.is_free,
            detailed_description: req.body.detailed_description,
            about_the_game: req.body.about_the_game,
            short_description: req.body.short_description,
            supported_languages: req.body.supported_languages,
            reviews: req.body.reviews,
            header_image: req.body.header_image,
            website: req.body.website,
            developers: req.body.developers,
            publishers: req.body.publishers,
            windows: req.body.windows,
            mac: req.body.mac,
            linux: req.body.linux,
            metacritic_score: req.body.metacritic_score,
            metacritic_url: req.body.metacritic_url,
            categories: req.body.categories,
            genres: req.body.genres,
            screenshots_thumbnail: req.body.screenshots_thumbnail,
            screenshots_full: req.body.screenshots_full,
            recommendations: req.body.recommendations,
            coming_soon: req.body.coming_soon,
            date: req.body.date,
            pc_requirements_min: req.body.pc_requirements_min,
            pc_requirements_recommended: req.body.pc_requirements_recommended
        });
        // Save App in the database
        AppDetail.create(app, language, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the app."
            });
        else res.send(data);
        });
}
    else{
        res.status(500).send({
            message:
            "You must specify language!"
        });
    }
  };
  // Retrieve all Apps from the database (with condition).
  exports.findAll = (req, res) => {
      const language = req.query.l;
      const name = req.query.name;
      if(language){
        AppDetail.getAll(name, language, (err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving apps."
            });
            else res.send(data);
        });
    }
    else{
        res.status(500).send({
            message:
            "You must specify language!"
        });
    }
    };

  exports.getFeatured = (req, res) => {
    const language = req.query.l;
    if(language){
      AppDetail.getFeatured(language, (err, data) => {
          if (err)
          res.status(500).send({
              message:
              err.message || "Some error occurred while retrieving apps."
          });
          else res.send(data);
      });
  }
  else{
      res.status(500).send({
          message:
          "You must specify language!"
      });
  }
  }
  
  // Find a single app with a id
  exports.findOne = (req, res) => {
    const language = req.query.l;
    if(language){
        AppDetail.findById(req.params.steam_appid, language, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found app with id ${req.params.steam_appid}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving app with id " + req.params.steam_appid
            });
            }
        } else res.send(data);
        });
    }
    else{
        res.status(500).send({
            message:
            "You must specify language!"
        });
    }
  };
  
  // Update an app identified by the id in the request
  exports.update = (req, res) => {
    const language = req.query.l;
    if(language){
        // Validate Request
        if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        }
        console.log(req.body);
        AppDetail.updateById(
        req.params.steam_appid,
        new AppDetail(req.body), language,
        (err, data) => {
            if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found app with id ${req.params.steam_appid}.`
                });
            } else {
                res.status(500).send({
                message: "Error updating app with id " + req.params.steam_appid
                });
            }
            } else res.send(data);
        }
        );
    }
    else{
        res.status(500).send({
            message:
            "You must specify language!"
        });
    }
  };
  // Delete an app with the specified id in the request
  exports.delete = (req, res) => {
    const language = req.query.l;
    if(language){
      AppDetail.remove(req.params.steam_appid, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found app with id ${req.params.steam_appid}.`
              });
            } else {
              res.status(500).send({
                message: "Could not delete app with id " + req.params.steam_appid
              });
            }
          } else res.send({ message: `App was deleted successfully!` });
        });
    }
    else{
        res.status(500).send({
            message:
            "You must specify language!"
        });
    }
  };

  exports.getBatch = (req, res) => {
    const size = req.query.size;
    const language = req.query.l;
    const name = req.query.name;
    const coming_soon = req.query.coming_soon;
    const windows = req.query.windows;
    const mac = req.query.mac;
    const linux = req.query.linux;
    const min_metacritic_score = req.query.min_metacritic_score;
    const supported_languages = req.query.supported_languages;
    const genres = req.query.genres;
    const categories = req.query.categories;
    const user = req.query.user;
    AppDetail.getRange(req.params.first, size, language, name, coming_soon, windows, mac, linux, min_metacritic_score, supported_languages, genres, categories, user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving apps."
        });
      else res.send(data);
    });
  };
  