import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';
import { ResidenceService } from '../services/residence.service';
import { ResidenceModel } from '../models/residence.model';



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

  allResidencies : ResidenceModel[] = [];
  checkInResidencies : ResidenceModel[] = [];
  checkoutResidencies: ResidenceModel[] = [];

  availableInPercent:any;
  reservedInPercent:any;


  constructor(private roomService:RoomService, private residenceService: ResidenceService){}
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

        this.availableInPercent = (this.availableRooms.length/this.allRooms.length)*100 + "%";
        this.reservedInPercent = (this.reservedRooms.length/this.allRooms.length)*100 + "%";
      }
    });

    this.residenceService.getAllResidences().subscribe(getResidenceData=>{
      console.log(getResidenceData);
      var status = getResidenceData["status"];
      if(status){
        var data = getResidenceData["data"];
        for(var index=0;index<data.length;index++){
          var residence:ResidenceModel = new ResidenceModel();
          residence.fromString(data[index]);

          this.allResidencies.push(residence);
          
          if(residence.getStatus()=="CHECKIN"){ this.checkInResidencies.push(residence) }
          if(residence.getStatus()=="CHECKOUT"){ this.checkoutResidencies.push(residence) }

          console.log(this.checkInResidencies, this.checkoutResidencies);

        }
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
