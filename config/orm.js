// Import MySQL connection.
var connection = require("../config/connection.js");

// Object for all our SQL statement functions.
var orm = {
  selectAll: function(burgers, res) {//what is cb???
    var queryString = "SELECT * FROM " + burgers + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      res(result);
    });
  },
  insertOne: function(burgers, cols, vals, res) {
    var queryString = "INSERT INTO " + burgers;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      res(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  updateOne: function(burgers, objColVals, condition, res) {
    var queryString = "UPDATE " + burgers;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      res(result);
    });
  },
};

// Export the orm object for the model (cat.js).
module.exports = orm;