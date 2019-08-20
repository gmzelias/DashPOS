import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {apiServices} from "../services/api.service";
import {storageService} from "../services/storage";
import { FinancesComponent } from '../finances/finances.component';
import { DashtxComponent } from '../dashtx/dashtx.component';
import { MatDialog } from '@angular/material';
import { AuthorizatedGuard } from '../core/guards/authorizated.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('financesButton') private financesButton: ElementRef;
  @ViewChild('receiveMoneyButton') private receiveMoneyButton: ElementRef;

  constructor(
    private storageService: storageService,
    private services: apiServices,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.user = this.storageService.getCurrentUser();
  }

  openFinances(): void {
    const dialogRefFinances = this.dialog.open(FinancesComponent, {
     // width: '650px',
     // data: {name: this.name, animal: this.animal}
    }
    );
    dialogRefFinances.afterClosed().subscribe(result => {
      this.financesButton['_elementRef'].nativeElement.classList.remove('cdk-program-focused');
      console.log('The dialog was closed');
    });
  }

  openTx(): void {
    const dialogRefTx = this.dialog.open(DashtxComponent, {
     // width: '650px',
     // data: {name: this.name, animal: this.animal}
    }
    );
    dialogRefTx.afterClosed().subscribe(result => {
      this.receiveMoneyButton['_elementRef'].nativeElement.classList.remove('cdk-program-focused');
      console.log('The dialog was closed');
    });
  }

  logout(): void{
    this.storageService.logout();
  }
  

}
