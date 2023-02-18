const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        _id: false,
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number
    }],
    amount: {
        type: Number,
        required: true
    },
    token: {
        type: Number
    },
    txn_id: {
        type: String,
        unique: true,
        sparse: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


OrderSchema.pre('save', function(next) {
    this.token = Math.floor(Math.random() * 1e4);
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
