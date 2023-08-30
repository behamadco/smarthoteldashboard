import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomModel } from '../models/room.mode';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private url:any = AppSetting.serverUrl;
  private _token:any = localStorage.getItem("authToken");
  private _uuid:any = localStorage.getItem("useruuid");
  private headers:any=new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Token " + this._token,
  });
  
  constructor(private http: HttpClient) {}

  createRoomPhoto(room:RoomModel, title:string, alt:string, photo:)
}
