import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import { RoomService } from '../services/room.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private roomService:RoomService){}
  ngOnInit():void{
    this.roomService.getAllRooms().subscribe(data=>console.log(data));
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
