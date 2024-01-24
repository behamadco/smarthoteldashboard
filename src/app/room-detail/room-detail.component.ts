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
import { TranslateService } from '@ngx-translate/core';

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

  language:any = "";
  
  messages:any = "";

  toastsTitle:any = "";



  constructor(private route:ActivatedRoute, private router: Router, private _roomService: RoomService, private _gallery:GalleryService,private toastr:ToastrService, private _residenceService:ResidenceService, private translate:TranslateService){

    this.translate.get("room-detail").subscribe((billDetailTranslate:any)=>{
      
      this.language = billDetailTranslate;

      this.statuses = {
        "NORMAL": this.language["normal"],
        "REPORT": this.language["report"]
      }

      this.residenceStatus = {
        "CHECKOUT": this.language["check-out"],
        "CHECKIN": this.language["check-in"]
      }

    });

    this.translate.get("messages").subscribe((messagesTranslate:any)=>{
      this.messages = messagesTranslate;
    });

    this.translate.get("toast").subscribe((toastTranslate:any)=>{
      this.toastsTitle = toastTranslate;
    });

  };

  ngOnInit(){
    let roomId:any = this.route.snapshot.paramMap.get("id");

    this.fetchRoom(roomId);
  }

  fetchRoom(roomId:any){

    this._roomService.getRoom(roomId).subscribe(getRoom=>{

      var status = getRoom["status"];

      if(!status){

        this.toastr.error(this.messages["fetch-rooms-error"],this.toastsTitle["error"],AppSetting.toastOptions);
      
      }
      
      else{

        var data = getRoom["data"];

        this.room.fromString(data);

        this.fetchRoomPhotos();

        this.fetchResidences();

        this.loaded = true;
      }

      this.reservationStatus = this.room.getReservation() ? this.language["reserved"] : this.language["available"];

    });
  }


  fetchRoomPhotos() {

    this._gallery.getRoomPhotos(this.room).subscribe(getRoomPhotos => {

      var status = getRoomPhotos["status"];

      if (!status) {

        this.toastr.error(this.messages["fetch-room-photo-error"], this.toastsTitle["error"], AppSetting.toastOptions)
      }

      else {
        var roomPhotoData = getRoomPhotos["data"];

        for (var index = 0; index < roomPhotoData.length; index++) {

          var roomPhotoInstance = new RoomPhotoModel();

          roomPhotoInstance.fromString(roomPhotoData[index]);

          this.roomPhotos.push(roomPhotoInstance)

        }

        var currentRoomDiv = document.getElementById("roomDiv");

        if (currentRoomDiv) currentRoomDiv.style.background = "url(" + this.roomPhotos[0].getAddress() + " )";
      }
    });
  }

  fetchResidences = async() => {

    this._residenceService.getResidenciesByRoom(this.room).subscribe(getResidenceByTraveler=>{

      var getResidencesStatus = getResidenceByTraveler["status"];
     
      if(!getResidencesStatus){
     
        this.toastr.error(this.messages["fetch-residence-error"],this.toastsTitle["error"],AppSetting.toastOptions);
     
      }
      
      else{
      
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
