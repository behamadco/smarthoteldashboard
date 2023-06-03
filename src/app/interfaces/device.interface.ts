import { IRoom } from "./room.interface";

export interface IDevice{
    id:number;
    name:string,
    room:IRoom,
    macAddress:string,
    topic:string,
    type:string
}
