import { IItem } from "./item.interface";

export interface IFacture{
    id:number;
    title:string;
    item:IItem[];
    description:string;
    cost:string;
    timestamp:string
}