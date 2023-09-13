import { Component } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { BillingModel } from '../models/billing.model';
import * as persianTools from "@persian-tools/persian-tools";

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

  constructor(private _billingServce:BillingService){}

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
