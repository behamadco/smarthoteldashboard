import { PermissionModel } from "./permission.model";

export class GroupModel{

    _id:number = 0;

    _name:string = "";

    _permissions:PermissionModel[] = [];

    getID(){ return this._id }

    getName(){ return this._name }

    fromString(groupParameter:any){

        this._id = groupParameter["id"]

        this._name = groupParameter["name"];

        var permissionAsArray = Array.from(groupParameter["permissions"]);

        for(var index=0; index < permissionAsArray.length;index++){

            let permission:PermissionModel = new PermissionModel();

            permission.fromString(permissionAsArray[index]);

            this._permissions.push(permission);

        }
    }
}