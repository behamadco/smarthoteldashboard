import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ISmartUser } from '../interfaces/smartuser.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private _authService: AuthService){}
  
  loginToDashboard(){
    this._authService.login("admin","bech107017").subscribe(data=>{
      var status = data["status"];
      var userData = data['data'];
    });
  }
}
