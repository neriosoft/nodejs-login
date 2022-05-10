const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login'
});

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Database Connection Established!')
    }
})

app.get('/', (req, res) => {
    res.send('Welcome to nodejs login app!')
})


app.listen(5001, () => {
    console.log('Listening to port 5001');
})