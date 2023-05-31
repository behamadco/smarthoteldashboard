import { Injectable } from '@angular/core';
import { AppSetting } from '../configuration/config';

@Injectable()
export class AuthService{

    private _token: any;
    private _uuid: any;
    private url = AppSetting.serverUrl;

    constructor(){
        this._token = localStorage.getItem("authToken");
        this._uuid = localStorage.getItem("useruuid");
    }

    login(username:String, password:String) {
        var path = "/api/login";
        
        var httpClient = new XMLHttpRequest();

        return new Promise((resolve,reject)=>{
            httpClient.onreadystatechange = function(){
                if(this.readyState==4 && this.status==200){
                    resolve(JSON.parse(this.response));
                }
            }

            var body = {
                "username":username,
                "password":password
            }

            httpClient.open("POST",this.url+path,true);
            httpClient.setRequestHeader("Content-Type","application/json");
            httpClient.send(JSON.stringify(body));
        });
    }
}