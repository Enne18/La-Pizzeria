'use strict';

var express = require('express');
var router = express.Router();
var pizzeriaDao = require('../modules/pizzeria-dao');
const user = require('../modules/user-dao');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { render } = require('ejs');

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

router.post('/menu', async function (req, res, next) {
    try {
        const pizzeriaID = req.params.pizzeriaID;
        const pizza = {
            Nome: req.body.Nome,
            ID_Pizzeria: pizzeriaID,
            Ingredienti: req.body.Ingredienti,
            Prezzo: req.body.Prezzo
        };

        // Chiama la funzione insertPizza
        pizzeriaDao.insertPizza(pizza, pizzeriaID);

    } catch (error) {
        var auth = req.isAuthenticated;
        res.render('menu', { auth, message: error });
    }
});





module.exports = router;
