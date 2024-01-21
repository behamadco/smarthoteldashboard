import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ISmartUser } from '../interfaces/smartuser.interface';
import { SmartUserModel } from '../models/smartuser.model';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username : string="";
  password : string="";

  language:any = "";


  constructor(private _authService: AuthService, private toastr: ToastrService, private http: HttpClient){
  }

  ngOnInit(){

    this.http.get("../../assets/locale/fa-ir.json").subscribe(res=>{
      this.language = res;
    });

    console.log(this.language.auth);

    var token = localStorage.getItem("authToken");
    var uuid = localStorage.getItem("useruuid");

    if(token!=null && uuid!=null){
      document.location.href = "/dashboard";
    }
  }
  
  loginToDashboard(){
    this._authService.login(this.username,this.password).subscribe(data=>{
      var status = data["status"];
      if(status){
        var userData = data['data'];
        var user:SmartUserModel = new SmartUserModel();
        user.fromString(userData);
        localStorage.setItem("authToken",user.getToken());
        localStorage.setItem("useruuid",user.getUUID());
        document.location.href = "/dashboard";
      }else{
        this.toastr.error(this.language.messages["incorrect-username-password"], this.language.toast["error"],AppSetting.toastOptions)
      }
    });
  }
}
