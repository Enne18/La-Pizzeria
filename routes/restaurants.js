'use strict';

var express = require('express');
var router = express.Router();
var dao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');

/* GET restaurants page. */
router.get('/', function(req, res, next) {
  dao.getAllPizzerias().then((pizzerias) => {
    dao.getALLCity().then((cittaOrdinate) => {
      const auth = req.isAuthenticated();
      const user = req.user;
      const prop = userDao.getUserIsProp(req.user);
      res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, cittaOrdinate, user, prop});
    });
  });
});

router.post('/search', async function(req, res, next){
  const search = '%' + req.body.search + '%';
  dao.getSearchedPizzerias(search).then((pizzerias) => {
    dao.getALLCity().then((cittaOrdinate) => {
      const auth = req.isAuthenticated();
      const user = req.user;
      const prop = userDao.getUserIsProp(req.user);
      res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, cittaOrdinate, user, prop});
    });
  });
});

router.post('/filter', async function(req, res, next){
  const filter = '%' + req.body.filter + '%';
  dao.getFilteredPizzeria(filter).then((pizzerias) => {
    dao.getALLCity().then((cittaOrdinate) => {
      const auth = req.isAuthenticated();
      const user = req.user;
      const prop = userDao.getUserIsProp(req.user);
      res.render('restaurants', { auth, title: 'Express', message: null , pizzerias, cittaOrdinate, user, prop});
    });
  });
});


module.exports = router;
