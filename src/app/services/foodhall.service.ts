import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';
import { Observable } from 'rxjs';
import { IFoodHall } from '../interfaces/foodhall.interface';
import { IFood } from '../interfaces/food.interface';

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
        "type":type,
        "useruuid":this._uuid
      }
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    deleteFoodHall(foodHall:IFoodHall):Observable<any>{
      var path = "/api/food/deleteFoodHall";
      var body = {"foodhallid":foodHall.id,"useruuid":this._uuid};
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    getAllFoodHalls():Observable<any>{
      var path = "/api/food/getAllFoodHalls";
      return this.http.post(this.url+path,{headers:this.headers})
    }

    getFoodHall(foodHallId:number):Observable<any>{
      var path = "/api/food/getFoodHall";
      var body = {
        "foodhallid":foodHallId
      }
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    createFood(name:string, cost:number, description:string, foodHall:IFoodHall):Observable<any>{
      var path ="/api/food/createFood";
      var body = {
        "name":name,
        "cost":cost,
        "description":description,
        "foodHallId":foodHall.id,
        "useruuid":this._uuid
      };
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    deleteFood(food:IFood, foodHall:IFoodHall):Observable<any>{
      var path = "/api/food/deleteFood";
      var body = {
        "foodid":food.id,
        "foodhallid":foodHall.id,
        "useruuid":this._uuid
      }
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    getFood(foodId:number):Observable<any>{
      var path = "/api/food/getFood";
      var body = {
        "foodid":foodId
      }
      return this.http.post(this.url+path,body,{headers:this.headers})
    }

    getAllFoods(foodHall:IFoodHall):Observable<any>{
      var path = "/api/food/getFood";
      var body = {
        "foodhallid":foodHall.id
      }
      return this.http.post(this.url+path,body,{headers:this.headers})
    }
}
