//Backend Validations


const Joi = require('joi');


const schemaforlocalPaper=Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().required().allow("",null),
        location:Joi.string().required(),
        date:Joi.string().required(),
        time:Joi.string().required(),
        city:Joi.string().required(),
})

module.exports={schemaforlocalPaper};