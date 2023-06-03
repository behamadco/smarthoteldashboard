import { IFacture } from "./facture.interface";
import { ITraveler } from "./traveler.interface";

export interface IBill{
    id:number;
    code:string;
    traveler:ITraveler;
    factures:IFacture[],
    cost:number;
    dateAndTime:string;
    status:boolean;
}