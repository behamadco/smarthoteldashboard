export class FoodHallModel{
    _id:number=0;
    _name:string="";
    _startTime:string="";
    _endTime:string="";
    _type:string="";

    getID(){return this._id}

    getName(){return this._startTime}

    getEndTime(){return this._endTime}

    getType(){return this._type}

    fromString(foodHallParameter:any){
        this._id = foodHallParameter["id"];
        this._name = foodHallParameter["name"];
        this._startTime = foodHallParameter["startTime"];
        this._endTime = foodHallParameter["endTime"];
        this._type = foodHallParameter["type"];
    }
}