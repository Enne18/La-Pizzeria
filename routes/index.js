'use strict';

var express = require('express');
var router = express.Router();
const userDao = require('../modules/user-dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  const auth = req.isAuthenticated();
  const prop = userDao.getUserIsProp(req.user);
  res.render('index', { title: 'La Pizzeria', auth, message: null , prop});
});


module.exports = router;