import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @ViewChild('signUpButton') private signUpButton: ElementRef;
  @ViewChild('loginButton') private loginButton: ElementRef;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openSignUp(): void {
    const dialogRefSignup = this.dialog.open(SignupComponent/*, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    }*/
    );
    dialogRefSignup.afterClosed().subscribe(result => {
      this.signUpButton['_elementRef'].nativeElement.classList.remove('cdk-program-focused');
      console.log('The dialog was closed');
    });
  }

  openLogin(): void {
    const dialogRefLogin = this.dialog.open(LoginComponent/*, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    }*/
    );
    dialogRefLogin.afterClosed().subscribe(result => {
      this.loginButton['_elementRef'].nativeElement.classList.remove('cdk-program-focused');
      console.log('The dialog was closed');
    });
  }

}
