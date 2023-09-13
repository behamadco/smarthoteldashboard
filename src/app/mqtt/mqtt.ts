import { IMqttServiceOptions, MqttService, IMqttMessage,  } from "ngx-mqtt";
import { IClientSubscribeOptions } from 'mqtt-browser';
import { Subscription } from 'rxjs';
import { AppSetting } from "../configuration/config";

export class BehamadSmartHotelMQTT{
    _client:MqttService | undefined;

    _hostname:any = AppSetting.mqttBroker;
    _port:any = AppSetting.mqttPort;
    _path:any = AppSetting.mqttPath;

    _retain:boolean = true;
    _connectionTimeout = 4000;
    _reconnectTimeout = 4000;

    _clientId:string = "smarthotel";
    _username:string = "";
    _password:string = "";
    _protocol:string = "ws";
    _qos:any = 0;

    _isConnected:boolean = false;

    setClient(client:MqttService){
        this._client = client;
    }

    setRetain(retain:boolean){
        this._retain = retain;
    }

    setUsername(username:string){
        this._username = username;
    }
    
    setPassword(password:string){
        this._password = password;
    }

    setProtocol(protocol:string){
        this._protocol = protocol;
    }

    getConnectionStatus(){
        return this._isConnected;
    }

    getQOS(){
        return this._qos;
    }
    
    getConnectionParameters(){
        var connection = {
            hostname: this._hostname,
            port: this._port,
            path: this._path,

            clean: this._retain, 
            connectTimeout: this._connectionTimeout,
            reconnectPeriod: this._reconnectTimeout,

            clientId: this._clientId,
            username: this._username,
            password: this._password,
            protocol: this._protocol,
        }

        return connection;
    }

    connect(){

        console.log("MQTT Connecting");

        try{
            console.log(this.getConnectionParameters());
            this._client?.connect(this.getConnectionParameters() as IMqttServiceOptions);
        }catch(error){
            console.log("MQTT Connection Error: ", error);
        }

        this._client?.onConnect.subscribe(()=>{
            this._isConnected = true;
            console.log("MQTT Connection Success!");
        });

        this._client?.onError.subscribe((error:any)=>{
            console.log("MQTT Conenction Error: ", error);
        });
    }

    doSubscribe(topic:string, qos:any) {
        this._client?.observe(topic, { qos } as IClientSubscribeOptions).subscribe((message: IMqttMessage) => {
          console.log("MQTT Connection Subscribe: ", message.payload.toString());
       });
    }
}