import Joi from "joi";

export enum UserAction {
    WordChange = "wordChange",
    WordConfirm = "wordConfirm",
    StartGame  = "startGame",
    Authenticate = "authenticate",
}
const UserActionSchema: Joi.StringSchema = Joi.string().valid("wordChange", "wordConfirm", "startGame", "authenticate")

export enum ServerAction {
    UpdateClients = "updateClients",
    DisconnectUser = "disconnectUser",
    RequestAuthentication = "requestAuthentication",
    SendError = "sendError",
    SendInfo = "sendInfo",
}
const ServerActionSchema: Joi.StringSchema = Joi.string().valid("updateClients", "disconnectUser", "requestAuthentication", "sendError", "sendInfo")

export interface Package {
    timestamp: number;
}
const PackageSchema: Joi.ObjectSchema = Joi.object({
    timestamp: Joi.number().required()
})

export interface UserActionPackage extends Package {
    type: UserAction;
    room: string;
    user_id: string;
    data: any;
}
const UserActionPackageSchema: Joi.ObjectSchema = Joi.object({
    timestamp: Joi.number().required(),
    type: UserActionSchema.required(),
    room: Joi.string().required(),
    user_id: Joi.string().required(),
    data: Joi.object().required()
})

export interface ServerActionPackage extends Package {
    type: ServerAction;
    data: any;
}
const ServerActionPackageSchema: Joi.ObjectSchema = Joi.object({
    timestamp: Joi.number().required(),
    type: ServerActionSchema.required(),
    data: Joi.object().required()
})
UserActionPackageSchema.validate

export default {
    UserActionSchema,
    ServerActionSchema,
    PackageSchema,
    UserActionPackageSchema,
    ServerActionPackageSchema,
}