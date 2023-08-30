import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TravelerModel } from '../models/traveler.model';
import { Observable } from 'rxjs';
import { ResidenceModel } from '../models/residence.model';
import { AppSetting } from '../configuration/config';
import { CompanionModel } from '../models/companion.model';
import { RoomModel } from '../models/room.mode';

@Injectable({
  providedIn: 'root'
})
export class ResidenceService {
  private url = AppSetting.serverUrl;
    private _token: any=localStorage.getItem("authToken");
    private _uuid: any=localStorage.getItem("useruuid");
    private headers:any=new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + this._token,
    });
  constructor(private http: HttpClient) { }

  createResidence(traveler:TravelerModel, startDateandTime:string, endDateAndTime:string):Observable<any>{
    var path="/api/residence/createResidence";
    var body = {
      "travelerid":traveler.getID(),
      "startDate":startDateandTime,
      "endDate":endDateAndTime,
      "useruuid":this._uuid
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  deleteResidence(residence:ResidenceModel):Observable<any>{
    var path = "/api/residence/deleteResidence";
    var body = {
      "residenceid":residence.getID(),
      "useruuid":this._uuid
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  modifyResidenceStatus(residence:ResidenceModel,newStatus:string):Observable<any>{
    var path="/api/residence/modifyResidenceStatus";
    var body = {
      "residenceid":residence.getID(),
      "status":newStatus,
      "useruuid":this._uuid
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  getAllResidences():Observable<any>{
    var path = "/api/residence/getAllResidences";
    var body = {};
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  getResidenceByTraveler(traveler:TravelerModel):Observable<any>{
    var path = "/api/residence/getResidenceByTraveler";
    var body = {
      "travelerid":traveler.getID()
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  getResidenceByCode(code:string):Observable<any>{
    var path = "/api/residence/getResidenceByCode";
    var body = {
      "residencecode":code
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  addCompanionToResidence(residence:ResidenceModel, companion:CompanionModel):Observable<any>{
    var path = "/api/residence/addCompanionToResidence";
    var body = {
      "residenceid":residence.getID(),
      "companionid":companion.getID(),
      "useruuid":this._uuid
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  addRoomToResidence(residence:ResidenceModel, room:RoomModel):Observable<any>{
    var path = "/api/residence/addRoomToResidence";
    var body = {
      "residenceid":residence.getID(),
      "roomid":room.getID(),
      "useruuid":this._uuid
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

  getCurrentResidence(traveler:TravelerModel):Observable<any>{
    var path = "/api/residence/getCurrentResidence";
    var body = {
      "travelerid":traveler.getID(),
    }
    return this.http.post<any>(this.url+path, body,{headers:this.headers});
  }

}
