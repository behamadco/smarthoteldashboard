import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppSetting } from '../configuration/config';
import { IReader } from '../interfaces/reader.interface';
import { ICard } from '../interfaces/card.interface';
import { IRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

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

    createReader(roomNumber:number, macAddress:string, card:ICard, supportCard:ICard):Observable<any>{
      var path = "/api/reader/createReader";
      var body = {
        "roomnumber":roomNumber,
        "macaddress":macAddress,
        "cardid":card.id,
        "supportcardid":supportCard.id,
        "useruuid":this._uuid
      };
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    deleteReader(reader:IReader):Observable<any>{
      var path = "/api/reader/deleteReader";
      var body = {
        "readerid":reader.id
      };
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    getReaderByRoom(room:IRoom):Observable<any>{
      var path = "/api/reader/getReaderByRoom";
      var body = {
        "roomid":room.id
      }
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    getReaderByID(readerId:number):Observable<any>{
      var path = "/api/reader/getReaderById";
      var body = {
        "readerid":readerId
      };
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    createMasterReader(macAddress:string):Observable<any>{
      var path = "/api/reader/createMacAddress";
      var body = {
        "macaddress":macAddress,
        "useruuid":this._uuid
      }
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    getAllMasterReaders():Observable<any>{
      var path = "/api/reader/getAllReaders";
      return this.http.post(this.url+path,{headers:this.headers});
    }

    getMasterReader(macAddress:string):Observable<any>{
      var path = "/api/reader/getMasterReader";
      var body = {
        "macaddress":macAddress
      }
      return this.http.post(this.url+path,body,{headers:this.headers});
    }

    
}
