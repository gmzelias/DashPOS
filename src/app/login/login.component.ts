import {Component, OnInit} from "@angular/core";
import {Validators, FormGroup, FormBuilder} from "@angular/forms";
import {apiServices} from "../services/api.service";
import {loginObject} from "../services/loginObject";
import {sessionObject} from "../services/sessionObject";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {storageService} from "../services/storage";
import {Router} from "@angular/router";
@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public hide: Boolean = false;
  public error: {code: number, message: string} = null;
  public loading: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
              private services: apiServices,
              private storageService: storageService,
              private router: Router)
                {
                  dialogRef.disableClose = true;
              }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required,Validators.email]],
      Password: ['', Validators.required],
    })
  }

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.loading = true;
      this.services.loginDash(new loginObject(this.loginForm.value)).subscribe(
        data => {
          this.loading = false;
          this.correctLogin(data);
        },
        error => {
          console.log('Error');
          this.error = error.error;
          if (this.error.code === undefined || this.error.code === 1062){
            this.error = { code:0o056,message:'Unexpected Error'}
          }
          this.loading = false;
        }
      )
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  private correctLogin(data: sessionObject){
    this.storageService.setCurrentSession(data);
    this.dialogRef.close();
    this.router.navigate(['/menu']);
  }
}
