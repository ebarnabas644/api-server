const sql = require("./db.js");

const Featured = function(featured){
    this.id = featured.id;
}

Featured.create = (newFeatured, result) => {
    queryText =
  sql.query(`INSERT INTO featuredGames SET ?`, newFeatured, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newFeatured });
  });
};


Featured.getFeatured = (language, result) => {
    let query = `SELECT * FROM detailList${language} INNER JOIN featuredGames ON detailList${language}.steam_appid = featuredGames.id;`;
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

Featured.deleteAll = (result) => {
    let query = `DELETE FROM featuredGames`;
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

  module.exports = Featured
