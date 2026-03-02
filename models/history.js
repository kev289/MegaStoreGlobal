const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    customer_email: { type: String, unique: true },
    customer_name: String,
    transaction_details: [{
        details_id: String,
        transaction_id: String,
        product_sku: String,
        quantity: Number
    }]
});

module.exports = mongoose.model('History', historySchema);