import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomModel } from '../models/room.mode';
import { Observable } from 'rxjs';

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

  getRoomPhotos(room:RoomModel):Observable<any>{
    var path = "/api/gallery/getRoomPhotos";
    var body = {
      "roomid":room.getID()
    }
    return this.http.post(this.url+path, body, {headers:this.headers});
  }

  getRoomPhoto(photoId:number):Observable<any>{
    var path = "api/gallery/getRoomPhoto";
    var body = {
      "photoid":photoId
    };
    return this.http.post(this.url+path, body, {headers:this.headers});
  }
}
