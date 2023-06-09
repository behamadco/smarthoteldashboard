export class ItemModel{
    _id:number=0;
    _title:string="";
    _cost:number=0;
    _inventory:number=0;

    getID(){return this._id}

    getTitle(){return this._title}

    getCost(){return this._cost}

    getInventory(){return this._inventory}

    fromString(itemParameter:any){
        this._id = itemParameter["id"];
        this._title = itemParameter["title"];
        this._cost = itemParameter["cost"];
        this._inventory = itemParameter["inventory"];
    }
}