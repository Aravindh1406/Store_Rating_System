import Joi from "joi";

export const createUserSchema = Joi.object({

    name: Joi.string()
        .min(20)
        .max(60)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(
            /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/
        )
        .required(),

    address: Joi.string()
        .max(400)
        .required(),

    role: Joi.string()
        .valid(
            "ADMIN",
            "USER",
            "STORE_OWNER"
        )
        .required()

});