const Joi = require("joi");

const tryOnSchema = Joi.object({
  userId: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  productId: Joi.string().required()
});

module.exports = tryOnSchema;