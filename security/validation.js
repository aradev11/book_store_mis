//Validation ---
const Joi = require('@hapi/joi');


//Reister Form Validation
const regUserValidation = date => {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().required().email(),
        user_type: Joi.string().required(),
        pwd: Joi.string().min(6).required()
    });
    return schema.validate(date);
};

//Reister Form Validation
const loginUserValidation = date => {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        pwd: Joi.string().required()
    });
    return schema.validate(date);
};

//Post Validation
const postValidation = date => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(100).required(),
        text: Joi.string().max(255).min(6).required(),
        postBy: Joi.string().required(),
    });
    return schema.validate(date);
}

//Book Validation
const bookValidation = data => {
    const schema = Joi.object({
        isbn: Joi.string().min(6).max(100).required(),
        name: Joi.string().max(100).min(6).required(),
        author: {
            aut_id: Joi.string().required(),
            aut_name: Joi.string().required(),
            aut_lname: Joi.string().required()
        },
        cat: {
            cat_id: Joi.string().required(),
            cat_name: Joi.string().required()
        },
        lang: {
            lang_id: Joi.string().required(),
            lang_name: Joi.string().required()
        },
        edition: Joi.number().min(1).required().default(1),
        volume: Joi.number().required().default(0),
        wrapper: Joi.number().max(255).required(),
        unit: {
            unit_id: Joi.string().required(),
            unit_type: Joi.string().required(),
        },
        price: Joi.number().required(),
        details: {
            view: Joi.number().required().default(0),
            content: Joi.string().min(10).max(255),
            shelf: Joi.string().max(150).min(6).required(),
            publisher: {
                pub_id: Joi.string().required(),
                pub_name: Joi.string().required(),
            },
            pdf: Joi.string().required(),
            img: Joi.string().required(),
            transilator: {
                trans_id: Joi.string(),
                trans_name: Joi.string(),
                trans_lname: Joi.string()
            }
        }
    });
    return schema.validate(data);
}

// Author Validation
const authorValidation = function authorValidation(data) {
    const schema = Joi.object({
      first_name: Joi.string().min(1).max(100).required().trim(),
      last_name: Joi.string().min(1).max(100).required().trim(),
      img: Joi.string().replace(" ", "_"),
      about: Joi.string().required().trim(),
      country: Joi.string(),
      email: Joi.string().email().trim(),
      website: Joi.string().trim()
    });
    return schema.validate(data);
}

// Transilator Validation
const transilatorValidation = function transilatorValidation(data) {
    const schema = Joi.object({
      first_name: Joi.string().min(1).max(100).required(),
      last_name: Joi.string().min(1).max(100).required(),
      img: Joi.string().trim(),
      country: Joi.string(),
      about: Joi.string().required(),
      email: Joi.string().email(),
      website: Joi.string()
    });
    return schema.validate(data);
}

// Customer Validation
const customerValidation = function customerValidation(data) {
    const schema = Joi.object({
        id_card: Joi.number().max(100),
        first_name: Joi.string().required().max(100), 
        last_name: Joi.string().required().max(100),
        is_active: Joi.boolean(),
        email: Joi.string().email().required().min(6).max(100),
        phone: Joi.number().required(),
        code: Joi.number().required(),
        addresses: Joi.array(),
    });
    return schema.validate(data);
}

// Country Validation
const countryValidation = function countryValidation(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        lang: Joi.array().required(),
        code: Joi.number().required(),
        city: Joi.array(),
    });
    return schema.validate(data);
}

// City Validation
const cityValidation = function cityValidation(data) {
    const schema = Joi.object({
        name: Joi.string().required(),
        country: Joi.string()
    });
    return schema.validate(data);
}

// Employess Validation
const employeeValidation = function employeeValidation(data) {
    const schema = Joi.object({
        id_card: Joi.string().required().trim(),
        first_name: Joi.string().required().max(100).trim(),
        last_name: Joi.string().required().max(100).trim(),
        father_name: Joi.string().max(100).trim(),
        is_active: Joi.boolean().default(false),
        dob: Joi.date().required(),
        gender: Joi.string().required().trim(),
        position: Joi.string().required().trim(),
        contract: Joi.array(),
        email: Joi.string().required().email().trim(),
        phone: Joi.number().required(),
        auth: Joi.string().trim(),
        describe: Joi.string().max(255),
        addresses: Joi.array()
    }); 
    return schema.validate(data);
}

// Category Validation
const categoryValidation = function categoryValidation(data) {
    const schema = Joi.object({
        title: Joi.string().required().trim()
    });
    return schema.validate(data);
}

// Unit Price validation
const unitValidation = function unitValidation(data) {
    const schema = Joi.object({
        title: Joi.string().required().trim(),
        code: Joi.string().required().trim(),
        symbol: Joi.string().required().trim()
    });
    return schema.validate(data);
}
const publisherValidation = function publisherValidation(data) {
    const schema = Joi.object({
        name: Joi.string().required().trim(),
        phone: Joi.number().required(),
        email: Joi.string().required().trim().email(),
        addresses: Joi.array(),
        website: Joi.string()
    })
    return schema.validate(data);
}

module.exports.regUserValidation = regUserValidation;
module.exports.loginUserValidation = loginUserValidation;
module.exports.postValidation = postValidation;
module.exports.bookValidation = bookValidation;
module.exports.authorValidation = authorValidation;
module.exports.transilatorValidation = transilatorValidation;
module.exports.customerValidation = customerValidation;
module.exports.countryValidation = countryValidation;
module.exports.cityValidation = cityValidation;
module.exports.employeeValidation = employeeValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.unitValidation = unitValidation;
module.exports.publisherValidation = publisherValidation;
