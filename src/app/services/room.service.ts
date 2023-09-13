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

    constructor(private http: HttpClient){
      this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    }

    createRoom(roomNumber: any,floorNumber:any,cost:any,roomTypeId:any, capacity:any, description:any, bedType:any):Observable<any>{
        var path = "/api/room/createRoom";
        var body = {
            "roomnumber":roomNumber,
            "floornumber":floorNumber,
            "cost":cost,
            "capacity":capacity,
            "description":description,
            "bedtype":bedType,
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

    getRoom(roomNumber:number):Observable<any>{
        var path = "/api/room/getRoom";
        var body = {
            "roomnumber":roomNumber
        };
        return this.http.post<any>(this.url+path,body,{headers: this.headers})
    }

    getRoomTypes():Observable<any>{
        var path = "/api/room/getRoomTypes";
        return this.http.post<any>(this.url+path,{},{headers: this.headers});
    }
}
