import { Component } from '@angular/core';
import { BillingService } from '../services/billing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillingModel } from '../models/billing.model';
import { AppSetting } from '../configuration/config';
import * as persianTools from "@persian-tools/persian-tools";
import { FactureModel } from '../models/facture.model';
import { TranslateService } from '@ngx-translate/core';
import { FactureService } from '../services/facture.service';


@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css']
})
export class BillDetailComponent {

  bill:BillingModel = new BillingModel();

  factures:FactureModel[] = [];

  paidFactures:FactureModel[] = [];

  unpaidFactures:FactureModel[] = [];

  paidCost:number=0;

  unpaidCost:number=0;

  paymentStatus:any = {
    "PAID":"پرداخت شده",
    "UNPAID":"پرداخت نشده"
  };

  facturePayment:any = {
    "p": "پرداخت شده",
    "u": "پرداخت نشده"
  }

  currentEditableFacture!:FactureModel;

  language:any = "";
  
  messages:any = "";

  toastsTitle:any = "";


  constructor(private _toastr:ToastrService, private route:ActivatedRoute, private router: Router, private _billingService: BillingService, private _factureService:FactureService,private translate: TranslateService){

    this.translate.setDefaultLang('fa');
  }

  ngOnInit(){

    this.translate.get("bill-detail").subscribe((billDetailTranslate:any)=>{
      this.language = billDetailTranslate;
    });

    this.translate.get("messages").subscribe((messagesTranslate:any)=>{
      this.messages = messagesTranslate;
    });

    this.translate.get("toast").subscribe((toastTranslate:any)=>{
      this.toastsTitle = toastTranslate;
    });

    let billCode:any = this.route.snapshot.paramMap.get("code");

    this.fetchBill(billCode);

  }

  fetchBill(billCode:any){
    this._billingService.getBillByCode(billCode).subscribe(getBill=>{

      var status = getBill["status"];

      if(!status){

        this._toastr.error(this.messages["bills-not-fetch"],this.toastsTitle["error"],AppSetting.toastOptions);

      }

      else{

        var data = getBill["data"];

        this.bill.fromString(data);

        this.updateCosts();

      }

    });
  }

  updateCosts(){

    this.paidCost = 0;

    this.unpaidCost = 0;

    this.unpaidFactures = [];

    this.paidFactures = [];

    for(var index=0;index<this.bill.getFactures().length;index++){
      var facture:FactureModel = this.bill.getFactures()[index];

      facture.getStatus() == "u" ? this.unpaidFactures.push(facture) : this.paidFactures.push(facture);
      
    }

    for(var index=0;index<this.unpaidFactures.length;index++){

      this.unpaidCost += this.unpaidFactures[index].getCost();

    }

    for(var index=0;index<this.paidFactures.length;index++){

      this.paidCost += this.paidFactures[index].getCost();

    }
  }

  addFacture(){

    var factureTitle = document.getElementById("factureTitle") as HTMLInputElement || null;

    var factureCost = document.getElementById("factureCost") as HTMLInputElement || null;

    var factureDescription = document.getElementById("factureDescription") as HTMLInputElement || null;

    this._factureService.createFacture(factureTitle.value, factureCost.value, factureDescription.value, this.bill.getTraveler(), this.bill).subscribe(createFacture=>{

      var status = createFacture["status"];

      if(!status){

        this._toastr.error(this.messages["submit-error"],this.toastsTitle["error"],AppSetting.toastOptions);

      }

      else{
        
        this._toastr.success(this.messages["submit-success"],this.toastsTitle["success"],AppSetting.toastOptions);
        
        location.reload();

      }
    });
  }

  changeFactureStatus(newStatus:any){
    this._factureService.modifyFactureStatus(this.currentEditableFacture, newStatus).subscribe(modifyFactureStatus=>{
      
      var status = modifyFactureStatus["status"];

      if(!status){

        this._toastr.error(this.messages["change-facture-status-error"], this.toastsTitle["error"], AppSetting.toastOptions);

      }


      else{

        this._toastr.success(this.messages["change-facture-status-success"],this.toastsTitle["success"],AppSetting.toastOptions);

        this.currentEditableFacture.updateStatus(newStatus=="unpaid" ? "u" : "p");

        this.updateCosts();

      }

    });
  }

  updateCurrentEditableFacture(newEditableFacture:FactureModel){

    var paidPill:HTMLElement = document.getElementById("paidPill")!;

    var unPaidPill:HTMLElement = document.getElementById("unpaidPill")!;
  

    this.currentEditableFacture = newEditableFacture;

    if(this.currentEditableFacture.getStatus()=="u"){

      paidPill.classList.remove("active");

      unPaidPill.classList.add("active");

    }else{

      unPaidPill.classList.remove("active");

      paidPill.classList.add("active");

    }

  }


  toPersianCalendar(timestamp:any){

    var gDate = new Date(timestamp);

    var jDate = gDate.toLocaleDateString("fa-Ir");

    return persianTools.digitsEnToFa(jDate);
    
  }

  toCurrencyFormat(currency:number){
    return currency.toLocaleString("fa-ir", {
      style: "currency",
      currencyDisplay: "name",
      currency: "IRR",
      minimumFractionDigits: 0,
    });
  }

}
