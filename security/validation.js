//Validation ---
const Joi = require('@hapi/joi');
const { model } = require('mongoose');


//Reister Form Validation
const regUserValidation = date => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        lname: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        pwd: Joi.string().min(6).required()
    });
    return schema.validate(date);
};

//Reister Form Validation
const loginUserValidation = date => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        pwd: Joi.string().min(6).required()
    });
    return schema.validate(date);
};

//Post From Validation
const postValidation = date => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(100).required(),
        text: Joi.string().max(255).min(6).required(),
        postBy: Joi.string().required(),
    });
    return schema.validate(date);
}

//Post From Validation
const bookValidation = date => {
    const schema = Joi.object({
        isbn: Joi.string().min(6).max(100).required(),
        name: Joi.string().max(255).min(6).required(),
        author: Joi.number().required(),
        cat: Joi.number().max(255).min(6).required(),
        lang: Joi.number().required(),
        edition: Joi.number().max(255).min(6).required(),
        volume: Joi.number().required(),
        wrapper: Joi.number().max(255).min(6).required(),
        unit: Joi.number().required(),
        price: Joi.number().max(255).min(6).required()
    });
    return schema.validate(date);
}

module.exports.regUserValidation = regUserValidation;
module.exports.loginUserValidation = loginUserValidation;
module.exports.postValidation = postValidation;
module.exports.bookValidation = bookValidation;