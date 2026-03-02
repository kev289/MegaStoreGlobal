// Requirements
const express = require('express');
const router = express.Router();
const { db } = require('../config/db');

// See all Clients
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM clients';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// See a CLient with ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM clients WHERE customer_id = ?;';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Client not found' });
        res.json(results[0]);
    });
});

// Create a Client 
router.post('/', (req, res) => {
    const { customer_name, customer_email, customer_address, customer_phone } = req.body;
    
    // Validate required fields
    if (!customer_name || !customer_email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Insert into tables of MySQL
    const sql = 'INSERT INTO clients (customer_name, customer_email, customer_address, customer_phone) VALUES (?, ?, ?, ?)';
    db.query(sql, [customer_name, customer_email, customer_address, customer_phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ 
            message: 'Client created successfully', 
            customer_id: result.insertId 
        });
    });
});

// Update a Client with ID
router.put('/:id', (req, res) => {
    const { customer_name, customer_email, customer_address, customer_phone } = req.body;
    const { id } = req.params;

    // Validate required fields
    if (!customer_name || !customer_email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    // Update data into tables MySQL
    const sql = 'UPDATE clients SET customer_name = ?, customer_email = ?, customer_address = ?, customer_phone = ? WHERE customer_id = ?';
    db.query(sql, [customer_name, customer_email, customer_address, customer_phone, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Client not found' });
        res.json({ message: 'Client updated successfully' });
    });
});

// Delete a client with ID
router.delete('/:id', (req, res) => {

    // SQL statement
    const sql = 'DELETE FROM clients WHERE customer_id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Client not found' });
        res.json({ message: 'Client deleted successfully' });
    });
});

module.exports = router;

