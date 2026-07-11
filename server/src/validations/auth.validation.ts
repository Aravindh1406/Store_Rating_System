import Joi from "joi";

export const registerSchema = Joi.object({

    name: Joi.string()

        .min(20)

        .max(60)

        .required(),

    email: Joi.string()

        .email()

        .required(),

    address: Joi.string()

        .max(400)

        .required(),

    password: Joi.string()

        .pattern(
            /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/
        )
        .required()

});

export const loginSchema = Joi.object({

    email: Joi.string()

        .email()

        .required(),

    password: Joi.string()

        .required()

});