import { AppSetting } from "../configuration/config";
import { Room } from "../models/Room";

export class RoomService{
    private url = AppSetting.serverUrl;
    private _token: any;
    private _uuid: any;

    private _allRooms = [];

    constructor(){
        this._token = localStorage.getItem("authToken");
        this._uuid = localStorage.getItem("useruuid");
    }

    createRoom(roomNumber: any,floorNumber:any,cost:any,roomTypeId:any){
        var path = "/api/room/createRoom";
        
        var httpClient = new XMLHttpRequest();

        return new Promise((resolve,reject)=>{
            httpClient.onreadystatechange = function(){
                if(this.readyState==4 && this.status==200){
                    resolve(JSON.parse(this.response));
                }
            }

            var body = {
                "roomnumber":roomNumber,
                "floornumber":floorNumber,
                "cost":cost,
                "roomtypeid":roomTypeId,
                "useruuid":this._uuid
            }

            httpClient.open("POST",this.url+path,true);
            httpClient.setRequestHeader("Content-Type","application/json");
            httpClient.setRequestHeader("Authorization","Token "+this._token);
            httpClient.send(JSON.stringify(body));
        });
    }

    deleteRoom(room:Room){
        var path = "/api/room/deleteRoom";
        
        var httpClient = new XMLHttpRequest();

        return new Promise((resolve,reject)=>{
            httpClient.onreadystatechange = function(){
                if(this.readyState==4 && this.status==200){
                    resolve(JSON.parse(this.response));
                }
            }

            var body = {
                "roomid":room.getID(),
                "useruuid":this._uuid
            }

            httpClient.open("POST",this.url+path,true);
            httpClient.setRequestHeader("Content-Type","application/json");
            httpClient.setRequestHeader("Authorization","Token "+this._token);
            httpClient.send(JSON.stringify(body));
        });
    }

    getAllRooms(){
        var path = "/api/room/getAllRooms";
        
        var httpClient = new XMLHttpRequest();

        return new Promise((resolve,reject)=>{
            httpClient.onreadystatechange = function(){
                if(this.readyState==4 && this.status==200){
                    resolve(JSON.parse(this.response));
                }
            }

            httpClient.open("POST",this.url+path,true);
            httpClient.setRequestHeader("Content-Type","application/json");
            httpClient.setRequestHeader("Authorization","Token "+this._token);
        });
    }
}