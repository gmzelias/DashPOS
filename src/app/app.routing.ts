import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MenuComponent} from "./menu/menu.component";
import {SignupComponent} from "./signup/signup.component";
import {LandingComponent} from "./landing/landing.component";
import {FinancesComponent} from "./finances/finances.component";
import {DashtxComponent} from "./dashtx/dashtx.component";
import {AuthorizatedGuard} from "./core/guards/authorizated.guard";

const appRoutes: Routes = [
 // { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'menu', component: MenuComponent, canActivate: [ AuthorizatedGuard ]  },
  { path: 'finances', component: FinancesComponent },
  { path: 'dashtx', component: DashtxComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'} // keep an eye to redirect
];

export const Routing = RouterModule.forRoot(appRoutes);
