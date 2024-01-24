import { DepartmentModel } from "./department.model";
import { SmartUserModel } from "./smartuser.model";

export class EmployeeModel{

    _id:number = 0;

    _title:string = "";

    _personalCode:string = "";

    _nationalCode:string = "";

    _user!:SmartUserModel;

    _department!:DepartmentModel;

    getID(){ return this._id }

    getTitle(){ return this._title }

    getPersonalCode(){ return this._personalCode }

    getNationalCode(){ return this._nationalCode }

    getUser(){ return this._user }

    getDepartment(){ return this._department }

    fromString(employeeParameter:any){

        this._id = employeeParameter["id"];

        this._title = employeeParameter["title"];

        this._personalCode = employeeParameter["personalcode"];

        this._nationalCode = employeeParameter["nationalcode"];

        this._user.fromString(employeeParameter["user"]);

        this._department.fromString(employeeParameter["department"]);

    }

}