export class SmartUserModel{
    _token:string="";
    _name:string="";
    _username:string="";
    _uuid:string="";
    _email:string="";
    _phoneNumber:string="";

    getToken(){return this._token}

    getName(){return this._name}

    getUsername(){return this._username}

    getUUID(){return this._uuid}

    getEmail(){return this._email}

    getPhoneNumber(){return this._phoneNumber}

    fromString(smartUserParameters:any){
        this._token = smartUserParameters["token"];
        this._name = smartUserParameters["name"];
        this._username = smartUserParameters["username"]   
        this._uuid = smartUserParameters["uuid"];
        this._email = smartUserParameters["email"];
        this._phoneNumber = smartUserParameters["phoneNumber"];
    }
}