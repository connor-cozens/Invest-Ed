const _ = require('lodash')
const Joi = require('joi')
const Schemas = require('../models/Schemas')

module.exports = (useJoiError = false) => {

	const _useJoiError = _.isBoolean(useJoiError) && useJoiError

    const _supportedMethods = ['post']

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }

    return (req, res, next) => {

        const route = '/register'
        const method = req.method.toLowerCase()

        if(_.includes(_supportedMethods, method) && _.has(Schemas, route)){

            const _schema = _.get(Schemas, route)

            if(_schema){

                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {

                    if(err){

                        res.json({"error": true, "message" : err.message.replace(/['"]/g, '') })

                    }else{

                        req.body = data
                        next()
                    }

                })

            }
        }

        next()
    }
}
