import { ICard } from "./card.interface";
import { ITraveler } from "./traveler.interface";

export interface ICardCredential{
    id:number;
    card:ICard;
    traveler:ITraveler;
    startDateandTime:string;
    endDateandTime:string;
    status:boolean
}