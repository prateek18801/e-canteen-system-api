const Product = require('../models/product');

exports.postProduct = async (req, res, next) => {
    const { id } = req.params;
    const data = { ...req.body };
    try {

        if (id) {
            const product = await Product.findById(id);
            for (key in data) product[key] = data[key];
            const updated = await product.save();

            return res.status(200).json({
                ok: true,
                message: 'updated',
                data: updated
            });
        }

        const saved = await new Product(data).save();

        return res.status(201).json({
            ok: true,
            message: 'created',
            data: saved
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(400).json({
                ok: false,
                message: 'not found'
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'deleted',
            data: deleted
        });
    } catch (err) {
        next(err);
    }
}

exports.toggleAvailableProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                ok: false,
                message: 'not found'
            });
        }

        product.available = !product.available;
        const updated = await product.save();

        return res.status(200).json({
            ok: true,
            message: 'updated',
            data: updated
        });
    } catch (err) {
        next(err);
    }
}
