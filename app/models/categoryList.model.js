const sql = require("./db.js");

const Category = function(category){
    this.language = category.language;
    this.categoryValue = category.categoryValue;
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
    let query = `SELECT * FROM categoryList`;
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

  module.exports = Category
