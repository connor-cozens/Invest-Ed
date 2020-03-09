const Joi = require('joi');

const id = Joi.number().integer()

const firstname = Joi.string().regex(/^[A-Z]+$/).uppercase();
const lastname = Joi.string().regex(/^[A-Z]+$/).uppercase();

const email = Joi.string().email().lowercase().required()
const username = Joi.string().lowercase()

const password = Joi.string().regex(/^(?=.{6,})(?=.*[0-9].*)(?=.*[a-z].*).*$/)

const organization = Joi.string()
const accesslevel = Joi.number().integer().valid([0,1,2])


const userDataSchema = Joi.object().keys({
    firstName: firstname.required(),
    lastName: lastname.required(),
    email: email.required(),
    username: username.required(),
    password: password.strict().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
    organization: organization.required(),
    accessLevel: accesslevel.required()
})

const userLoginScheme = Joi.object().keys({
    username: username.required(),
    password: password.strict().required()
})

module.exports = userDataSchema
module.exports = {
    '/register': userDataSchema,
    '/login': userLoginScheme
}
