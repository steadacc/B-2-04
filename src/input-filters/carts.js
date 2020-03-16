const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})

exports.validate_create_cart_input = validator.body({
  id_product: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(0).required(),
}, { joi: { abortEarly: false } })
