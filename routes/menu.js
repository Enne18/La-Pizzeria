'use strict';

var express = require('express');
var router = express.Router();
var pizzeriaDao = require('../modules/pizzeria-dao');
const user = require('../modules/user-dao');
const { check, validationResult } = require('express-validator');
const daoPren = require('../modules/prenotazioni-dao');

/* GET home page. */
router.get('/:ID_Pizzeria', function (req, res, next) {
    const auth = req.isAuthenticated();
    const user = req.user;
    pizzeriaDao.getPizzeriaByIdPizzeria(req.params.ID_Pizzeria).then((pizzeria) => {
        pizzeriaDao.getALLPizza(req.params.ID_Pizzeria).then((pizzas) => {
            res.render('menu', { auth, title: 'Scheda' + ' ' + pizzeria.Nome, message: null, pizzeria, pizzas, user });
        });
    });
});

router.post('/delete/:ID_Pizza', function (req, res, next) {
    const auth = req.isAuthenticated();
    const user = req.user;
    pizzeriaDao.deletePizza(req.params.ID_Pizza);

    pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
        daoPren.getALLPrenotazioni(user.id).then((prenotazionis) => {
            const auth = req.isAuthenticated();
            res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user });
        });
    });
});

router.post('/add/:ID_Pizzeria', [
    check('Nome').notEmpty().withMessage('Inserire il nome della pizza'),
    check('Ingredienti').notEmpty().withMessage('Inserire gli ingredienti della pizza'),
    check('Prezzo').notEmpty().withMessage('Inserire il prezzo della pizza')
], async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(error => error.msg);
        const auth = req.isAuthenticated();
        const user = req.user;
        pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
            res.render('reserved-area', { auth, title: 'Express', pizzeria, message: messages[0], user });
        });
    } else {
        try {
            const pizza = {
                Nome: req.body.Nome,
                Ingredienti: req.body.Ingredienti,
                Prezzo: req.body.Prezzo
            }

            const user = req.user;
            const idPizzeria = req.params.ID_Pizzeria;
            pizzeriaDao.insertPizza(idPizzeria, pizza);

            pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
                daoPren.getALLPrenotazioni(user.id).then((prenotazionis) => {
                    const auth = req.isAuthenticated();
                    res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user });
                });
            });

        } catch (error) {
            const user = req.user;
            pizzeriaDao.getPizzeriaById(user.id).then((pizzeria) => {
                daoPren.getALLPrenotazioni(user.id).then((prenotazionis) => {
                    const auth = req.isAuthenticated();
                    res.render('reserved-area', { auth, title: 'Express', pizzeria, prenotazionis, message: null, user });
                });
            });
        }
    }
});

module.exports = router;
