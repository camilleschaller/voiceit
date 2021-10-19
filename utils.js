exports.requireJson = function (req, res, next) {
    if (req.is('application/json')) {
        return next();
    }
}