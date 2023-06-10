import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  allRooms:RoomModel[]=[];
  lodgingRooms:RoomModel[] = [];
  availableRooms: RoomModel[] = [];
  reservedRooms: RoomModel[] = [];

  constructor(private roomService:RoomService){}
  ngOnInit():void{
    this.roomService.getAllRooms().subscribe(getRoomData=>{
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

        console.log(this.availableRooms, this.lodgingRooms, this.reservedRooms);
      }
    });
    // var radialChart = function(){
    //   var options = {
    //     series: [0],
    //     chart: {
    //     height: 150,
    //     type: 'radialBar',
    //     sparkline:{
    //       enabled:true
    //     }
    //   },
    //   plotOptions: {
    //     radialBar: {
    //     hollow: {
    //       size: '35%',
    //     },
    //     dataLabels: {
    //             show: false,
    //     }
    //     },
    //   },
    //   labels: [''],
    //   };
    //   var chart = new ApexCharts(document.querySelector("#radialChart"), options);
    //   chart.render();
    // }
    // radialChart();
  }
}
