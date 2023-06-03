import { ICard } from "./card.interface";
import { IRoom } from "./room.interface";

export interface IReader{
    id:number;
    room:IRoom;
    macAddress:string;
    processor:string;
    card:ICard,
    supportCard: ICard
    status:boolean;
}