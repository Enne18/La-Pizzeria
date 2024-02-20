'use strict';

let express = require('express');
const bodyParser = require('body-parser');
const userDao = require('../modules/user-dao.js');
const { check, validationResult } = require('express-validator');
let router = express.Router();


// salvataggio delle informazioni di un nuovo utente sul database
router.post('/', [
  check('name').notEmpty().withMessage('Inserire il nome'),
  check('email').isEmail().withMessage('Inserire indirizzo email valido'),
  check('password').isLength({ min: 8 }).withMessage('La password deve contenere almeno 8 caratteri')
], async function (req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Campi non validi
    const message = errors.array().map(error => error.msg);
    return res.render('index', { auth: false, message, prop: 1 });
  } else {
    try {
      // Campi validi, creo nuovo utente
      const user = {
        NomeUtente: req.body.name,
        Email: req.body.email,
        Password: req.body.password,
        admin: 0
      };
      await userDao.insertUser(user);
      res.redirect('/');
    } catch (error) {
      return res.render('index', { auth: false, message:'Email già utilizzata', prop: 1});
    }
  }
});

module.exports = router;