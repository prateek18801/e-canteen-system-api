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
                message: 'found',
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

exports.postProduct = async (req, res, next) => {
    const data = { ...req.body };
    const { id } = req.params;
    try {

        if (id) {
            const existing = await Product.findById(id);
            for (key in data) existing[key] = data[key];
            const saved = await existing.save();

            return res.status(200).json({
                ok: true,
                message: 'updated',
                data: saved
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

exports.getAvailableProducts = async (req, res, next) => {

}

exports.postAvailableProducts = async (req, res, next) => {
    
}
