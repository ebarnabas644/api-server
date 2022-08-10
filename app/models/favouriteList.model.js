const sql = require("./db.js");

const Favourite = function(favourite) {
    this.steam_appid = favourite.steam_appid;
    this.user = favourite.user;
};

Favourite.create = (newFavourite, result) => {
    queryText = sql.query(`INSERT INTO favouriteList SET ?`, newFavourite, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        //console.log("created app entry: ", { id: res.insertId, ...newApp });
        result(null, { id: res.insertId, ...newFavourite });
      });
}

Favourite.find = (steam_appid, user, result) => {
    sql.query(`SELECT * FROM favouriteList WHERE steam_appid = ${steam_appid} AND user = '${user}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          var currentdate = new Date(); 
          var datetime = "[" + currentdate.getFullYear() + "/"
                          + (currentdate.getMonth()+1)  + "/" 
                          + currentdate.getDate()+ " @ "  
                          + currentdate.getHours() + ":"  
                          + currentdate.getMinutes() + ":" 
                          + currentdate.getSeconds()+"] ";
          console.log(datetime+"Found favourite with id of "+steam_appid + " " +user);
          const obj = {
            found: true
          }
          result(null, obj);
          return;
        }
        const obj = {
            found: false
          }
        result(null, obj);
      });
}

Favourite.remove = (steam_appid, user, result) => {
    sql.query(`DELETE FROM favouriteList WHERE steam_appid = ${steam_appid} AND user = '${user}'`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        result(null, res);
      });
}

module.exports = Favourite
