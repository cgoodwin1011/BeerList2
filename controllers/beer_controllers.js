var express = require('express');
var router = express.Router();
var beers = require('../models/beers.js');
var exphbs = require('express-handlebars');

router.get('/', function(req, res) {
  // console.log("trying to get home page");
  beers.all(function(beerData){
    var tried = [];
    var untried = [];
    for (i=0; i < beerData.length; i++) {
      if (beerData[i].triedIt == true) {
        tried.push(beerData[i]);
      } else {
        untried.push(beerData[i]);
      }
    }
    var hbsCandy = {todoBeer: untried, doneBeer: tried};
    res.render('index', hbsCandy);
  });
} );

router.post('/api/newBeer', function(req, res){
  // console.log(req.body.newBeerName);
  beers.addBeer(['beer_name'], [req.body.newBeerName], function(data)
  {
    res.redirect('/');
  });
});

router.post('/api/triedBeer/:id', function (req, res) {
  var currentBeer = req.params.id;
  // console.log("current beer is "+currentBeer);
  beers.updateBeer(currentBeer, ['triedIt'], true, function(data) 
  {
    res.redirect('/');
  });
});
  
  

module.exports = router;