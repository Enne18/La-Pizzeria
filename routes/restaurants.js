'use strict';

var express = require('express');
var router = express.Router();
var dao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');

/* GET restaurants page. */
router.get('/', function(req, res, next) {
  dao.getAllPizzerias().then((pizzerias) => {
    const auth = req.isAuthenticated();
    const user = req.user;
    const prop = userDao.getUserIsProp(req.user);
    res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, user, prop});
  });
  
});

router.post('/search', async function(req, res, next){
  const search = '%' + req.body.search + '%';
  dao.getSearchedPizzerias(search).then((pizzerias) => {
    const auth = req.isAuthenticated();
    const user = req.user;
    const prop = userDao.getUserIsProp(req.user);
    res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, user, prop});
  });
});


module.exports = router;
