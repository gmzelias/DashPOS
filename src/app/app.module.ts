import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {Routing} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {apiServices} from "./services/api.service";
import {storageService} from "./services/storage";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {environment} from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { MenuComponent } from './menu/menu.component';
import { FinancesComponent } from './finances/finances.component';
import { DashtxComponent } from './dashtx/dashtx.component';
import { NoSanitizePipe } from '../app/sanitize.pipe';

//import { apiServices } from './services/services';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LandingComponent,
    MenuComponent,
    DashtxComponent,
    FinancesComponent,
    NoSanitizePipe
   
  ],
  entryComponents: [LoginComponent],
  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Routing,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    /**/
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [apiServices,storageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
