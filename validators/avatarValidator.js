const Joi = require("joi");

const avatarValidator = Joi.object({
  userId: Joi.string().required(),

  avatarImage: Joi.string().required(),

  bodyType: Joi.string().optional(),

  skinTone: Joi.string().optional(),

  gender: Joi.string()
    .valid("male", "female", "other")
    .required(),

  avatarModel: Joi.string().optional(),
});

module.exports = avatarValidator;