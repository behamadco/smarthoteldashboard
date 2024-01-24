import { Component } from '@angular/core';
import { TravelerModel } from '../models/traveler.model';
import { TravelerService } from '../services/traveler.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';

@Component({
  selector: 'app-traveler-list',
  templateUrl: './traveler-list.component.html',
  styleUrls: ['./traveler-list.component.css']
})
export class TravelerListComponent {

  showAllTraveler:boolean = true;

  shwoLodgingTraveler:boolean = false;

  showReservedTraveler:boolean = false;

  showCheckoutTraveler:boolean = false;

  allTraveler:TravelerModel[] = [];

  lodgingTraveler:TravelerModel[] = [];

  reservedTraveler:TravelerModel[] = [];

  checkoutTraveler:TravelerModel[] = [];

  language:any = "";

  messages:any = "";

  toastsTitle:any = "";

  constructor(private _travelerService:TravelerService, private translate:TranslateService, private toastr:ToastrService){}

  ngOnInit(){

    this._travelerService.getAllTravelers().subscribe(getTravelersData=>{

      var status = getTravelersData["status"];

      if(!status){

        this.toastr.error(this.messages["fetch-traveler-error"], this.toastsTitle["error"], AppSetting.toastOptions);

      }
      
      else{

        var data = getTravelersData["data"];

        for(var index=0;index<data.length;index++){
  
          var traveler:TravelerModel = new TravelerModel();
  
          traveler.fromString(data[index]);
  
          this.allTraveler.push(traveler);
  
          if(data[index]["lodging"]=="LODGING"){ this.lodgingTraveler.push(traveler) }
  
          if(data[index]["lodging"]=="RESERVE"){ this.reservedTraveler.push(traveler) }
  
          if(data[index]["lodging"]=="CHECKOUT"){ this.checkoutTraveler.push(traveler) }
  
        }

      }
    });
  }

  filterList(travelerLodging:string){
    if(travelerLodging=="all"){
      this.showAllTraveler = true;
      this.shwoLodgingTraveler = false;
      this.showReservedTraveler = false;
      this.showCheckoutTraveler = false
    }


    if(travelerLodging=="LODGING"){
      this.showAllTraveler = false;
      this.shwoLodgingTraveler = true;
      this.showReservedTraveler = false;
      this.showCheckoutTraveler = false
    }

    if(travelerLodging=="RESERVE"){
      this.showAllTraveler = false;
      this.shwoLodgingTraveler = false;
      this.showReservedTraveler = true;
      this.showCheckoutTraveler = false
    }
    if(travelerLodging=="CHECKOUT"){
      this.showAllTraveler = false;
      this.shwoLodgingTraveler = false;
      this.showReservedTraveler = false;
      this.showCheckoutTraveler = true;
    }
  }
}
