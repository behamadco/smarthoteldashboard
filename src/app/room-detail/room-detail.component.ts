import { Component } from '@angular/core';
import { IRoom } from '../interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { RoomModel } from '../models/room.mode';
import { GalleryService } from '../services/gallery.service';
import { RoomPhotoModel } from '../models/gallery.models';
import { ResidenceModel } from '../models/residence.model';
import { ResidenceService } from '../services/residence.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {

  statuses:any = {
    "NORMAL":"عادی",
    "REPORT":"گزارش شده"
  };

  residenceStatus:any = {
    "CHECKOUT":"تسویه",
    "CHECKIN":"تحویل"
  };

  month:any = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];


  room:RoomModel = new RoomModel();
  roomPhotos:RoomPhotoModel[] = [];
  residences:ResidenceModel[] = [];
  loaded:boolean = false;


  reservationStatus:string="";
  // rservationStatus:string = this.room.reservation ? "در دسترس" : "رزرو شده";



  constructor(private route:ActivatedRoute, private router: Router, private _roomService: RoomService, private _gallery:GalleryService,private toastr:ToastrService, private _residenceService:ResidenceService){};

  ngOnInit(){
    let roomId:any = this.route.snapshot.paramMap.get("id");

    this.fetchRoom(roomId);
  }

  fetchRoom(roomId:any){
    this._roomService.getRoom(roomId).subscribe(getRoom=>{
      console.log("FetchRoom", getRoom);
      var status = getRoom["status"];
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
      }else{
        var data = getRoom["data"];
        this.room.fromString(data);
        this.fetchRoomPhotos();
        this.fetchResidences();
        this.loaded = true;
      }

      this.reservationStatus = this.room.getReservation() ? "رزرو شده" : "در دسترس";

    });
  }


  fetchRoomPhotos(){
    this._gallery.getRoomPhotos(this.room).subscribe(getRoomPhotos=>{
      var status = getRoomPhotos["status"];
      console.log("FetchRoomPhoto", getRoomPhotos)
      if(!status){
        this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاض فرمایید(Room Photos)","خطا",AppSetting.toastOptions)
      }else{
          var roomPhotoData = getRoomPhotos["data"];
          for(var index=0;index<roomPhotoData.length;index++){
            var roomPhotoInstance = new RoomPhotoModel();
            roomPhotoInstance.fromString(roomPhotoData[index]);
            this.roomPhotos.push(roomPhotoInstance)
          }
          var currentRoomDiv = document.getElementById("roomDiv");
          if(currentRoomDiv) currentRoomDiv.style.background = "url(" + this.roomPhotos[0].getAddress() + " )";
              }
    });
  }

  fetchResidences = async() => {
    this._residenceService.getResidenciesByRoom(this.room).subscribe(getResidenceByTraveler=>{
      console.log(getResidenceByTraveler);
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
}
