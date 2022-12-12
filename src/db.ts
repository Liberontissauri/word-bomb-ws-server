import { RedisClientType } from "@redis/client";
import winston from "winston";
import { User } from "./types/user";
import UserSchemas from "./types/user";
import RoomSchemas from "./types/room";

async function getUserbyId(id: string, rdb: RedisClientType, logger:winston.Logger):Promise<User> {
    const db_user = await rdb.get(`user_${id}`);
    if(!db_user) {
        logger.error(`User ${id} does not exist`)
        throw new Error(`User ${id} does not exist`);
    }
    const db_user_json = JSON.parse(db_user);
    if(UserSchemas.UserSchema.validate(db_user_json).error) {
        logger.error(`User ${id} propreties dont conform to schema`)
        throw new Error(`User ${id} propreties dont conform to schema`);
    }

    return db_user_json;
}
function updateUser(id: string, update: User, rdb: RedisClientType, logger:winston.Logger) {
    if(UserSchemas.UserSchema.validate(update).error) {
        logger.error(`Updated user propreties dont conform to schema`)
        throw new Error(`Updated user propreties dont conform to schema`);
    }
    rdb.set(`user_${id}`, JSON.stringify(update));
}

async function getRoomById(id: string, rdb: RedisClientType, logger:winston.Logger):Promise<string> {
    const room = await rdb.get(`room_${id}`);
    if(!room) {
        logger.error(`Room ${id} does not exist`)
        throw new Error(`Room ${id} does not exist`);
    }
    const room_json = JSON.parse(room);
    if(RoomSchemas.RoomSchema.validate(room_json).error) {
        logger.error(`Room ${id} propreties dont conform to schema`)
        throw new Error(`Room ${id} propreties dont conform to schema`);
    }
    return room;
}
function updateRoom(id: string, update: string, rdb: RedisClientType, logger:winston.Logger) {
    if(RoomSchemas.RoomSchema.validate(update).error) {
        logger.error(`Updated room propreties dont conform to schema`)
        throw new Error(`Updated room propreties dont conform to schema`);
    }
    rdb.set(`room_${id}`, JSON.stringify(update));
}
