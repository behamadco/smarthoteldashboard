import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AppSetting } from "../configuration/config";
import { RoomModel } from '../models/room.mode';
import { IRoom } from "../interfaces/room.interface";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
    private url = AppSetting.serverUrl;
    private _token: any=localStorage.getItem("authToken");
    private _uuid: any=localStorage.getItem("useruuid");
    private headers:any;
    // private headers:any=new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Authorization": "Token " + this._token,
    // });

    constructor(private http: HttpClient){
      this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    }

    createRoom(roomNumber: any,floorNumber:any,cost:any,roomTypeId:any):Observable<any>{
        var path = "/api/room/createRoom";
        var body = {
            "roomnumber":roomNumber,
            "floornumber":floorNumber,
            "cost":cost,
            "roomtypeid":roomTypeId,
            "useruuid":this._uuid
        };
        return this.http.post<any>(this.url+path, body,{headers:this.headers});
    }

    deleteRoom(room:RoomModel):Observable<any>{
        var path = "/api/room/deleteRoom";
        var body = {
            "roomid":room.getID(),
            "useruuid":this._uuid
        };
        return this.http.post<any>(this.url+path, body, {headers:this.headers});
    }

    getAllRooms():Observable<any>{
        var path = "/api/room/getAllRooms";
        return this.http.post<any>(this.url+path, {}, {headers:this.headers});
    }

    getRoom(rooomId:number):Observable<any>{
        var path = "/api/room/getRoom";
        var body = {
            "roomid":rooomId
        };
        return this.http.post<any>(this.url+path,body,{headers: this.headers})
    }
}
