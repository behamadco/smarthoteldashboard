import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';
import { ResidenceService } from '../services/residence.service';
import { ResidenceModel } from '../models/residence.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  statuses:any = {
    "NORMAL":"عادی",
    "REPORT":"گزارش شده"
  };

  residenceStatus:any = {
    "CHECKOUT":"تسویه",
    "CHECKIN":"تحویل"
  };

  month:any = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];


  allRooms: RoomModel[] = [];
  lodgingRooms: RoomModel[] = [];
  availableRooms: RoomModel[] = [];
  reservedRooms: RoomModel[] = [];

  allResidencies: ResidenceModel[] = [];
  checkInResidencies: ResidenceModel[] = [];
  checkoutResidencies: ResidenceModel[] = [];

  checkinData: any[] = [];
  checkoutData: any[] = [];

  availableInPercent: any;
  reservedInPercent: any;
  lodgingInPercent:any;


  constructor(private roomService: RoomService, private residenceService: ResidenceService) { }


  radialChart() {
    var options = {
      series: [(this.availableRooms.length/this.allRooms.length)*100],
      chart: {
        height: 150,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '35%',
          },
          dataLabels: {
            show: false,
          }
        },
      },
      labels: ['اتاق های در دسترس'],
    };

    var checkinOptions = {
      series: [(this.checkInResidencies.length/this.allResidencies.length)*100],
      chart: {
        height: 150,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '35%',
          },
          dataLabels: {
            show: false,
          }
        },
      },
      labels: ['تحویل'],
    };

    var checkoutOptions = {
      series: [(this.checkoutResidencies.length/this.allResidencies.length)*100],
      chart: {
        height: 150,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '35%',
          },
          dataLabels: {
            show: false,
          }
        },
      },
      labels: ['تسویه'],
    };
    var chart = new ApexCharts(document.querySelector("#radialChart"), options);

    var checkinChart = new ApexCharts(document.querySelector("#radialChartCheckin"), checkinOptions);

    var checkoutChart = new ApexCharts(document.querySelector("#radialChartCheckout"), checkoutOptions);

    chart.render();

    checkinChart.render();

    checkoutChart.render();
  }

  ngOnInit(): void {

    this.fetchRooms().then(()=>{
      
      this.fetchResidencies();
    
    });
  
  }

  fetchRooms = async() => {
    this.roomService.getAllRooms().subscribe(getRoomData => {
      var status = getRoomData["status"];
      if (status) {
        var data = getRoomData["data"];
        for (var index = 0; index < data.length; index++) {
          var room: RoomModel = new RoomModel();
          room.fromString(data[index]);

          this.allRooms.push(room);

          if (data[index]["status"] == "AVAILABLE") { this.availableRooms.push(room) }
          if (data[index]["status"] == "LODGING") { this.lodgingRooms.push(room) }
          if (data[index]["status"] == "RESERVE") { this.reservedRooms.push(room) }
        }

        this.availableInPercent = (this.availableRooms.length / this.allRooms.length) * 100 + "%";
        this.reservedInPercent = (this.reservedRooms.length / this.allRooms.length) * 100 + "%";
        this.lodgingInPercent = (this.lodgingRooms.length / this.allRooms.length) * 100 + "%";
      }
    });
  }

  fetchResidencies = async () => {
    this.residenceService.getAllResidences().subscribe(getResidenceData => {
      console.log(getResidenceData);
      var status = getResidenceData["status"];
      if (status) {
        var data = getResidenceData["data"];
        for (var index = 0; index < data.length; index++) {
          var residence: ResidenceModel = new ResidenceModel();
          residence.fromString(data[index]);

          this.allResidencies.push(residence);

          if (residence.getStatus() == "CHECKIN") { this.checkInResidencies.push(residence) }
          if (residence.getStatus() == "CHECKOUT") { this.checkoutResidencies.push(residence) }
        }

        this.radialChart();
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

  round(number:number){
    return Math.round(number);
  }
}
