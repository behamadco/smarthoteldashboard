import { Component } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { BillingModel } from '../models/billing.model';
import * as persianTools from "@persian-tools/persian-tools";
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AppSetting } from '../configuration/config';


@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent {
  showAllBills:boolean = true;

  showPaidBills:boolean = false;

  showUnPaidBills:boolean = false;

  allBills:BillingModel[] = [];

  paidBills:BillingModel[] = [];

  unPaidBills:BillingModel[] = [];

  paymentStatus:any = {
    "PAID":"پرداخت شده",
    "UNPAID":"پرداخت نشده"
  }

  language:any = "";
  
  messages:any = "";

  toastsTitle:any = "";

  constructor(private _billingServce:BillingService,private translate: TranslateService, private _toast:ToastrService){

    this.translate.use('fa');

    this.translate.get("financial").subscribe((billDetailTranslate:any)=>{

      this.language = billDetailTranslate;

      this.paymentStatus = {

        "PAID":this.language["paid"],

        "UNPAID":this.language["unpaid"]

      }

    });

    this.translate.get("messages").subscribe((messagesTranslate:any)=>{
      this.messages = messagesTranslate;
    });

    this.translate.get("toast").subscribe((toastTranslate:any)=>{
      this.toastsTitle = toastTranslate;
    });

  }

  ngOnInit(){
    this.fetchBills();
  }

  fetchBills(){

    this._billingServce.getAllBills().subscribe(getAllBills=>{

      var status = getAllBills["status"];

      if(status){

        var data = getAllBills["data"];

        for(var index=0;index<data.length;index++){

          var bill:BillingModel = new BillingModel();

          bill.fromString(data[index]);

          this.allBills.push(bill);

          if(data[index]["status"]=="PAID"){ this.paidBills.push(bill) }

          if(data[index]["status"]=="UNPAID"){ this.unPaidBills.push(bill) }
        }
      }

      else{

        this._toast.show(this.messages["bills-not-fetch"],this.toastsTitle["error"],AppSetting.toastOptions);

      }
    });
  }

  filterList(billStatus:string){
    if(billStatus=="all"){
      this.showAllBills = true;
      this.showPaidBills = false;
      this.showUnPaidBills = false;
    }

    if(billStatus=="paid"){
      this.showAllBills = false;
      this.showPaidBills = true;
      this.showUnPaidBills = false;
    }

    if(billStatus=="unpaid"){
      this.showAllBills = false;
      this.showPaidBills = false;
      this.showUnPaidBills = true;
    }
  }

  getPaymentStatus(payStatus:string){
    return this.paymentStatus[payStatus];
  }

  toPersianCalendar(timestamp:any){
    var gDate = new Date(timestamp);
    var jDate = gDate.toLocaleDateString("fa-Ir");
    return persianTools.digitsEnToFa(jDate);
  }
}
