import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppSetting } from '../configuration/config';
import { ICard } from '../interfaces/card.interface';
import { ITraveler } from '../interfaces/traveler.interface';
import { ICardCredential } from '../interfaces/cardcredential.interface';
import { CardModel } from '../models/card.model';
import { TravelerModel } from '../models/traveler.model';
import { CardCredentialModel } from '../models/cardcredential.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

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

    createCard(cardId:string):Observable<any>{
      var path = "/api/card/createCard";
      var body = {
        "cardid":cardId
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    deleteCard(card:CardModel):Observable<any>{
      var path = "/api/card/deleteCard";
      var body = {
        "cardpk":card.getID()
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getCardByID(cardId:number):Observable<any>{
      var path = "/api/card/getCardByCardId";
      var body = {
        "cardid": cardId
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getAllCards():Observable<any>{
      var path = "/api/card/getAllCards";
      return this.http.post<any>(this.url+path,{headers:this.headers});
    }

    createCardCredential(card:CardModel,traveler:TravelerModel,startDateandTime:string,endDateAndTime:string):Observable<any>{
      var path = "/api/card/createCardCredential";
      var body = {
        "cardid":card.getID(),
        "travelerid":traveler.getID(),
        "startdateandtime":startDateandTime,
        "enddateandtime":endDateAndTime,
        "useruuid":this._uuid
      }
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    deleteCardCredential(cardCredential:CardCredentialModel):Observable<any>{
      var path = "/api/card/deleteCardCredential";
      var body = {
        "credentialid":cardCredential.getID(),
        "useruuid": this._uuid
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getCardCredential(credentialId:number):Observable<any>{
      var path = "/api/card/getCredential";
      var body = {
        "credentialid":credentialId,
        "useruuid": this._uuid
      };
      return this.http.post<any>(this.url+path,body,{headers:this.headers});
    }

    getAllCardCredential():Observable<any>{
      var path = "/api/card/getAllCredential";
      return this.http.post<any>(this.url+path,{headers:this.headers});
    }
}
