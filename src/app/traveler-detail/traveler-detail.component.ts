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
import { GalleryService } from '../services/gallery.service';
import { RoomPhotoModel } from '../models/gallery.models';

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

  month:any = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];

  traveler:TravelerModel = new TravelerModel();
  currentResidence:ResidenceModel = new ResidenceModel();
  residences:ResidenceModel[] = [];
  bills:BillingModel[] = [];
  roomPhotos:RoomPhotoModel[] = [];
  currentTravelerStatus:string = "";
  hasCurrentResidence:boolean = false;

  currentResidenceRoom:RoomModel = new RoomModel();

  constructor(private route:ActivatedRoute, private router:Router, private _travelerService:TravelerService, private _residenceService:ResidenceService, private _billService:BillingService,private toastr:ToastrService, private _gallery:GalleryService){}

  ngOnInit(){
    let travelerId:any = this.route.snapshot.paramMap.get('id');
    this._travelerService.getTravelerByID(travelerId).subscribe(getTravelerByID=>{
      var status = getTravelerByID["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{

        this.traveler.fromString(getTravelerByID["data"]);

        var normalPill = document.getElementById("normalPill");

        var reportPill = document.getElementById("reportPill");

        this.currentTravelerStatus = this.traveler.getStatus();
        
        if(this.traveler.getStatus() == "NORMAL"){
          if(normalPill) normalPill.classList.add("active");
        }

        if(this.traveler.getStatus() == "REPORT"){
          if(reportPill) reportPill.classList.add("active");
        }
        
        this.fetchResidences();

        this.fetchBills();

        this.fetchCurrentResidence();
      }
    });
  }

  fetchRoomPhotos = async ()=>{
    this._gallery.getRoomPhotos(this.currentResidenceRoom).subscribe(getRoomPhotos=>{
      var status = getRoomPhotos["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاض فرمایید(Room Photos)","خطا",AppSetting.toastOptions)
      }else{
          var roomPhotoData = getRoomPhotos["data"];
          for(var index=0;index<roomPhotoData.length;index++){
            var roomPhotoInstance = new RoomPhotoModel();
            roomPhotoInstance.fromString(roomPhotoData[index]);
            this.roomPhotos.push(roomPhotoInstance)
          }
      }
      var currentRoomDiv = document.getElementById("currentRoomDiv");
      if(currentRoomDiv) currentRoomDiv.style.background = "url(" + this.roomPhotos[0].getAddress() + " )";
    });
  }

  fetchCurrentResidence = async()=>{
    this._residenceService.getCurrentResidence(this.traveler).subscribe(getCurrentTraveler=>{
      var status = getCurrentTraveler["status"];
      var message = getCurrentTraveler["message"];
      console.log("Data: ",getCurrentTraveler);
      if(!status){
        if(message=="No Residence"){
          this.hasCurrentResidence = false;
        }else{
          this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید (Residence)","خطا",AppSetting.toastOptions);
        }
      }else{
        this.hasCurrentResidence = true;
        this.currentResidence.fromString(getCurrentTraveler["data"]);
        this.currentResidenceRoom = this.currentResidence.getRooms()[0];
        this.fetchRoomPhotos();
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

  toEnglishDigits(str:any) {
    var e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, (t:any)=> {
        return t.charCodeAt(0) - e;
    });
    return str;
  }

  toPersianCalendar(timestamp:any){
    var gDate = new Date(timestamp);
    var jDate = gDate.toLocaleDateString("fa");
    var splited = jDate.split("/");
    
    var day = this.toEnglishDigits(splited[2]);
    var monthNumb = this.toEnglishDigits(splited[1]) - 1;
    var year = this.toEnglishDigits(splited[0]);

    return day + " " + this.month[monthNumb] + " " + year;
  }

  changeCurrentTravelerStatus(status:any){
    this.currentTravelerStatus = status;
  }

  submitTravelerStatus(){
    this._travelerService.changeTravelerStatus(this.traveler,this.currentTravelerStatus).subscribe(changeTravelerStatus=>{
      if(!changeTravelerStatus["status"]){
        this.toastr.error("خطا در اجرای دستورات. (Change Traveler Status)","خطا",AppSetting.toastOptions);
      }
      else{
        window.location.reload();
      }
    });
  }
}
