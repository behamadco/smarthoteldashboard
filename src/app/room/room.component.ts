import { Component } from '@angular/core';
import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';
import { FloorModel } from '../models/floor.model';
import { FloorService } from '../services/floor.service';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';
import { RoomTypeModel } from '../models/roomtype.model';
import { TranslateService } from '@ngx-translate/core';

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

  floors:FloorModel[] = [];
  allRoomTypes:RoomTypeModel[] = [];

  activatedRfidDevice:boolean=false;

  language:any = "";
  
  messages:any = "";

  toastsTitle:any = "";


  constructor(private _roomService: RoomService, private _floorService:FloorService, private _toastr:ToastrService, private translate: TranslateService){

    this.translate.get("room").subscribe((billDetailTranslate:any)=>{
      this.language = billDetailTranslate;
    });

    this.translate.get("messages").subscribe((messagesTranslate:any)=>{
      this.messages = messagesTranslate;
    });

    this.translate.get("toast").subscribe((toastTranslate:any)=>{
      this.toastsTitle = toastTranslate;
    });

  }

  ngOnInit(){

    this._roomService.getAllRooms().subscribe(getRoomData=>{

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

          this.fetchFloors();

          this.fetchRoomTypes();
        }

        else{

          this._toastr.show(this.messages["fetch-rooms-error"],this.toastsTitle["error"],AppSetting.toastOptions);

        }
    });
  }

  ngOnDestory(){

  }

  fetchFloors(){ 
    
    this._floorService.getAllFloors().subscribe(getAllFloors=>{
    
      var status = getAllFloors["status"];
    
      if(!status){
    
        this._toastr.error(this.messages["fetch-floors-error"],this.toastsTitle["error"],AppSetting.toastOptions);
    
      }
      
      else{
      
        for(var index=0;index<getAllFloors["data"].length;index++){
      
          var floor:FloorModel = new FloorModel();

          floor.fromString(getAllFloors["data"][index]);

          this.floors.push(floor);
      
        }
      }
    })
  }

  fetchRoomTypes(){
    this._roomService.getRoomTypes().subscribe(getRoomTypes=>{

      var status = getRoomTypes["status"];

      if(!status){

        this._toastr.error(this.messages["fetch-room-types-error"],this.toastsTitle["error"], AppSetting.toastOptions);
      
      }
      
      else{
    
        for(var index=0;index<getRoomTypes["data"].length;index++){
      
          var roomType:RoomTypeModel = new RoomTypeModel();

          roomType.fromString(getRoomTypes["data"][index]);

          this.allRoomTypes.push(roomType);
      
        }
      }
    });
  }

  addRoom(){
    
    var roomNumber = document.getElementById("roomnumber") as HTMLInputElement || null;

    var floorNumber = document.getElementById("floornumber") as HTMLSelectElement || null;

    var roomCost = document.getElementById("roomcost") as HTMLInputElement || null;

    var roomType = document.getElementById("roomtype") as HTMLSelectElement || null;

    var roomCapacity = document.getElementById("roomcapacity") as HTMLInputElement || null;

    var roomBedType = document.getElementById("roombedtype") as HTMLInputElement || null;

    var roomDescription = document.getElementById("roomdescription") as HTMLInputElement || null;
  
    this._roomService.createRoom(roomNumber.value, floorNumber.value, roomCost.value, roomType.value, roomCapacity.value, roomBedType.value, roomDescription.value).subscribe(createRoom=>{
      var status = createRoom["status"];
      var message = createRoom["message"];

      if(roomNumber.value=="" || floorNumber.value=="" || roomCost.value=="" || roomType.value=="" || roomCapacity.value=="" || roomBedType.value=="" || roomDescription.value==""){
        this._toastr.error(this.messages["fill-the-fields-error"],this.toastsTitle["error"],AppSetting.toastOptions);
      }else{
        if(!status){
          this._toastr.error(this.messages["add-room-error"],this.toastsTitle["error"],AppSetting.toastOptions);
        }else{
          this._toastr.success(this.messages["add-room-success"],this.toastsTitle["success"],AppSetting.toastOptions);
          location.reload();
        }
      }
    });
  }

  fliterList(roomStatus:string){

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
