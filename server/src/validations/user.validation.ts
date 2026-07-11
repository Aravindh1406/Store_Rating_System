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

export const submitRatingSchema = Joi.object({

    storeId: Joi.number()

        .required(),

    rating: Joi.number()

        .integer()

        .min(1)

        .max(5)

        .required()

});

export const updateRatingSchema = Joi.object({

    rating: Joi.number()

        .integer()

        .min(1)

        .max(5)

        .required()

});

export const changePasswordSchema = Joi.object({

    oldPassword: Joi.string()

        .required(),

    newPassword: Joi.string()

        .min(8)

        .max(16)

        .pattern(

            /^(?=.*[A-Z])(?=.*[\W_]).+$/

        )

        .required()

});