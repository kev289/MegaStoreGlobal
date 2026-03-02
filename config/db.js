// Requirements
const mysql = require('mysql2');
const mongoose = require('mongoose');
require('dotenv').config();

// Connection to MySQL with a environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || 'Asd.123*',
    database: process.env.DB_NAME
});

// Error if cannot connect with MySQL
db.connect((err) => {
    if (err) {
        console.error('Error Connecting to MySQL', err.message);
    } else {
        console.log('MySQL Connected');
    }
});

// Connection with Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo Connected'))
    // Error if cannot connect with Mongo
    .catch(err => console.error('Error Connecting to Mongo', err));

module.exports = { db };