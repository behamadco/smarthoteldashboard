import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelerService } from '../services/traveler.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';

@Component({
  selector: 'app-traveler-detail',
  templateUrl: './traveler-detail.component.html',
  styleUrls: ['./traveler-detail.component.css']
})
export class TravelerDetailComponent {
  fullName!:string;
  nationalCode!:string;
  phoneNumber!:string;
  constructor(private route:ActivatedRoute, private router:Router, private _travelerService:TravelerService, private toastr:ToastrService){}

  ngOnInit(){
    let travelerId:any = this.route.snapshot.paramMap.get('id');
    this._travelerService.getTravelerByID(travelerId).subscribe(getTravelerByID=>{
      var status = getTravelerByID["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{
        this.fullName = getTravelerByID["firstName"] + " " + getTravelerByID["lastName"];
        this.nationalCode = getTravelerByID["nationalCode"]
      }
    });
  }
}
