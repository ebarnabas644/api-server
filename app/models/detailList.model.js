const sql = require("./db.js");
// constructor
const AppDetail = function(appDetail) {
    this.steam_appid = appDetail.steam_appid;
    this.name = appDetail.name;
    this.required_age = appDetail.required_age;
    this.is_free = appDetail.is_free;
    this.detailed_description = appDetail.detailed_description;
    this.about_the_game = appDetail.about_the_game;
    this.short_description = appDetail.short_description;
    this.supported_languages = appDetail.supported_languages;
    this.reviews = appDetail.reviews;
    this.header_image = appDetail.header_image;
    this.website = appDetail.website;
    this.developers = appDetail.developers;
    this.publishers = appDetail.publishers;
    this.windows = appDetail.windows;
    this.mac = appDetail.mac;
    this.linux = appDetail.linux;
    this.metacritic_score = appDetail.metacritic_score;
    this.metacritic_url = appDetail.metacritic_url;
    this.categories = appDetail.categories;
    this.genres = appDetail.genres;
    this.screenshots_thumbnail = appDetail.screenshots_thumbnail;
    this.screenshots_full = appDetail.screenshots_full;
    this.recommendations = appDetail.recommendations;
    this.coming_soon = appDetail.coming_soon;
    this.date = appDetail.date;
    this.pc_requirements_min = appDetail.pc_requirements_min;
    this.pc_requirements_recommended = appDetail.pc_requirements_recommended;
};
AppDetail.create = (newApp, language, result) => {
    queryText =
  sql.query(`INSERT INTO detailList${language} SET ?`, newApp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newApp });
  });
};
AppDetail.findById = (steam_appid, language, result) => {
  sql.query(`SELECT * FROM detailList${language} WHERE steam_appid = ${steam_appid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found app: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
AppDetail.getAll = (name, language, result) => {
  let query = `SELECT * FROM detailList${language}`;
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("apps: ", res);
    result(null, res);
  });
};
AppDetail.updateById = (steam_appid, steamApp, language, result) => {
  sql.query(
    `UPDATE detailList${language} SET steam_appid = ?, name = ?, required_age = ?, is_free = ?, detailed_description = ?, about_the_game = ?, short_description = ?, supported_languages = ?, reviews = ?, header_image = ?, website = ?, developers = ?, publishers = ?, windows = ?, mac = ?, linux = ?, metacritic_score = ?, metacritic_url = ?, categories = ?, genres = ?, screenshots_thumbnail = ?, screenshots_full = ?, recommendations = ?, coming_soon = ?, date = ?, pc_requirements_min = ?, pc_requirements_recommended = ?  WHERE steam_appid = ?`,
    [steamApp.steam_appid, steamApp.name, steamApp.required_age, steamApp.is_free, steamApp.detailed_description, steamApp.about_the_game, steamApp.short_description, steamApp.supported_languages, steamApp.reviews, steamApp.header_image, steamApp.website, steamApp.developers, steamApp.publishers, steamApp.windows, steamApp.mac, steamApp.linux, steamApp.metacritic_score, steamApp.metacritic_url, steamApp.categories, steamApp.genres, steamApp.screenshots_thumbnail, steamApp.screenshots_full, steamApp.recommendations, steamApp.coming_soon, steamApp.date, steamApp.pc_requirements_min, steamApp.pc_requirements_recommended, steam_appid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      //console.log("updated app: ", { steam_appid: steam_appid, ...steamApp });
      result(null, { steam_appid: steam_appid, ...steamApp });
    }
  );
};
AppDetail.remove = (steam_appid, language, result) => {
  sql.query(`DELETE FROM detailList${language} WHERE steam_appid = ?`, steam_appid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }
    //console.log("deleted app with id: ", steam_appid);
    result(null, res);
  });
};

AppDetail.getRange = (first_index, batch_size, language, name, coming_soon, windows, mac, linux, min_metacritic_score, supported_languages, genres, categories, result) => {
  let query2 = `SELECT * FROM detailList${language} LIMIT ${first_index}, ${batch_size}`;
  let query = `SELECT * FROM detailList${language} `;
  if(name || coming_soon || windows || mac || linux || min_metacritic_score || supported_languages || genres || categories){
    query += `WHERE `
    if(name){
      query += `name LIKE '%${name}%' AND `;
    }
    if(coming_soon){
      query += `coming_soon = ${coming_soon} AND `;
    }
    if(windows){
      query += `windows = ${windows} AND `;
    }
    if(mac){
      query += `mac = ${mac} AND `;
    }
    if(linux){
      query += `linux = ${linux} AND `;
    }
    if(min_metacritic_score){
      query += `metacritic_score >= ${min_metacritic_score} AND `;
    }
    if(supported_languages){
      var split = supported_languages.split(',')
      console.log(split)
      for (let i = 0; i < split.length; i++) {
        query += `supported_languages LIKE "%${split[i]}%" AND `;
      }
    }
    if(genres){
      var split = genres.split(',')
      console.log(split)
      for (let i = 0; i < split.length; i++) {
        query += `genres LIKE "%${split[i]}%" AND `;
      }
    }
    if(categories){
      var split = categories.split(',')
      console.log(split)
      for (let i = 0; i < split.length; i++) {
        query += `categories LIKE "%${split[i]}%" AND `;
      }
    }
    query = query.substring(0, query.length-4)
  }
  query += `LIMIT ${first_index}, ${batch_size}`
  console.log(query)
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log("apps: ", res);
    result(null, res);
  });
}
module.exports = AppDetail;
