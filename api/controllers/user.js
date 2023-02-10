const Product = require('../models/product');

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
