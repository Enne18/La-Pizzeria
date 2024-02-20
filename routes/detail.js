'use strict';

var express = require('express');
var router = express.Router();
const dao = require('../modules/pizzeria-dao');
const userDao = require('../modules/user-dao');
const prenDao = require('../modules/prenotazioni-dao');

/* GET pagina del dettaglio della pizzeria */
router.get('/:ID_Pizzeria', function (req, res, next) {
    const auth = req.isAuthenticated();
    const user = req.user;
    const prop = userDao.getUserIsProp(req.user);
    dao.getPizzeriaByIdPizzeria(req.params.ID_Pizzeria).then((pizzeria) => {
        dao.getALLPizza(req.params.ID_Pizzeria).then((pizzas) => {
            res.render('detail', { auth, title: 'Scheda'+' '+pizzeria.Nome, message: null, pizzeria, pizzas, user, prop});
        });
    });
});

router.post('/prenota/:ID_Pizzeria', function (req, res, next) {
    const auth = req.isAuthenticated();
    const user = req.user;
    const prop = userDao.getUserIsProp(req.user);
    const id = userDao.getUserById();

    const preno = {
        Nome: req.body.Nome,
        NPersone: req.body.Persone,
        Orario: req.body.Orario,
        ID_Pizzeria: req.params.ID_Pizzeria,
        Data: req.body.Data
      }

    prenDao.createPrenotazione(preno);

    dao.getPizzeriaByIdPizzeria(req.params.ID_Pizzeria).then((pizzeria) => {
        dao.getALLPizza(req.params.ID_Pizzeria).then((pizzas) => {
            res.render('detail', { auth, title: 'Scheda'+' '+pizzeria.Nome, message: 'Prenotazione confermata', pizzeria, pizzas, user, prop});
        });
    });
});

module.exports = router;