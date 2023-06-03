import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodhallService {

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


    createFoodHall(name:string,startTime:string,endTime:string,type:string):Observable<any>{
      var path = "/api/food/createFoodHall";
      var body = {
        "name":name,
        "starttime":startTime,
        "endtime":endTime,
        "type":type
      }
      return this.http.post(this.url,body,{headers:this.headers})
    }
}
