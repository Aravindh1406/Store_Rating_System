import Joi from "joi";

export const createStoreSchema = Joi.object({

    name: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    address: Joi.string()
        .required(),

    ownerId: Joi.number()
        .required()

});