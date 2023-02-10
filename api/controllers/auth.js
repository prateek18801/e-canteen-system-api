const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ email: username }, { contact: username }] });
        if (user) {
            if (await user.match(password)) {

                // generate authentication token
                const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
                
                return res.status(200).json({
                    ok: true,
                    message: 'success',
                    token: token
                });
            }
        }

        return res.status(400).json({
            ok: false,
            message: 'invalid credentials'
        });
    } catch (err) {
        next(err);
    }
}

exports.postSignup = async (req, res, next) => {
    const data = {
        ...req.body,
        email: req.body.email.toLowerCase()
    }
    try {
        if (data.password !== data.confirm_password) {
            return res.status(400).json({
                ok: false,
                message: 'passwords do not match',
            });
        }

        const saved = await new User(data).save();

        // generate authentication token
        const token = jwt.sign({ email: saved.email, role: saved.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        return res.status(201).json({
            ok: true,
            message: 'created',
            data: saved,
            token: token
        });
    } catch (err) {
        next(err);
    }
}
