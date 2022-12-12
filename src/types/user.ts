import Joi from "joi";

export interface User {
    id: string;
    name: string;
    auth: string;
    isOwner: boolean;
}

const UserSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    auth: Joi.string().required(),
    isOwner: Joi.boolean().required()
})

export default {
    UserSchema
}