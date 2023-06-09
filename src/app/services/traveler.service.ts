import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ITraveler } from '../interfaces/traveler.interface';
import { TravelerModel } from '../models/traveler.model';

@Injectable({
  providedIn: 'root'
})
export class TravelerService {

    private url = AppSetting.serverUrl;
    private _token: any=localStorage.getItem("authToken");
    private _uuid: any=localStorage.getItem("useruuid");
    private headers:any;

    constructor(private http: HttpClient){
        this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    }

    createTraveler(firstName:string, lastName:string, phoneNumber:string, nationalCode: string):Observable<any>{
      var path = "/api/traveler/createTraveler";
      var body = {
        "firstname":firstName,
        "lastname":lastName,
        "phonenumber":phoneNumber,
        "nationalcode":nationalCode,
        "useruuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getTravelerByID(travelerId:number):Observable<any>{
      var path = "/api/traveler/getTravelerById";
      var body = {
        "travelerid":travelerId,
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getTravelerByNationalCode(travelerNationalCode:number):Observable<any>{
      var path = "/api/traveler/getTravelerByNationalCode";
      var body = {
        "nationalcode":travelerNationalCode,
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getAllTravelers():Observable<any>{
      var path = "/api/traveler/getAllTravelers";
      return this.http.post<any>(this.url+path,{},{headers:this.headers});
    }

    getAllTravelersByStatus(status:string):Observable<any>{
      var path = "/api/traveler/getAllTravelers";
      var body = {
        "status":status
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    changeTravelerStatus(traveler:TravelerModel,status:string):Observable<any>{
      var path = "/api/traveler/changeTravelerStatus";
      var body = {
        "travelerid":traveler.getID(),
        "status":status
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

}
