'use strict';

let express = require('express');
const pizzeriaDao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');
const { check, validationResult } = require('express-validator');
let router = express.Router();

//get della pagina per l'inserimento dei dati di una pizzeria da parte dell'admin
router.get('/', function (req, res, next) {
  const prop = userDao.getUserIsProp(req.user);
  res.render('register-pizzeria', { auth: false, title: 'Registra pizzeria', message: null, prop });
});

// Controllo dei valori inseriti nel form
router.post('/', [
  check('nome').notEmpty().withMessage('Inserire il nome della pizzeria'),
  check('indirizzo').notEmpty().withMessage('Inserire l indirizzo della pizzeria'),
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
    const prop = userDao.getUserIsProp(req.user);
    res.render('register-pizzeria', { auth: false, title: 'Registra pizzeria', message: messages[0], prop });
  } else {
    try {
      // campi validi, crea la pizzeria

      //inserisce la pizzeria e l'admin nel database

      const admin = {
        Email: req.body.emailAdmin,
        Password: req.body.pswAdmin,
        Proprietario: 0,
        NomeUtente: req.body.nome
      }

      userDao.insertAdmin(admin).then((id) => {
        const pizzeria = {
          Nome: req.body.nome,
          Indirizzo: req.body.indirizzo,
          Città: req.body.citta,
          Telefono: req.body.numero,
          Orari: req.body.GGhhApertura,
          Tipologia: req.body.categoria,
          GoogleMapsLink: null,
          Prop: id
        };

        console.log(pizzeria);
        pizzeriaDao.insertPizzeria(pizzeria);
        res.render('index', { title: 'La Pizzeria', auth: false, message: 'Pizzeria creata con successo, fare il login con i dati inseriti per accedere all area riservata', prop: 1 });
      });

      


    } catch (error) {
      const prop = userDao.getUserIsProp(req.user);
      res.render('register-pizzeria', { auth: false, title: 'Registra pizzeria', message: 'Errore nella registrazione della Pizzeria', prop });
    }
  }


});

module.exports = router;
