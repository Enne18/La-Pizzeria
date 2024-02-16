'use strict';

var express = require('express');
var router = express.Router();
var pizzeriaDao = require('../modules/pizzeria-dao');
const user = require('../modules/user-dao');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/* GET home page. */
router.get('/:ID_Pizzeria', function (req, res, next) {
  const auth = req.isAuthenticated();
  const user = req.user;
  pizzeriaDao.getPizzeriaByIdPizzeria(req.params.ID_Pizzeria).then((pizzeria) => {
    pizzeriaDao.getALLPizza(req.params.ID_Pizzeria).then((pizzas) => {
        res.render('menu', { auth, title: 'Scheda'+' '+pizzeria.Nome, message: null, pizzeria, pizzas, user});
    });
});
});

router.post('/:ID_Pizzeria', async function (req, res, next) {
    try {
        const pizzeriaID = req.params.ID_Pizzeria;
        const pizzasToUpdate = [];

        for (let i = 1; i <= 5; i++) {
            const nomePizza = req.body[`Pizza${i}`];
            const ingredientiPizza = req.body[`Pizza${i}Ingredients`];
            const prezzoPizza = parseFloat(req.body[`Pizza${i}Price`]);

            if ((nomePizza || ingredientiPizza || !isNaN(prezzoPizza)) && !(nomePizza && ingredientiPizza && !isNaN(prezzoPizza))) {
                throw new Error(`Nome, ingredienti e prezzo per la Pizza ${i} devono essere compilati`);
            }

            const pizzaData = {
                ID_Pizza: pizzeriaID * 100 + i - 1,
                Nome: nomePizza || null,
                Ingredienti: ingredientiPizza || null,
                Prezzo: !isNaN(prezzoPizza) ? prezzoPizza : null
            };
            pizzasToUpdate.push(pizzaData);
        }

        const updatePromises = pizzasToUpdate.map(pizza => updatePizza(pizza));
        await Promise.all(updatePromises);

        res.redirect('/menu');
    } catch (error) {
        res.render('menu', { auth, title: 'Express', message: error.message });
    }
});





module.exports = router;
