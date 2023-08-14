import { Component } from '@angular/core';
import { IRoom } from '../interfaces/room.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { RoomModel } from '../models/room.mode';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {

  constructor(private route:ActivatedRoute, private router: Router, private _roomService: RoomService, private toastr:ToastrService){};

    room:RoomModel = new RoomModel();

    reservationStatus:string="";
    // rservationStatus:string = this.room.reservation ? "در دسترس" : "رزرو شده";

    ngOnInit(){
      let roomId:any = this.route.snapshot.paramMap.get("id");
      console.log(roomId);
      this._roomService.getRoom(roomId).subscribe(getRoom=>{
        console.log(getRoom);
        var status = getRoom["status"];
        if(!status){
          this.toastr.error("خطا در دریافت اطلاعات. لطفا مجدد تلاش فرمایید","خطا",AppSetting.toastOptions);
        }else{
          var data = getRoom["data"];
          this.room.fromString(data);
        }

        this.reservationStatus = this.room.getReservation() ? "رزرو شده" : "در دسترس";

      });
    }
}
