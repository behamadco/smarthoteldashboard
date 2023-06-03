import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AppSetting } from "../configuration/config";
import { Room } from "../models/Room";
import { IRoom } from "../interfaces/room.interface";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
    private url = AppSetting.serverUrl;
    private _token: any;
    private _uuid: any;
    private headers:any;

    constructor(private http: HttpClient){
        this._token = localStorage.getItem("authToken");
        this._uuid = localStorage.getItem("useruuid");
        this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Token " + this._token,
        });
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

    deleteRoom(room:IRoom):Observable<any>{
        var path = "/api/room/deleteRoom";
        var body = {
            "roomid":room.id,
            "useruuid":this._uuid
        };
        return this.http.post<any>(this.url+path, body, {headers:this.headers});
    }

    getAllRooms():Observable<any>{
        var path = "/api/room/getAllRooms";
        return this.http.post<any>(this.url+path,{headers:this.headers});
    }

    getRoom(rooomId:number):Observable<any>{
        var path = "/api/room/getRoom";
        var body = {
            "roomid":rooomId
        };
        return this.http.post<any>(this.url+path,{headers: this.headers})
    }
}
