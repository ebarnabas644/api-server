const sql = require("./db.js");

const Genre = function(genre){
    this.language = genre.language;
    this.value = genre.value;
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
  var query = ""
  if (language) {
    query += `SELECT value FROM genreList WHERE language LIKE '%${language}%'`;
  }
  else{
    query = `SELECT * FROM genreList`;
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
