'use strict';

let express = require('express');
const pizzeriaDao = require('../modules/pizzeria-dao');
const user = require('../modules/user-dao');
const { check, validationResult } = require('express-validator');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//get della pagina per l'inserimento dei dati di una pizzeria da parte dell'admin
router.get('/', function (req, res, next) {
  res.render('register-pizzeria', { auth: false, title: 'Registra pizzeria', message: null });
});

// Controllo dei valori inseriti nel form
router.post('/', [
  check('nome').notEmpty().withMessage('Inserire il nome della pizzeria'),
  check('indirizzo').notEmpty().withMessage('Inserire l \'indirizzo della pizzeria'),
  check('citta').notEmpty().withMessage('Inserire la città dove si trova la pizzeria'),
  check('numero').notEmpty().withMessage('Inserire il numero di telefono della pizzeria'),
  check('GGhhApertura').notEmpty().withMessage('Inserire i giorni e gli orari di apertura della pizzeria'),
  check('categoria').notEmpty().withMessage('Inserire la categoria della pizzeria'),
  check('emailAdmin').notEmpty().withMessage('Email mancante'),
  check('pswAdmin').notEmpty().withMessage('Password mancante')
], async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Campi non validi, restituisce un messaggio di errore
    const messages = errors.array().map(error => error.msg);
    res.render('register-pizzeria', { auth: false, title: 'Registra pizzeria', message: messages[0] });
  } else {
    try {
      // campi validi, crea la pizzeria

      //inserisce la pizzeria e l'admin nel database

      const admin = {
        Email: req.body.emailAdmin,
        Password: req.body.pswAdmin,
        admin: 0,
        NomeUtente: req.body.nome
      }

      user.insertAdmin(admin).then((id) => {  
        const pizzeria = {
          Nome: req.body.nome,
          Indirizzo: req.body.indirizzo,
          Città: req.body.citta,
          Telefono: parseInt(req.body.numero),
          Orari: req.body.GGhhApertura,
          Tipologia: req.body.categoria,
          GoogleMapsLink: null,
          Prop: id
        };

        console.log(pizzeria);
        pizzeriaDao.insertPizzeria(pizzeria);
        //pizzeriaDao.insertPizza(id);
      });

      const auth = req.isAuthenticated();
      pizzeriaDao.getPizzeriaById(id).then((pizzeria) => {
        res.render('reserved-area', { auth, title: 'Express', pizzeria, message: null, user });
      });
    

    } catch (error) {
      res.render('register-pizzeria', { auth:false , title: 'Registra pizzeria', message: 'Errore nella registrazione della Pizzeria' });
    }
  }


});

module.exports = router;
