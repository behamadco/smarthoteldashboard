export class DepartmentModel{

    _id:number = 0;

    _title:string = "";

    _code:string = "";

    getID(){ return this._id }

    getTitle(){ return this._title }

    getCode(){ return this._code }

    fromString(departmentParameter:any){

        this._id = departmentParameter["id"];

        this._title = departmentParameter["title"];

        this._code = departmentParameter["code"];
    }
}