import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelerService } from '../services/traveler.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { TravelerModel } from '../models/traveler.model';
import { ResidenceService } from '../services/residence.service';
import { ResidenceModel } from '../models/residence.model';
import { BillingService } from '../services/billing.service';
import { BillingModel } from '../models/billing.model';
import { RoomModel } from '../models/room.mode';

@Component({
  selector: 'app-traveler-detail',
  templateUrl: './traveler-detail.component.html',
  styleUrls: ['./traveler-detail.component.css']
})
export class TravelerDetailComponent {
  statuses:any = {
    "NORMAL":"عادی",
    "REPORT":"گزارش شده"
  };

  residenceStatus:any = {
    "CHECKOUT":"تسویه",
    "CHECKIN":"تحویل"
  };

  traveler:TravelerModel = new TravelerModel();
  currentResidence:ResidenceModel = new ResidenceModel();
  residences:ResidenceModel[] = [];
  bills:BillingModel[] = [];

  currentResidenceRoom:RoomModel = new RoomModel();
  constructor(private route:ActivatedRoute, private router:Router, private _travelerService:TravelerService, private _residenceService:ResidenceService, private _billService:BillingService,private toastr:ToastrService){}

  ngOnInit(){
    let travelerId:any = this.route.snapshot.paramMap.get('id');
    this._travelerService.getTravelerByID(travelerId).subscribe(getTravelerByID=>{
      var status = getTravelerByID["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{
        this.traveler.fromString(getTravelerByID["data"]);
        this.fetchResidences();
        this.fetchBills();
        this.fetchCurrentResidence();
      }
    });
  }

  fetchCurrentResidence = async()=>{
    this._residenceService.getCurrentResidence(this.traveler).subscribe(getCurrentTraveler=>{
      var status = getCurrentTraveler["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید (Residence)","خطا",AppSetting.toastOptions);
      }else{
        this.currentResidence.fromString(getCurrentTraveler["data"]);
        this.currentResidenceRoom = this.currentResidence.getRooms()[0];
      }
    });
  }

  fetchBills = async() =>{
    this._billService.getBiilsByTraveler(this.traveler).subscribe(getBillsByTraveler=>{
      console.log(getBillsByTraveler);
      var getBillsStatus = getBillsByTraveler["status"];
      if(!getBillsStatus){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{
        var billsData:any = getBillsByTraveler["data"];
        for(var index=0;index<billsData.length;index++){
          var billInstance:BillingModel = new BillingModel();
          billInstance.fromString(billsData[index]);
          this.bills.push(billInstance);
        }
      }
    });
  }

  fetchResidences = async() => {
    this._residenceService.getResidenceByTraveler(this.traveler).subscribe(getResidenceByTraveler=>{
      var getResidencesStatus = getResidenceByTraveler["status"];
      if(!getResidencesStatus){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{
        var residencesData:any = getResidenceByTraveler["data"];
        for(var index=0;index<residencesData.length;index++){
          var resideneInstance:ResidenceModel = new ResidenceModel();
          resideneInstance.fromString(residencesData[index]);
          this.residences.push(resideneInstance);
        }    
      }
    });
  }

  getStatusDefinition(status:any){
    return this.statuses[status];
  }

  getResidenceDefinition(status:any){
    return this.residenceStatus[status];
  }

  toPersianCalendar(timestamp:any){
    var gDate = new Date(timestamp);
    var jDate = gDate.toLocaleDateString("fa-Ir");
    return jDate;
  }
}
