import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { Observable, throwError } from 'rxjs';
import { IFloor } from '../interfaces/floor.interface';
import { FloorModel } from '../models/floor.model';


@Injectable({
  providedIn: 'root'
})
export class FloorService {
    private url = AppSetting.serverUrl;
    private _token: any=localStorage.getItem("authToken");
    private _uuid: any=localStorage.getItem("useruuid");
    private headers:any=new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Token " + this._token
    });

    constructor(private http: HttpClient){
    }


    createFloor(floornumber:number):Observable<any>{
      var path = "/api/floor/createFloor";
      var body = {
        "floornumber":floornumber,
        "useruuid":this._uuid,
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    modifyFloor(floornumber:number, newNumber:number):Observable<any>{
      var path = "/api/floor/modifyFloor";
      var body = {
        "floornumber":floornumber,
        "newnumber": newNumber,
        "useruuid": this._uuid
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    deleteFloor(floorId:number):Observable<any>{
      var path = "/api/floor/deleteFloor";
      var body = {
        "floorid":floorId,
        "useruuid":this._uuid
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getAllFloors():Observable<any>{
      var path = "/api/floor/getAllFloors";
      return this.http.post<any>(this.url+path,{},{headers:this.headers});
    }

    getFloor(floor:FloorModel):Observable<any>{
      var path = "/api/floor/getFloor";
      var body = {
        "floorid":floor.getID()
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers})
    }
}
