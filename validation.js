const Joi = require('@hapi/joi')

//VALIDATION

const registerValidation = data => {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(12).required().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-zA-Z]).{12,}$/, "Alphanumeric and Special Character")
    }

return Joi.validate(data, schema)
}

const loginValidation = data => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }

return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
