'use strict';

var express = require('express');
var router = express.Router();
var pizzeriaDao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');
const pren = require('../modules/prenotazioni-dao');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  const auth = req.isAuthenticated();
  const user = req.user;
  const prop = userDao.getUserIsProp(req.user);
  pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
    pren.getALLPrenotazioni(user.id).then((prenotazionis) => {
      res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user, prop});
    });
  });
});

// Aggiornamento dei dati di una pizzeria esistente
router.post('/:ID_Pizzeria', [
  check('nome').notEmpty().withMessage('Inserire il nome della pizzeria'),
  check('indirizzo').notEmpty().withMessage('Inserire l \'indirizzo della pizzeria'),
  check('citta').notEmpty().withMessage('Inserire la citta\' dove si trova la pizzeria'),
  check('numero').isInt().withMessage('Inserire il numero di telefono della pizzeria'),
  check('GGhhApertura').notEmpty().withMessage('Inserire i giorni e gli orari di apertura della pizzeria'),
  check('categoria').notEmpty().withMessage('Inserire la categoria della pizzeria'),
  check('googleMapsLink'),
], async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Campi non validi, restituisce un messaggio di errore
    const messages = errors.array().map(error => error.msg);
    const auth = req.isAuthenticated();
    const user = req.user;
    pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
      pren.getALLPrenotazioni(user.id).then((prenotazionis) => {
        const auth = req.isAuthenticated();
        const prop = userDao.getUserIsProp(req.user);
        res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: messages[0], user, prop});
      });
    });
  } else {
    try {
      // Campi validi, esegui l'aggiornamento della pizzeria esistente

      // Recupera l'ID della pizzeria da aggiornare
      const pizzeriaID = req.params.ID_Pizzeria;
      const proprietarioID = req.user.id;
      console.log(pizzeriaID, proprietarioID);

      const pizzeria = {
        Nome: req.body.nome,
        Indirizzo: req.body.indirizzo,
        Città: req.body.citta,
        Telefono: req.body.numero,
        Orari: req.body.GGhhApertura,
        Tipologia: req.body.categoria,
        GoogleMapsLink: req.body.googleMapsLink,
        Prop: proprietarioID
      };

      pizzeriaDao.updatePizzeria(pizzeriaID, pizzeria).then(() => {
        res.redirect('/reserved-area');
      });

    } catch (error) {
      const auth = req.isAuthenticated();
      const user = req.user;
      const prop = userDao.getUserIsProp(req.user);
      pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
        pren.getALLPrenotazioni(user.id).then((prenotazionis) => {
          const auth = req.isAuthenticated();
          res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: 'Errore nell\'aggiornamento della Pizzeria', user, prop});
        });
      });
    }
  }
});

router.post('/delete/:IDPren', function (req, res, next) {
  const auth = req.isAuthenticated();
  const user = req.user;
  pren.deletePrenotazione(req.params.IDPren);

  pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
    pren.getALLPrenotazioni(user.id).then((prenotazionis) => {
      const auth = req.isAuthenticated();
      const prop = userDao.getUserIsProp(req.user);
      res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user, prop});
    });
  });
});

module.exports = router;
