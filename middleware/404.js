module.exports = function(req, res) {
    console.log(err);
    res.status(404).json({
        msg: 'Resource not found'
    });
};