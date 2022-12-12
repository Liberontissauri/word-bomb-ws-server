import { Socket } from "socket.io";
import { ServerAction } from "./types/packages";

function SendError(socket: Socket, error: string):void {
    socket.emit(ServerAction.SendError, { message: {
        type: ServerAction.SendError,
        data: error,
    } });
}

export default {
    SendError,
}