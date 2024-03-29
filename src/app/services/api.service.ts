import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {signInObject} from "../services/signInObject";
import {loginObject} from "../services/loginObject";
import {sessionObject} from "./sessionObject";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class apiServices {

  constructor(private http: HttpClient) {}

  loginDash(loginObj: loginObject): Observable<sessionObject> {
    return this.http.post<sessionObject>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/logUser', loginObj); 
  }

  signInDash(signInObj: signInObject): Observable<sessionObject> {
    return this.http.post<sessionObject>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/signInUser', signInObj); 
  }

  validateToken(token: string): Observable<Boolean> {
    return this.http.post<Boolean>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/validateToken', {token:token}); 
  }

  dataTable(sessionObj: sessionObject): Observable<any> {
    return this.http.post<Boolean>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/tableData', sessionObj); 
  }

  paymentProcessor(txObj: any): Observable<any> {
    return this.http.get<any>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/newDashTx',txObj); 
  }

  checkTxStatus(txValidationObj: any): Observable<any> {
    return this.http.post<any>('http://ec2-18-237-86-164.us-west-2.compute.amazonaws.com:3000/API/checkTx',txValidationObj); 
  }

  

  }
