//Requeriments 
const mongoose = require('mongoose');

//This is a scheme to organize and know what will be uploaded via CSV.
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

//Export the schema for use
module.exports = mongoose.model('History', historySchema);
