const mongoose = require('mongoose');

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
    liked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    reset_token: String,
    reset_ts: Date
}, { timestamps: true });

// UserSchema.pre('save', async (next) => {
//     hash this.password and save
//     change reset password hash
// });

// UserSchema.methods.validatePassword = async (password) => {
//     compare password and return result
// }

module.exports = mongoose.model('User', UserSchema);
