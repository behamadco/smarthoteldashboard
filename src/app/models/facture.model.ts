import { ItemModel } from "./item.model";

export class FactureModel{
    _id:number=0;
    _title:string="";
    _item:ItemModel[]=[];
    _description:string="";
    _cost:number=0;
    _timestamp:string="";
    
    getID(){return this._id}

    getTitle(){return this._title}

    getItem(){return this._item}

    getDescription(){return this._description}

    getCost(){return this._cost}

    getTimeStamp(){return this._timestamp}

    fromString(factureParameters:any){
        this._id = factureParameters["id"];
        this._title = factureParameters["title"];
        this._description = factureParameters["description"];
        this._cost = factureParameters["cost"];
        this._timestamp = factureParameters["timestamp"];

        let itemAsArray:any = Array.from(factureParameters["items"]);
        for(var index=0;index<itemAsArray.length;index++){
            let item:ItemModel = new ItemModel();
            item.fromString(itemAsArray[index]);
            this._item.push(item);
        }
    }
}