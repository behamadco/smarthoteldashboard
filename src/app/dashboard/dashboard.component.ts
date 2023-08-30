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

  reservationChart(checkinData: any, checkoutData: any) {
    var options = {
      series: [{
        name: 'تسویه',
        data: checkoutData,
      }, {
        name: 'تحویل',
        data: checkinData
      }],
      chart: {
        height: 400,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      colors: ["#1362FC", "#FF6E5A"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 6,
        curve: 'smooth',
      },
      legend: {
        show: false
      },
      grid: {
        borderColor: '#EBEBEB',
        strokeDashArray: 6,
      },
      markers: {
        strokeWidth: 6,
        hover: {
          size: 15,
        }
      },
      yaxis: {
        labels: {
          offsetX: -12,
          style: {
            colors: '#787878',
            fontSize: '13px',
            fontFamily: 'Poppins',
            fontWeight: 400

          }
        },
      },
      xaxis: {
        categories: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12","13","14"],
        labels: {
          style: {
            colors: '#787878',
            fontSize: '13px',
            fontFamily: 'Poppins',
            fontWeight: 400

          },
        }
      },
      fill: {
        type: "solid",
        opacity: 0.1
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    };

    var chart = new ApexCharts(document.querySelector("#reservationChart"), options);
    chart.render();
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
}
