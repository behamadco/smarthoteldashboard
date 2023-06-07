import { FactureModel } from "./facture.model";
import { TravelerModel } from "./traveler.model";

export class BillingModel{
    _id:number=0;
    _code:string="";
    _traveler!:TravelerModel;
    _facture:FactureModel[]=[];
    _cost:number=0;
    _dateAndTime:string="";
    _status:boolean=false

    getID(){return this._id}

    getCode(){return this._code}

    getCost(){return this._cost}

    getDateAndTime(){return this._dateAndTime}

    getStatus(){return this._status}

    fromString(billingParameters:any){
        this._id = billingParameters["id"];
        this._code = billingParameters["code"];
        this._traveler = new TravelerModel();
        this._traveler.fromString(billingParameters["traveler"]);
        this._cost = billingParameters["cost"];
        this._dateAndTime = billingParameters["dateAndTime"];
        this._status = billingParameters["status"];

        let facturesAsArray = Array.from(billingParameters["facture"]);
        for(var index=0;facturesAsArray.length;index++){
            let facture:FactureModel = new FactureModel();
            facture.fromString(facturesAsArray[index]);
            this._facture.push(facture);
        }
    }
}