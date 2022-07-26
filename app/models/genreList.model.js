const sql = require("./db.js");

const Genre = function(genre){
    this.language = genre.language;
    this.genreValue = genre.genreValue;
}

Genre.create = (newGenre, result) => {
    queryText =
  sql.query(`INSERT INTO genreList SET ?`, newGenre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newGenre });
  });
};

Genre.getAll = (language, result) => {
    let query = `SELECT * FROM genreList`;
    if (language) {
      query += ` WHERE language LIKE '%${language}%'`;
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

  module.exports = Genre
