const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
    category: {
        type: String,
        enum: ['meal', 'snack', 'beverage', 'other'],
        required: true
    },
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
