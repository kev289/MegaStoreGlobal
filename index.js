// Requirements

const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const upload = require('./config/multer'); 
const { db } = require('./config/db');
const history = require('./models/history');
const clientsRouter = require('./routes/clients');

const app = express();

// Middlewares
// Static files from the 'public' folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/clients', clientsRouter);

// Migration Route
app.post('/api/migrate', upload.single('archivo'), (req, res) => {
    
    // Validate that the file arrived
    if (!req.file) {
        return res.status(400).json({ error: "The csv file was not received" });
    }

    const pathArchivo = req.file.path;
    let filasProcesadas = 0;

// Process the CSV data stream    
        fs.createReadStream(pathArchivo)
        .pipe(csv())
        .on('data', (fila) => {
            // Insert tables and data into MySQL
            
            db.query('INSERT IGNORE INTO clients (customer_name, customer_email, customer_address, customer_phone) VALUES (?, ?, ?, ?)', 
                [fila.customer_name, fila.customer_email, fila.customer_address, fila.customer_phone]);
            
            db.query('INSERT IGNORE INTO supplier (supplier_name, supplier_email ) VALUES (?, ? )', 
                [fila.supplier_name, fila.supplier_email]);

            db.query('INSERT IGNORE INTO products (product_category, product_sku, product_name) VALUES (?, ?, ?)', 
                [fila.product_category, fila.product_sku, fila.product_name]);

            db.query('INSERT IGNORE INTO transactions (transaction_id, date, total_line_value) VALUES (?, ?, ?)', 
                [fila.transaction_id, fila.date, fila.total_line_value]);

            db.query('INSERT IGNORE INTO transaction_details (unit_price, quantity) VALUES (?, ? )', 
                [fila.unit_price, fila.quantity]);

            // 2. INSERT/UPDATE IN MONGO
            history.findOneAndUpdate(
                { customer_email: fila.customer_email },
                { 
                    $set: { customer_name: fila.customer_name },
                    $addToSet: { 
                        transaction_details: {
                            details_id: fila.details_id,
                            date: fila.date,
                            customerName: fila.customer_name,
                            quantity: fila.quantity,
                        }
                    }
                },
                { upsert: true }
            ).exec();

            filasProcesadas++;
        })
        .on('end', () => {
            if (fs.existsSync(pathArchivo)) {
                fs.unlinkSync(pathArchivo);
            }
            
            console.log(`Files Upload Succesfully: ${filasProcesadas} Colum process.`);
            return res.json({ 
                message: "Migration complete", 
                detalles: `Records ${filasProcesadas} processed succesfully.` 
            });
        })
        .on('error', (err) => {
            console.error("Error Processing the CSV:", err);
            return res.status(500).json({ error: "Error, Cannot read the CSV" });
        });
});

// QUERIES

// Suppliers with the most products sold and inventory value
app.get('/api/reports/top-suppliers', (req, res) => {
    const sql = `
        SELECT 
            s.supplier_name AS 'Supplier',
            COUNT(p.product_sku) AS 'Stock',
            SUM(p.unit_price * COALESCE(td.quantity, 0)) AS 'Inventory Value'
        FROM supplier s
        LEFT JOIN products p ON s.supplier_id = p.supplier_id
        LEFT JOIN transaction_details td ON p.product_sku = td.product_sku
        GROUP BY s.supplier_id, s.supplier_name
        ORDER BY 'Inventory Value' DESC;
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

/// A user's purchase history shows product, date, and total.
app.get('/api/reports/client-history/:customerId', (req, res) => {
    const { customerId } = req.params;
    const sql = `
        SELECT 
            t.transaction_id,
            t.date,
            p.product_name,
            p.product_category,
            td.quantity,
            td.unit_price,
            (td.quantity * td.unit_price) AS total_gastado
        FROM transactions t
        INNER JOIN clients c ON t.customer_id = c.customer_id
        INNER JOIN transaction_details td ON t.transaction_id = td.transaction_id
        INNER JOIN products p ON td.product_sku = p.product_sku
        WHERE c.customer_id = ?
        ORDER BY t.date DESC;
    `;
    db.query(sql, [customerId], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Star products: The best-selling products within a specific category
app.get('/api/reports/top-products/:category', (req, res) => {
    const { category } = req.params;
    const sql = `
        SELECT 
            p.product_sku,
            p.product_name,
            p.product_category,
            SUM(td.quantity) AS total_vendido,
            SUM(td.quantity * td.unit_price) AS ingresos_generados
        FROM products p
        INNER JOIN transaction_details td ON p.product_sku = td.product_sku
        WHERE p.product_category = ?
        GROUP BY p.product_sku, p.product_name, p.product_category
        ORDER BY ingresos_generados DESC;
    `;
    db.query(sql, [category], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});


// Run server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Database MegaStore Running in http://localhost:${PORT}`);
});
