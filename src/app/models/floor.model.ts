export class FloorModel{
    _id:number=0;
    _number:number=0;

    getID(){return this._id}

    getNumber(){return this._number}

    fromString(floorParameters:any){
        this._id = floorParameters["id"];
        this._number = floorParameters["number"];
    }
}