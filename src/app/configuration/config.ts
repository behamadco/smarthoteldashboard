export class AppSetting{
    //static serverUrl = "localhost";
    static serverUrl = "http://109.122.199.172:9999";

    static mqttBroker = "109.122.199.172";
    static mqttPort = 9001;
    static mqttPath = "/ws";

    
    static toastOptions = {
        positionClass: "toast-top-right",
        timeOut: 5e3,
        closeButton: !0,
        newestOnTop: !0,
        progressBar: !0,
        tapToDismiss: !1
    }
}