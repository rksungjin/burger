// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

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
    queryString += "?";
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals[0], function(err, result) {
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