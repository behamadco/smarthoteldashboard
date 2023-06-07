import { Component } from '@angular/core';
import { IRoom } from '../interfaces/room.interface';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent {

    room:IRoom = {
      id: 1,
      number: 101,
      floor: 1,
      cost: 800000,
      type: "TYPE",
      reservation: true,
    };

    rservationStatus:string = this.room.reservation ? "در دسترس" : "رزرو شده";

    constructor(){}
    
    ngOnInit(){

    }
}
