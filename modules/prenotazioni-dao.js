"use strict"

const db = require('../db.js');


// ritorna una lista contenente tutte le prenotazioni della pizzeria specificata
exports.getALLPrenotazioni = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT NomePrenotazione, NumeroPersone, OrarioPrenotazione, DataPrenotazione FROM Prenotazione JOIN Pizzeria ON Prenotazione.IDPizzeriaPrenotazione = Pizzeria.ID_Pizzeria WHERE Prenotazione.IDPizzeriaPrenotazione = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            else {
                const prenotazioneInfo = rows.map((e) => ({
                    Nome: e.NomePrenotazione,
                    NPersone: e.NumeroPersone,
                    Orario: e.OrarioPrenotazione,
                    Data: e.DataPrenotazione
                }));
                resolve(prenotazioneInfo);
            }
        });
    });
};