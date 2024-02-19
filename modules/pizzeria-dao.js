"use strict"

const db = require('../db.js');



//inserisce una pizzeria
exports.insertPizzeria = function (pizzeria) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Pizzeria(Nome, Indirizzo, Orari, Tipologia, GoogleMapsLink, Telefono, Città, Prop) VALUES (?,?,?,?,?,?,?,?)';
        db.run(sql, [
            pizzeria.Nome,
            pizzeria.Indirizzo,
            pizzeria.Orari,
            pizzeria.Tipologia,
            pizzeria.GoogleMapsLink,
            pizzeria.Telefono,
            pizzeria.Città,
            pizzeria.Prop
        ], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}

//aggiorna una pizzeria
exports.updatePizzeria = function (pizzeriaID, pizzeria) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Pizzeria SET Nome=?, Indirizzo=?, Orari=?, Tipologia=?, GoogleMapsLink=?, Telefono=?, Città=?, Prop=? WHERE ID_Pizzeria=?';
        db.run(sql, [
            pizzeria.Nome,
            pizzeria.Indirizzo,
            pizzeria.Orari,
            pizzeria.Tipologia,
            pizzeria.GoogleMapsLink,
            pizzeria.Telefono,
            pizzeria.Città,
            pizzeria.Prop,
            pizzeriaID
        ], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}

//ritorna una lista contenente tutte le pizzerie
exports.getAllPizzerias = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Pizzeria';
        db.all(sql, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pizzerias = rows.map((e) => (
                {
                    ID_Pizzeria: e.ID_Pizzeria,
                    Nome: e.Nome,
                    Indirizzo: e.Indirizzo,
                    Orari: e.Orari,
                    Tipologia: e.Tipologia,
                    GoogleMapsLink: e.GoogleMapsLink,
                    Telefono: e.Telefono,
                    Città: e.Città
                }));
            resolve(pizzerias);
        });
    });
};

//ritorna una lista contenente le pizzerie che rispettano i parametri di ricerca
exports.getSearchedPizzerias = function (search) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Pizzeria WHERE Nome like ? OR Tipologia like ? OR Orari like ? OR Indirizzo like ?';
        const params = Array(4).fill(search);
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const pizzerias = rows.map((e) => (
                {
                    ID_Pizzeria: e.ID_Pizzeria,
                    Nome: e.Nome,
                    Indirizzo: e.Indirizzo,
                    Orari: e.Orari,
                    Tipologia: e.Tipologia,
                    GoogleMapsLink: e.GoogleMapsLink,
                    Telefono: e.Telefono,
                    Città: e.Città
                }));
            resolve(pizzerias);
        });
    });
};

//ritorna la pizzeria identificata dall'id utente passato come parametro
exports.getPizzeriaById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Pizzeria JOIN Utente ON Pizzeria.Prop=Utente.ID_User WHERE ID_User=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            else if (row === undefined)
                resolve({ error: 'Pizzeria not found' });
            else {
                const pizzerias =
                {
                    ID_Pizzeria: row.ID_Pizzeria,
                    Nome: row.Nome,
                    Indirizzo: row.Indirizzo,
                    Orari: row.Orari,
                    Tipologia: row.Tipologia,
                    GoogleMapsLink: row.GoogleMapsLink,
                    Telefono: row.Telefono,
                    Città: row.Città,
                    Prop: row.Prop
                };
                resolve(pizzerias);
            }
        });
    });
};

//ritorna la pizzeria identificata dall'id pizzeria passato come parametro
exports.getPizzeriaByIdPizzeria = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Pizzeria WHERE ID_Pizzeria=?';
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            else if (row === undefined)
                resolve({ error: 'Pizzeria not found' });
            else {
                const pizzerias =
                {
                    ID_Pizzeria: row.ID_Pizzeria,
                    Nome: row.Nome,
                    Indirizzo: row.Indirizzo,
                    Orari: row.Orari,
                    Tipologia: row.Tipologia,
                    GoogleMapsLink: row.GoogleMapsLink,
                    Telefono: row.Telefono,
                    Città: row.Città,
                    Prop: row.Prop
                };
                resolve(pizzerias);
            }
        });
    });
};

// ritorna una lista contenente tutte le pizze della pizzeria specificata
exports.getALLPizza = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Pizza.Nome, Ingredienti, Prezzo, ID_Pizza FROM Pizza JOIN Pizzeria ON Pizza.ID_Pizzeria = Pizzeria.ID_pizzeria WHERE Pizza.ID_Pizzeria = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            else {
                const pizzaInfo = rows.map((e) => ({
                    PizzaNome: e.Nome,
                    Ingredienti: e.Ingredienti,
                    Prezzo: e.Prezzo,
                    ID_Pizza: e.ID_Pizza
                }));
                resolve(pizzaInfo);
            }
        });
    });
};

exports.insertPizza = function (pizzeriaID, pizza) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Pizza(Nome, ID_Pizzeria, Ingredienti, Prezzo) VALUES (?,?,?,?)';
        db.run(sql, [
            pizza.Nome,
            pizzeriaID,
            pizza.Ingredienti,
            pizza.Prezzo
        ], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(pizza);
            }
        });
    });
};

exports.updatePizza = function (pizza) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Pizza SET Nome = ?, Ingredienti = ?, Prezzo = ? WHERE ID_Pizza = ?';
        db.run(sql, [
            pizza.Nome,
            pizza.Ingredienti,
            pizza.Prezzo,
            pizza.ID_Pizza
        ], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(pizza);
            }
        });
    });
};

exports.deletePizza = function (pizza) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Pizza WHERE Pizza.ID_Pizza = ?';
        db.run(sql, [
            pizza
        ], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(pizza);
            }
        });
    });
};

// ritorna una lista contenente tutte le citta' delle pizzerie
exports.getALLCity = function () {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT DISTINCT Città FROM Pizzeria WHERE ID_Pizzeria = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            else {
                const citta = rows.map((e) => ({
                    elencoCitta: e.Città
                }));
                resolve(citta);
            }
        });
    });
};