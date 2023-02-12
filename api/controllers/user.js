const Product = require('../models/product');
const User = require('../models/user');

// product controllers

exports.getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (id) {
            const product = await Product.findById(id).lean();

            if (!product) {
                return res.status(400).json({
                    ok: false,
                    message: 'not found'
                });
            }

            return res.status(200).json({
                ok: true,
                message: 'success',
                data: product
            });
        }

        const product = await Product.find().lean();

        return res.status(200).json({
            ok: true,
            message: 'success',
            data: product
        });
    } catch (err) {
        next(err);
    }
}

exports.getAvailableProduct = async (req, res, next) => {
    try {
        const products = await Product.find({ available: true }).lean();

        return res.status(200).json({
            ok: true,
            message: 'success',
            data: products
        });
    } catch (err) {
        next(err);
    }
}


// cart controllers

exports.getCart = async (req, res, next) => {
    try {
        // req.user.id = '63e7324607dd76d4bc12f9c2';
        user_id = '63e7324607dd76d4bc12f9c2';
        const user = await User.findById(user_id).populate({ path: 'cart', populate: { path: 'product_id', model: 'Product' } });
        
        return res.status(200).json({
            ok: true,
            message: 'found',
            data: user.cart
        });
    } catch (err) {
        next(err);
    }
}

exports.postCart = async (req, res, next) => {

}

exports.addToCart = async (req, res, next) => {
    const { id } = req.params;
    try {
        user_id = '63e7324607dd76d4bc12f9c2';
        const user = await User.findById(user_id);

        // increment quantity or add product in cart
        const idx = user.cart.findIndex(el => el.product_id.toString() === id);
        if (idx > -1) {
            user.cart[idx].qty++;
        } else {
            user.cart = [...user.cart, { product_id: id, qty: 1 }];
        }

        const updated = await user.save();

        return res.status(200).json({
            ok: true,
            message: 'updated',
            data: updated.cart
        });
    } catch (err) {
        next(err);
    }
}
