export class FoodModel{
    _id:number=0;
    _name:string="";
    _cost:number=0;
    _inventory:number=0;
    _description:string="";

    getID(){return this._id}

    getName(){return this._name}

    getCost(){return this._cost}

    getInventory(){return this._inventory}

    getDescription(){return this._description}

    fromString(foodParameter:any){
        this._id = foodParameter["id"];
        this._name = foodParameter["name"];
        this._cost = foodParameter["cost"];
        this._inventory = foodParameter["inventory"];
        this._description = foodParameter["description"];
    }
}