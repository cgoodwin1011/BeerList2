var connection = require("../config/connection.js");

var orm = {
  
  select: function(whatToSelect, tableInput, cbFunc) {
    var queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [whatToSelect, tableInput], function(err, result) {
      if (err) throw err;
      cbFunc(result);
    });
  },

  selectWhere: function(tableInput, colToSearch, valOfCol, cbFunc) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    // console.log(queryString);
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if (err) throw err;
      // console.log(result);
      cbFunc(result);
    });
  },

  selectWhereTrue: function(tableInput, what, whenThisIsTrue) {
    queryString = "SELECT ?? FROM ?? WHERE ?? = true";
    connection.query(queryString, [what, tableInput,whenThisIsTrue])
  },

  selectWhereFalse: function(tableInput, what, whenThisIsFalse) {
    queryString = "SELECT ?? FROM ?? WHERE ?? = false OR ?? IS NULL";
    connection.query(queryString, [what, tableInput, whenThisIsTrue])
  },


  addNew: function(table, cols, value, cbFunc) {
    var queryString = "INSERT INTO ?? (??) VALUES (?)";
    // console.log("inserting "+value)
    connection.query(queryString, [table, cols, value], function(err, result) {
      if (err) throw err;
      cbFunc(result);
    });

  },

  updateRecord: function(table, whichCol, toWhatVal, whichRecord, cbFunc) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE id = ?";
    // console.log("updating "+whichCol+" to "+toWhatVal+" where ID equals "+whichRecord)
    connection.query(queryString, [table, whichCol, toWhatVal, whichRecord], function(err, result) {
      if (err) throw err;
      cbFunc(result);
    });
  }

};

module.exports = orm;