import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { Observable } from 'rxjs';
import { GroupModel } from '../models/group.model';
import { PermissionModel } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

    private url = AppSetting.serverUrl;

    private _token: any = localStorage.getItem("authToken");

    private _uuid: any = localStorage.getItem("useruuid");

    private headers:any;

    constructor(private http: HttpClient){
      
      this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    
    }

    createGroup(name:string, permissions:string[]):Observable<any>{

      var path = "/api/employee/createGroup";

      var body = {

        "name":name,
        
        "permissions":permissions,
        
        "useruuid": this._uuid

      };

      return this.http.post<any>(this.url+path, body, {headers: this.headers});

    }

    modifyGroupName(group:GroupModel, newName:String):Observable<any>{

      var path = "/api/employee/modifyGroupName";

      var body = {

        "name": group.getName(),

        "newname": newName,

        "useruuid": this._uuid

      }

      return this.http.post<any>(this.url+path, body, {headers: this.headers})

    }

    deleteGroup(group:GroupModel):Observable<any>{

      var path = "/api/employee/deleteGroup";

      var body = {

        "name": group.getName(),

        "useruuid": this._uuid

      }

      return this.http.post<any>(this.url+path, body, {headers: this.headers})

    }

    addPermissionToGroup(permission:PermissionModel, group:GroupModel):Observable<any>{

      var path = "/api/employee/addPermissionToGroup";

      var body = {

        "codename": permission.getCodeName(),

        "groupname": group.getName(),

        "useruuid": this._uuid

      }

      return this.http.post<any>(this.url+path, body, {headers: this.headers})

    }

    getAllGroups():Observable<any>{

      var path = "/api/employee/getAllGroup";

      var body  = {

        "useruuid": this._uuid

      };

      return this.http.post<any>(this.url+path, body, {headers: this.headers})

    }

    getGroupByName(group:GroupModel):Observable<any>{

      var path = "/api/employee/getGroupByName";

      var body = {

        "grouname": group.getName(),

        "useruuid": this._uuid

      }

      return this.http.post<any>(this.url+path, body, {headers: this.headers})

    }
}

