import { ICompanion } from "./companion.interface";
import { IRoom } from "./room.interface";

export interface ITraveler{
    id:number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    nationalCode:string;
    status:boolean;
    lodging:string;
    companions:ICompanion[]
    room:IRoom
}