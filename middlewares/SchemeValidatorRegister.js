const _ = require('lodash');
const Joi = require('joi');
const Schemas = require('../models/Schemas');

module.exports = (useJoiError = false) => {
      
	const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

     const _supportedMethods = ['post', 'put'];

    
    const _validationOptions = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };

    
    return (req, res, next) => {

        const route = '/register'
        const method = req.method.toLowerCase();

       
       
        if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
        
            const _schema = _.get(Schemas, route);

            if (_schema) {

             
                return Joi.validate(req.body, _schema, _validationOptions, (err, data) => {

                    if (err) {

                     
                        const JoiError = {
                            status: 'failed',
                            error: {
                                original: err._object,

                                
                                details: _.map(err.details, ({message, type}) => ({
                                    message: message.replace(/['"]/g, ''),
                                    type
                                }))
                            }
                        };

                   
                        const CustomError = {
                            status: 'failed',
                            error: 'Invalid request data. Please review request and try again.'
                        };

                       
                        res.status(422).json(_useJoiError ? JoiError : CustomError);

                    } else {
                        
                        req.body = data;
                        next();
                    }

                });

            }
        }

        next();
    };
};