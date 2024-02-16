'use strict';

var express = require('express');
var router = express.Router();
var dao = require('../modules/pizzeria-dao');

/* GET restaurants page. */
router.get('/', function(req, res, next) {
  dao.getAllPizzerias().then((pizzerias) => {
    const auth = req.isAuthenticated();
    const user = req.user;
    res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, user});
  });
  
});


module.exports = router;
