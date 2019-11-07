import { Component, OnInit } from '@angular/core';
import {apiServices} from "../services/api.service";
import {sessionObject} from "../services/sessionObject";
import {storageService} from "../services/storage";
import {Validators, FormGroup, FormBuilder, AbstractControl, FormControl} from "@angular/forms";
import { MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashtx',
  templateUrl: './dashtx.component.html',
  styleUrls: ['./dashtx.component.scss']
})
export class DashtxComponent implements OnInit {
  public sanitizer: DomSanitizer;
  public currentSession: sessionObject;
  public currency: string;
  public email: string;
  public submitted: Boolean = false;
  public loading: Boolean = false;
  public validPP: Boolean = false;
  public showPP: Boolean = false;
  public src: string = "";
  public error: {code: number, message: string} = null;
  txInfoForm = this.formBuilder.group({
    Invoice: ['', Validators.required],
    Amount: ['', Validators.required]
  })

  constructor(public dialogRef: MatDialogRef<DashtxComponent>,
    private services: apiServices,
    private StorageService: storageService,
    private formBuilder: FormBuilder) { 
    dialogRef.disableClose = true;
    this.currentSession = this.StorageService.getCurrentSession();
   // console.log(this.currentSession);
   /* this.services.dataTable(this.currentSession).subscribe(
    data => {
    //   this.correctSignup(data);
    //this.loading = false;
    },
    error => {
     // console.log('Error');
     // this.error = error.error;
     // if (this.error.code === undefined || this.error.code === 1062){
     // this.error = { code:0o056,message:'Unexpected Error'}
     // }
     // this.loading = false;
     // }
    )*/
}

public submitTxInfo(): void {
  this.submitted = true;
  this.error = null;
  if(this.txInfoForm.valid){
    this.loading = true;
    let txInfo = {
      establecimiento: this.currentSession.user,
      monto: this.txInfoForm.value.Amount,
      contrato: this.txInfoForm.value.Invoice,
      currency:this.currentSession.currency,
      token:this.currentSession.token
    }
    this.services.paymentProcessor(txInfo).subscribe(
      data => {
        if (data['result'] === '202'){
          this.error = {code: 202, message: "Data used"};
          this.loading = false;
        }else{
          this.src = `http://pp.dashhelpme.io/?idestablecimiento=${txInfo.establecimiento}&contrato=${txInfo.contrato}&currency=${txInfo.currency}&monto=${txInfo.monto}`
          this.validPP = true;
        }
        //this.correctSignup(data);
      },
      error => {
        //console.log(error);
        if (error.error['result'] === '401') this.error = {code: 401, message: "Token Expired"};
        else this.error = {code: 1, message: "500"}
        this.loading = false;
      /*  this.error = error.error;
        if (this.error.code === undefined || this.error.code === 1062){
          this.error = { code:0o056,message:'Unexpected Error'}
        }*/
      }
    )
      }
}


  ngOnInit() {
  }
  myLoadEvent(event){
   this.loading = false;
   let txValObj = {
    establecimiento: this.currentSession.user,
    contrato: this.txInfoForm.value.Invoice,
  }
  console.log('start checking');
   this.services.checkTxStatus(txValObj).subscribe(
    data => {
      console.log(data);
    },
    error => {
      console.log(error);
    })
  }
    
  onCancelClick(): void {
    this.dialogRef.close();
  };

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


}
