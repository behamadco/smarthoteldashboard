export class PermissionModel{

    _id:number = 0

    _name:string = "";

    _codename:string = "";

    getID(){ return this._id }

    getName(){ return this._name }

    getCodeName(){ return this._codename }

    fromString(permissionParameter:any){

        this._id = permissionParameter["id"];

        this._name = permissionParameter["name"];

        this._codename = permissionParameter["codename"]

    }

}