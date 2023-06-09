export class MasterReaderModel{
    _id:number=0;
    _macAddress:string="";
    _status:boolean=false;

    getID(){return this._id}

    getMacAddress(){return this._macAddress}

    getStatus(){return this._status}

    fromString(masterReaderParameter:any){
        this._id = masterReaderParameter["id"];
        this._macAddress = masterReaderParameter["macAddress"];
        this._status = masterReaderParameter["status"];
    }
}