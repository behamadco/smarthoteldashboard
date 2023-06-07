export class CameraModel{
    _id:number=0;
    _name:string="";
    _ip:string="";
    _location:string="";

    setID(id:number){this._id=id}

    setName(name:string){this._name=name}

    setIP(ip:string){this._ip=ip}

    setLocation(location:string){this._location=location}

    getID(){return this._id}

    getName(){return this._name}

    getIP(){return this._ip}

    getLocation(){return this._location}

    fromString(cameraParameter:any){
        this._id = cameraParameter["id"];
        this._name = cameraParameter["name"];
        this._ip = cameraParameter["ip"];
        this._location = cameraParameter["location"];
    }
}