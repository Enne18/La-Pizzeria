'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const dao = require('../modules/pizzeria-dao');
const daoUser = require('../modules/user-dao');

//tramite passport, gestisce il login dell'utente e dell'admin
router.post('/sessions', function (req, res, next) {
  passport.authenticate('user', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('index', { auth: false, message: 'Utente non esistente' });
    }
    req.login(user, function (err) {
      if (err) { return next(err); }
      // se è utente
      if (user.proprietario == 1) {
        daoUser.getUserById(user.id).then((user) => 
            {
              const auth = req.isAuthenticated();
              res.render('index', { auth, message: null, user });
            });
      }
      // se è admin
      else {
        dao.getPizzeriaById(user.id).then((pizzeria) => {
          const auth = req.isAuthenticated();          
          res.render('reserved-area', { auth, title: 'Express', pizzeria, message: null, user});

        });
      }
    });
  })(req, res, next);
});

//gestisce il logout
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/', { auth: false });
  });
});

module.exports = router;
