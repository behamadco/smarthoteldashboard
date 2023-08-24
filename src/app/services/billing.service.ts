import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppSetting } from '../configuration/config';
import { IRoom } from '../interfaces/room.interface';
import { ITraveler } from '../interfaces/traveler.interface';
import { IBill } from '../interfaces/billing.interface';
import { IFacture } from '../interfaces/facture.interface';
import { RoomModel } from '../models/room.mode';
import { BillingModel } from '../models/billing.model';
import { TravelerModel } from '../models/traveler.model';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  private url = AppSetting.serverUrl;
    private _token: any = localStorage.getItem("authToken");
    private _uuid: any = localStorage.getItem("useruuid");
    private headers:any;

    constructor(private http: HttpClient){
      this.headers = new HttpHeaders().append('Content-Type','application/json').append('Authorization','Token '+this._token)
    }


    createBillForRoom(room:RoomModel, traveler:ITraveler):Observable<any>{
      var path = "/api/billing/createBillForRoom";
      var body = {
        "roomid":room.getID(),
        "travelerid":traveler.id,
        "uuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }


    addFactureToBill(bill:BillingModel, facture:IFacture):Observable<any>{
      var path = "/api/billing/addFactureToBill";
      var body = {
        "billid":bill.getID(),
        "factureid":facture.id,
        "useruuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    changeBillStatus(bill:BillingModel, status:string):Observable<any>{
      var path = "/api/billing/changeBillStatus";
      var body = {
        "billid":bill.getID(),
        "newstatus":status,
        "useruuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getBill(billId:number):Observable<any>{
      var path = "/api/billing/getBill";
      var body = {
        "billid":billId
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getBiilsByTraveler(traveler:TravelerModel):Observable<any>{
      var path = "/api/billing/getBillsByTraveler";
      var body = {
        "travelerid":traveler.getID()
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getAllBills():Observable<any>{
      var path = "/api/billing/getAllBills";
      return this.http.post<any>(this.url+path,{},{headers:this.headers});
    }
}
