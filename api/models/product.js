const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    rate: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
