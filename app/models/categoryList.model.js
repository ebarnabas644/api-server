const sql = require("./db.js");

const Category = function(category){
    this.language = category.language;
    this.value = category.value;
}

Category.create = (newCategory, result) => {
    queryText =
  sql.query(`INSERT INTO categoryList SET ?`, newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created app entry: ", { id: res.insertId, ...newApp });
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.getAll = (language, result) => {
  var query = ""
  if (language) {
    query += `SELECT value FROM categoryList WHERE language LIKE '%${language}%'`;
  }
  else{
    query = `SELECT * FROM categoryList`;
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

  module.exports = Category
