'use strict';

var express = require('express');
var router = express.Router();
var dao = require('../modules/pizzeria-dao');

/* GET pagina del dettaglio della pizzeria */
router.get('/:ID_Pizzeria', function (req, res, next) {
    const auth = req.isAuthenticated();
    const user = req.user;
    dao.getPizzeriaByIdPizzeria(req.params.ID_Pizzeria).then((pizzeria) => {
        dao.getALLPizza(req.params.ID_Pizzeria).then((pizzas) => {
            res.render('detail', { auth, title: 'Scheda'+' '+pizzeria.Nome, message: null, pizzeria, pizzas, user});
        });
    });
});

module.exports = router;