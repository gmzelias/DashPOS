import { Component, OnInit, Inject} from '@angular/core';
import {Router} from "@angular/router";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Validators, FormGroup, FormBuilder, AbstractControl, FormControl} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {signInObject} from "../services/signInObject";
import {sessionObject} from "../services/sessionObject";
import {apiServices} from "../services/api.service";
import {storageService} from "../services/storage";
import CountriesJson from "../../assets/Countries.json";
import CurrenciesJson from "../../assets/Currencies.json";


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public Currencies: any[] = CurrenciesJson;
  public hide: Boolean = false;
  public Countries: any[] = CountriesJson;
  signInForm = this.formBuilder.group({
    Name: ['', Validators.required],
    LastName: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
    DashAddress: ['', [Validators.required,Validators.minLength(34),Validators.maxLength(34),this.ValidateUrl]],
    Currency: [this.Currencies[0].value, Validators.required],
    Country: [this.Countries[229].value, Validators.required],
  })
  public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
  public loading: Boolean = false;


  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    private router: Router,
    private services: apiServices,
    private StorageService: storageService,
    /*@Inject(MAT_DIALOG_DATA) public data: any*/
    private formBuilder: FormBuilder) 
    {
        dialogRef.disableClose = true;
    }


  /*getErrorMessage() {
    return this.signInForm.Email.hasError.hasError('email') ? 'Not a valid email' : '';
  }*/
  public submitSignIn(): void {
    this.submitted = true;
    this.error = null;
    if(this.signInForm.valid){
      this.loading = true;
      this.services.signInDash(new signInObject(this.signInForm.value)).subscribe(
        data => {
          console.log('Success');
           this.correctSignup(data);
           this.loading = false;
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

  private correctSignup(data: sessionObject){
    this.StorageService.setCurrentSession(data);
    this.dialogRef.close();
    this.router.navigate(['/menu']);
  }
    
  onCancelClick(): void {
    this.dialogRef.close();
  }

//Validate Dash Address
  ValidateUrl(control: AbstractControl) {
    //|| !control.value.startsWith('7') 
    if (!control.value.startsWith('X') && !control.value.startsWith('7')) {
      return { validUrl: true };
    }
    return null;
  }

ngOnInit() {

}

}
