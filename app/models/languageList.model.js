const sql = require("./db.js");

const Language = function(language){
    this.language = language.language;
    this.languageValue = language.languageValue;
}

Language.create = (newLanguage, result) => {
    queryText =
  sql.query(`INSERT INTO languageList SET ?`, newLanguage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newLanguage });
  });
};

Language.getAll = (language, result) => {
    let query = `SELECT * FROM languageList`;
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

  module.exports = Language
