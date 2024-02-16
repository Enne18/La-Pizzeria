'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const auth = req.isAuthenticated();
  const user = req.user;
  res.render('index', { title: 'La Pizzeria', auth, message: null , user});
});



module.exports = router;