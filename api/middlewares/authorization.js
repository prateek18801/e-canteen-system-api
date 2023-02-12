const jwt = require('jsonwebtoken');

const permission = ['admin', 'staff', 'user'];

const authorization = (role) => {
    return (req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(' ')[1];

            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
                // check if user role matches with permission level
                if (permission.indexOf(decoded.role) <= permission.indexOf(role)) {
                    req.user = { _id: decoded._id, email: decoded.email, role: decoded.role };
                    return next();
                }

                return res.status(403).json({
                    ok: false,
                    message: 'forbidden'
                });
            }

            return res.status(401).json({
                ok: false,
                message: 'unauthorized'
            });

        } catch (err) {
            return res.status(401).json({
                ok: false,
                message: 'unauthorized'
            });
        }
    }
}
module.exports = authorization;
