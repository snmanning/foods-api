module.exports = function errorHandler(err, req, res, next) {
    console.log('here');
    res.status(500).json({
        msg: 'broke'
    });
};