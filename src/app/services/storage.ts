import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {sessionObject} from "./sessionObject";
import {User} from "../core/models/user.model";
import {apiServices} from "../services/api.service";


@Injectable()
export class storageService {

  private localStorageService;
  private currentSession : sessionObject = null;

  constructor(private router: Router,
    private services: apiServices,) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: sessionObject): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): sessionObject{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <sessionObject> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): sessionObject {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): User {
    var session: sessionObject = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated = () => {
  return new Promise ((resolve,reject) => {
    let session = this.getCurrentSession();
    // validate if token is still available
    if (session.token){
    this.services.validateToken(session.token).subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        } 
      )
    }
    else{
      reject(false);
    }
  })
}

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/landing']);
  }

}