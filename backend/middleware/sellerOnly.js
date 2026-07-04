const sellerOnly = (req, res, next) => {
    if (req.user.role === "seller" || req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({
        message: "Access denied. Sellers only."
    });
};

module.exports = sellerOnly;