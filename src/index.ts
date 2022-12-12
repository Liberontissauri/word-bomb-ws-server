import http from 'http';
import { Server } from "socket.io";
import { Socket } from "socket.io";
import winston from "winston";
import notifications from "./notifications";
import PackageSchemas from "./types/packages";
import { UserAction, UserActionPackage } from "./types/packages";
import { createClient } from 'redis';


const logFormat = winston.format.printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.label({ label: 'Socket Server' }),
        winston.format.timestamp(),
        logFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
            new winston.transports.Console({
        })
    ],
});

const client = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});
client.on('error', (err) => logger.error(`Redis Error: ${err}`));

const http_server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {});
const io = new Server(http_server);
logger.info("Socket Server Started")

async function authenticationMiddleware(socket: Socket<any>, next: (err?: any) => void) {
    const token = socket.data.token;
    if(!token) {
        logger.error(`User ${socket.id} has no token`);
        notifications.SendError(socket, "No Token");
        return next(new Error('authentication error'));
    }
    const db_token = await client.get(`token_${token}`);
    if(!db_token) {
        logger.error(`User ${socket.id} has invalid token`);
        notifications.SendError(socket, "Invalid Token");
        return next(new Error('authentication error'));
    }
    next();
}

io.use(authenticationMiddleware)

io.on('connection', (socket) => {
    
});