const sql = require("./db.js");
// constructor
const SteamApp = function(steamApp) {
    this.appid = steamApp.appid;
    this.name = steamApp.name;
    this.dead_entry = steamApp.dead_entry;
    this.update_scheduled = steamApp.update_scheduled;
    this.not_a_game = steamApp.not_a_game;
};
SteamApp.create = (newApp, result) => {
  sql.query("INSERT INTO appList SET ?", newApp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newApp });
  });
};
SteamApp.findById = (appid, result) => {
  sql.query(`SELECT * FROM appList WHERE appid = ${appid}`, (err, res) => {
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
SteamApp.getAll = (name, result) => {
  let query = "SELECT * FROM appList";
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
/*
GameList.getAllPublished = result => {
  sql.query("SELECT * FROM gameList WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("tutorials: ", res);
    result(null, res);
  });
};
*/
SteamApp.updateById = (appid, steamApp, result) => {
  sql.query(
    "UPDATE appList SET appid = ?, name = ?, dead_entry = ?, update_scheduled = ?, not_a_game = ? WHERE appid = ?",
    [steamApp.appid, steamApp.name, steamApp.dead_entry, steamApp.update_scheduled, steamApp.not_a_game, appid],
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
      //console.log("updated app: ", { appid: appid, ...steamApp });
      result(null, { appid: appid, ...steamApp });
    }
  );
};
SteamApp.remove = (appid, result) => {
  sql.query("DELETE FROM appList WHERE appid = ?", appid, (err, res) => {
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
    //console.log("deleted app with id: ", appid);
    result(null, res);
  });
};
SteamApp.removeAll = result => {
  sql.query("DELETE FROM appList", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    //console.log(`deleted ${res.affectedRows} apps`);
    result(null, res);
  });
};
SteamApp.setUpdateStatus = (appid, state, result) =>{
  sql.query(`UPDATE appList SET update_scheduled = ${state} WHERE appid = ${appid}`,
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
    //console.log("updated app: ", { appid: appid, ...steamApp });
    result(null, { appid: appid });
  })
}
module.exports = SteamApp;
