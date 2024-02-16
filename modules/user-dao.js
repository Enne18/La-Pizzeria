"use strict";

const db = require('../db.js');
const bcrypt = require('bcrypt');

//ritorna un utente dato il suo id
exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Utente WHERE ID_User = ?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'User not found.' });
            else {
                const user = {
                    id: row.ID_User,
                    email: row.Email
                }
                resolve(user);
            }
        });
    });
};

//ritorna un utente date email e password
exports.getUser = function (email, password) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM utente WHERE Email = ?';
        db.get(sql, [email], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'User not found.' });
            else {
                const user = {
                    id: row.ID_User,
                    email: row.Email,
                    proprietario: row.Proprietario
                }
                let check = true;
                resolve({ user, check });
            }
        });
    });
};

// inserisce un nuovo utente
exports.insertUser = function (user) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Utente(Email, Password, Proprietario, NomeUtente) VALUES (?,?,?,?)';
        user.Password = bcrypt.hashSync(user.Password, 10);
        db.run(sql, [
            user.Email,
            user.Password,
            user.admin,
            user.NomeUtente
        ], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}

//ritorna un proprietario dato il suo id
exports.getUserById = function (id) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Utente WHERE ID_User = ?';
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (row === undefined)
                resolve({ error: 'User not found.' });
            else {
                const user = {
                    id: row.ID_User,
                    email: row.Email
                }
                resolve(user);
            }
        });
    });
};

// inserisce un nuovo proprietario
exports.insertAdmin = function (admin) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Utente(Email, Password, Proprietario, NomeUtente) VALUES (?,?,?,?)';
        admin.Password = bcrypt.hashSync(admin.Password, 10);
        db.run(sql, [
            admin.Email,
            admin.Password,
            admin.admin,
            admin.NomeUtente
        ], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
        });
    });
}
