import { Component, OnInit } from '@angular/core';
// import * as ApexCharts from 'apexcharts';

import { RoomService } from '../services/room.service';
import { RoomModel } from '../models/room.mode';
import { ResidenceService } from '../services/residence.service';
import { ResidenceModel } from '../models/residence.model';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';

declare var ApexCharts:any;

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

  language:any = "";
  
  messages:any = "";

  toastsTitle:any = "";


  constructor(private roomService: RoomService, private residenceService: ResidenceService, private _toastr:ToastrService,private translate: TranslateService) {

    this.translate.get("dashboard").subscribe((billDetailTranslate:any)=>{
      this.language = billDetailTranslate;

      this.statuses = {

        "NORMAL":this.language["normal"],
        
        "REPORT": this.language["report"]
      
      };

      this.residenceStatus = {
      
        "CHECKOUT":this.language["check-out"],
      
        "CHECKIN":this.language["check-in"]
      
      };


    });

    this.translate.get("messages").subscribe((messagesTranslate:any)=>{
      this.messages = messagesTranslate;
    });

    this.translate.get("toast").subscribe((toastTranslate:any)=>{
      this.toastsTitle = toastTranslate;
    });

  }


  radialChart() {

    var radialChart = document.querySelector("#radialChart") as HTMLElement || null;

    var radialChartCheckout = document.querySelector("#radialChartCheckout") as HTMLElement || null;
   
    var radialChartCheckIn = document.querySelector("#radialChartCheckin") as HTMLElement || null;
    
    var options = {
      series: [this.round((this.availableRooms.length/this.allRooms.length)*100)],
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
      labels: [this.language["available-room"]],
    };

    var checkinOptions = {
      series: [this.round((this.checkInResidencies.length/this.allResidencies.length)*100)],
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
      labels: [this.language["check-in"]],
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
      labels: [this.language["check-out"]],
    };
    var chart = new ApexCharts(radialChart, options);

    var checkinChart = new ApexCharts(radialChartCheckIn, checkinOptions);

    var checkoutChart = new ApexCharts(radialChartCheckout, checkoutOptions);

    chart.render();

    // checkinChart.render();

    // checkoutChart.render();
  }

  ngOnInit(): void {

    this.translate.use('fa');

    this.fetchRooms().then(()=>{
      
      this.fetchResidencies().then(()=>{

      });
    
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

      else{

        this._toastr.show(this.messages["fetch-residence-error"],this.toastsTitle["error"],AppSetting.toastOptions);

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
