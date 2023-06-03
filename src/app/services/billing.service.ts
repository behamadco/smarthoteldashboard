import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AppSetting } from '../configuration/config';
import { IRoom } from '../interfaces/room.interface';
import { ITraveler } from '../interfaces/traveler.interface';
import { IBill } from '../interfaces/billing.interface';
import { IFacture } from '../interfaces/facture.interface';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

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


    createBillForRoom(room:IRoom, traveler:ITraveler):Observable<any>{
      var path = "/api/billing/createBillForRoom";
      var body = {
        "roomid":room.id,
        "travelerid":traveler.id,
        "uuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }


    addFactureToBill(bill:IBill, facture:IFacture):Observable<any>{
      var path = "/api/billing/addFactureToBill";
      var body = {
        "billid":bill.id,
        "factureid":facture.id,
        "useruuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    changeBillStatus(bill:IBill, status:string):Observable<any>{
      var path = "/api/billing/changeBillStatus";
      var body = {
        "billid":bill.id,
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

    getAllBills():Observable<any>{
      var path = "/api/billing/getAllBills";
      return this.http.post<any>(this.url+path,{headers:this.headers});
    }
}
