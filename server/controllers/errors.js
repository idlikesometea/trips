exports.get404 = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: 'Resource not found'
    });
};