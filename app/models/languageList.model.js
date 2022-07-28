const sql = require("./db.js");

const Language = function(language){
    this.language = language.language;
    this.value = language.value;
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
    var query = ""
    if (language) {
      query += `SELECT value FROM languageList WHERE language LIKE '%${language}%'`;
    }
    else{
      query = `SELECT * FROM languageList`;
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
