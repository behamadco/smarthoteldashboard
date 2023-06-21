import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  showAllRooms:boolean = true;
  showAvailableRoom:boolean = false;
  showReservedRooms:boolean = false;
  showLodging:boolean = false;

  allRooms:RoomModel[]=[];
  lodgingRooms:RoomModel[] = [];
  availableRooms: RoomModel[] = [];
  reservedRooms: RoomModel[] = [];

  
  constructor(private _roomService: RoomService){}

  ngOnInit(){
    this._roomService.getAllRooms().subscribe(getRoomData=>{
      var status = getRoomData["status"];
      if(status){
        var status = getRoomData["status"];
        if(status){
          var data = getRoomData["data"];
          for(var index=0;index<data.length;index++){
            var room:RoomModel = new RoomModel();
            room.fromString(data[index]);
  
            this.allRooms.push(room);
  
            if(data[index]["status"]=="AVAILABLE"){ this.availableRooms.push(room) }
            if(data[index]["status"]=="LODGING"){ this.lodgingRooms.push(room) }
            if(data[index]["status"]=="RESERVE"){ this.reservedRooms.push(room) }
          }
      }
    }
    });
  }

  fliterList(roomStatus:string){

    console.log("Filter to ", roomStatus);

    if(roomStatus=="all"){
      this.showAvailableRoom = false;
      this.showReservedRooms = false;
      this.showLodging = false;
      this.showAllRooms = true;
    }

    if(roomStatus=="available"){
      this.showAvailableRoom = true;
      this.showReservedRooms = false;
      this.showLodging = false;
      this.showAllRooms = false;
    }

    if(roomStatus=="reserved"){
      this.showAvailableRoom = false;
      this.showReservedRooms = true;
      this.showLodging = false;
      this.showAllRooms = false;
    }

    if(roomStatus=="lodging"){
      this.showAvailableRoom = false;
      this.showReservedRooms = false;
      this.showLodging = true;
      this.showAllRooms = false;
    }

  }
}
