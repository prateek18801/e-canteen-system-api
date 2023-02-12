const Product = require('../models/product');
const User = require('../models/user');

// product controllers

exports.getProduct = async (req, res, next) => {
    const { category } = req.params;
    try {
        if (category) {
            const product = await Product.find({ category }).lean();

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
        const user = await User.findById(req.user._id).populate({ path: 'cart', populate: { path: 'product_id', model: 'Product' } }).lean();

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
        const user = await User.findById(req.user._id);

        // increment quantity or add product in cart
        const idx = user.cart.findIndex(el => el.product_id.toString() === id);
        if (idx > -1) {
            user.cart[idx].qty++;
        } else {
            user.cart = [...user.cart, { product_id: id, qty: 1 }];
        }

        const updated = await (await user.save()).populate({ path: 'cart', populate: { path: 'product_id', model: 'Product' } });

        return res.status(200).json({
            ok: true,
            message: 'updated',
            data: updated.cart
        });

    } catch (err) {
        next(err);
    }
}




// transaction controllers

exports.makePayment = async (req, res, next) => {
    const { amount } = req.body;
    try {
        const user = await User.findById(req.user._id);
        console.log(user);
        const txn = await new Transaction({ user_id, amount }).save();
        const response = await initiateTransaction(txn._id, user, amount);
        console.log({ response });
        res.end(`<html>
        <head>
           <title>Merchant</title>
        </head>
        <body>
           <center>
              <h1>Please do not refresh this page...</h1>
           </center>
           <form method="post" action="https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${process.env.PAYTM_MID}&orderId=${txn._id}" name="paytm">
              <table border="1">
                 <tbody>
                    <input type="hidden" name="mid" value="${process.env.MID}">
                    <input type="hidden" name="orderId" value="${txn._id}">
                    <input type="hidden" name="txnToken" value="${response.body.txnToken}">
                 </tbody>
              </table>
              <script type="text/javascript"> document.paytm.submit(); </script>
           </form>
        </body>
     </html>`);

    } catch (err) {
        next(err);
    }
}

exports.handleCallback = async (req, res, next) => {

}
