const { render } = require('express/lib/response');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    db.query('SELECT email FROM users WHERE email = ?',[email], async (error, results) => {
        if(error) {
            console.log(error);
        }
        if(results.length > 0) {
            return res.render('register', { message: 'That email is already in use'});
        }
        else if(password !== passwordConfirm) {
            return res.render('register', { message: 'Passwords do not match'});
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
        db.query('INSERT INTO users SET ?', { first_name: firstName, last_name: lastName, email: email, password: hashedPassword}, (error, result) =>{
            if(error) {
                console.log(error);
            }
            else {
                return res.render('register', {message: 'User Registered Successfully!'});
            }
        })
    });
    
}