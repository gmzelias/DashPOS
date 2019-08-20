import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {apiServices} from "../services/api.service";
import {sessionObject} from "../services/sessionObject";
import {storageService} from "../services/storage";

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.scss']
})

export class FinancesComponent implements OnInit {
  public currentSession: sessionObject;
  public dataSource: any[];
  public ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['Contrato', 'MontoDash', 'MontoFiat','tipoFiat', 'Status','DateCompleted','Hash'];

  constructor(public dialogRef: MatDialogRef<FinancesComponent>,
              private services: apiServices,
              private StorageService: storageService) { 
    dialogRef.disableClose = true;
    this.currentSession = this.StorageService.getCurrentSession();
    this.services.dataTable(this.currentSession).subscribe(
      data => {
        console.log('Success');
        console.log(data);
        this.ELEMENT_DATA = data;
        this.dataSource = this.ELEMENT_DATA;
      /*   this.correctSignup(data);
         this.loading = false;*/
      },
      error => {
        console.log('Error');
        console.log(error);
      /*  this.error = error.error;
        if (this.error.code === undefined || this.error.code === 1062){
          this.error = { code:0o056,message:'Unexpected Error'}
        }
        this.loading = false;*/
      }
    )

  }

  onCancelClick(): void {
    this.dialogRef.close();
  };

  ngOnInit() {
    //this.dataSource = this.ELEMENT_DATA;
  }
    
    

  }


