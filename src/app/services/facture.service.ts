import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomModel } from '../models/room.mode';
import { TravelerModel } from '../models/traveler.model';
import { Observable } from 'rxjs';
import { FactureModel } from '../models/facture.model';
import { ItemModel } from '../models/item.model';
import { BillingModel } from '../models/billing.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private url = AppSetting.serverUrl;
    private _token: any = localStorage.getItem("authToken");
    private _uuid: any = localStorage.getItem("useruuid");
    private headers:any;

    constructor(private http: HttpClient){
      this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    }

    createFacture(title:string, cost:any, description:string, traveler:TravelerModel, bill:BillingModel):Observable<any>{

      var path = "/api/facture/createFacture";

      var body = {
        "title": title,
        "cost": cost,
        "description":description,
        "travelerid": traveler.getID(),
        "billcode": bill.getCode(),
        "useruuid": this._uuid
      }

      return this.http.post<any>(this.url+path, body, {headers:this.headers});
    }

    deleteFactur(facture:FactureModel):Observable<any>{

      var path = "/api/facture/deleteFacture";

      var body = {
        "facturenumber": facture.getNumber(),
        "useruuid": this._uuid
      };

      return this.http.post<any>(this.url+path, body, {headers:this.headers});
    }

    modifyFactureStatus(facture:FactureModel, status:string){

      var path = "/api/facture/modifyFactureStatus";

      var body = {
        "facturenumber": facture.getNumber(),
        "status": status,
        "useruuid": this._uuid
      }

      return this.http.post<any>(this.url+path, body, {headers:this.headers});

    }

    getFacturesByTraveler(traveler:TravelerModel):Observable<any>{

      var path = "/api/facture/getFacturesByTraveler";

      var body = {
        "travelerid": traveler.getID()
      }

      return this.http.post<any>(this.url+path, body, {headers:this.headers});
    }

    getFacturesBetweenDates(traveler:TravelerModel, startDateAndTime:string, endDateAndTime:string):Observable<any>{

      var path = "/api/facture/getFacturesBetweenDates";

      var body = {
        "travelerid":traveler.getID(),
        "startdateandtime":startDateAndTime,
        "enddateandtime":endDateAndTime
      };

      return this.http.post<any>(this.url+path, body, {headers:this.headers});

    }



    addItemToFacture(item:ItemModel, facture:FactureModel):Observable<any>{

      var path = "/api/facture/addItemToFacture";

      var body = {
        "itemid": item.getID(),
        "facturenumber": facture.getNumber(),
        "useruuid": this._uuid
      }

      return this.http.post<any>(this.url+path, body, {headers:this.headers});
    
    }

    removeItemFromFacture(item:ItemModel, facture:FactureModel):Observable<any>{

      var path = "/api/facture/removeItemFromFacture";

      var path = "/api/facture/addItemToFacture";

      var body = {
        "itemid": item.getID(),
        "facturenumber": facture.getNumber(),
        "useruuid": this._uuid
      }

      return this.http.post<any>(this.url+path, body, {headers:this.headers});
    
    }

}
