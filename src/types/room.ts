import Joi from "joi";

export interface Room {
    id: string;
    name: string;
    ownerId: string;
    users: string[];
    maxUsers: number;
    isPrivate: boolean;
    password: string;
    language: string;
    round: number;
    currentWord: string;
    currentWordPrompt: string;
    started: boolean;
}

const RoomSchema: Joi.ObjectSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    ownerId: Joi.string().required(),
    users: Joi.array().items(Joi.string()).required(),
    maxUsers: Joi.number().required(),
    isPrivate: Joi.boolean().required(),
    password: Joi.string().required(),
    language: Joi.string().required(),
    round: Joi.number().required(),
    currentWord: Joi.string().required(),
    currentWordPrompt: Joi.string().required(),
    started: Joi.boolean().required()
})

export default {
    RoomSchema
}
