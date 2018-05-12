var orm = require("../config/orm.js");
var express = require('express');
var router = express.Router();

var beers = {
  all: function(cbfunction) {
    orm.select('*', 'myBeers', function(response)
    {
      cbfunction(response);
    });
  },

  addBeer: function(coldata, colvalues, cb) { 
    // console.log("reached addBeer")
    orm.addNew('myBeers', coldata, colvalues, function(response) 
    {
      cb(response);
    });
  },

  updateBeer: function(ID, whichCol, toWhatVal, cb) { 
    // console.log("reached updateBeer:");
    // console.log(ID, whichCol, toWhatVal);
    orm.updateRecord('myBeers', whichCol, true, ID, function(response) 
    {
      cb(response);
    });
  },

  doneBeer: function(cb) {
    orm.selectWhere('myBeers', 'triedIt', true, function(response) {
      // console.log(response);
      cb(response);
    })
  },

  todoListBeer: function(cb) {
    orm.selectWhere('myBeers', 'triedIt', false, function(response) {
      // console.log(response);
      cb(response);
    })
  }
};

module.exports = beers;