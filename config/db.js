const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || 'Asd.123*',
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error Connecting to MySQL', err.message);
    } else {
        console.log('MySQL Connected');
    }
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.error('Error Connecting to Mongo', err));

module.exports = { db };