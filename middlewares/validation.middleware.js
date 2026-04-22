const CustomError = require('../utils/Customerror');

module.exports = (req, res, next) => {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return next(new CustomError('All fields are required', 400));
    }

    if (typeof age !== 'number') {
        return next(new CustomError('Age must be a number', 400));
    }

    next();
};