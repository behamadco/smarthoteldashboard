import { Component } from '@angular/core';
import { IRoom } from '../interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { RoomModel } from '../models/room.mode';
import { GalleryService } from '../services/gallery.service';
import { RoomPhotoModel } from '../models/gallery.models';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {

  room:RoomModel = new RoomModel();
  roomPhotos:RoomPhotoModel[] = [];
  loaded:boolean = false;


  reservationStatus:string="";
  // rservationStatus:string = this.room.reservation ? "در دسترس" : "رزرو شده";



  constructor(private route:ActivatedRoute, private router: Router, private _roomService: RoomService, private _gallery:GalleryService,private toastr:ToastrService){};

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
}
