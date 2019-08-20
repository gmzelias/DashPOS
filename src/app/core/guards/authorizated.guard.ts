import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {storageService} from "../../services/storage";

@Injectable()
export class AuthorizatedGuard implements CanActivate {
  constructor(private router: Router,
              private storageService: storageService) { }

  canActivate() {
    return this.storageService.isAuthenticated().then(data=>{
      // logged in so return true
      return true;      
    }).catch((error)=>{
      // not logged in so redirect to login page
      this.router.navigate(['/landing']);
      return false;
    })
  }

}
