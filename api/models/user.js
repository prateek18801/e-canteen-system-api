const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'staff', 'user'],
        default: 'user'
    },
    cart: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        qty: Number
    }],
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    reset_token: String,
    reset_ts: Date
}, { timestamps: true });

UserSchema.pre('save', async function (next) {

    // check if the password is modified
    if (this.isModified('password')) {

        // hash the new password
        this.password = await bcrypt.hash(this.password, 10)

        // update reset token
        this.reset_token = Math.floor(Math.random() * 1e6);
        this.reset_ts = Date.now();
    }
    next();
});

UserSchema.methods.match = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
