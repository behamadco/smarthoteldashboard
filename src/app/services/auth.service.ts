import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = AppSetting.serverUrl;
  private _headers:any;

  constructor(private http:HttpClient) {
    this._headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  login(username:string, password:string):Observable<any>{
    var path = "/api/auth/login";
    var body = {
      "username":username,
      "password":password
    }
    return this.http.post(this.url+path,body,{headers:this._headers});
  }
}
