const express = require('express');
const mysql = require('mysql');
const path = require('path')
const dotenv = require('dotenv');


const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))
app.set('view engine', 'hbs');
dotenv.config({ path: './.env'});



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Database Connection Established!')
    }
})

app.get('/', (req, res) => {
    //res.send('Welcome to nodejs login app!')
    res.render('index');
})


app.listen(5001, () => {
    console.log('Listening to port 5001');
})