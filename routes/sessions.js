'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const dao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');
const daoPren = require('../modules/prenotazioni-dao');

//tramite passport, gestisce il login dell'utente e dell'admin
router.post('/sessions', function (req, res, next) {
  passport.authenticate('user', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('index', { auth: false, message: 'Utente non esistente', prop: 1});
    }
    req.login(user, function (err) {
      if (err) { return next(err); }
      // se è utente
      if (user.proprietario == 1) {
        userDao.getUserById(user.id).then((user) => 
            {
              const auth = req.isAuthenticated();
              const prop = userDao.getUserIsProp(req.user);
              res.render('index', { auth, message: null, user, prop});
            });
      }
      // se è admin
      else {
        dao.getPizzeriaById(user.id).then((pizzeria) => {
          daoPren.getALLPrenotazioni(user.id).then((prenotazionis) => {
            const auth = req.isAuthenticated();
            const prop = userDao.getUserIsProp(req.user);
            res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user, prop});
          });
        });
      }
    });
  })(req, res, next);
});

//gestisce il logout
router.post('/sessions/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
