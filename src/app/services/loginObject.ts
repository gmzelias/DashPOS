export class loginObject {
    public Email: string;
    public Password: string;
  
    constructor( object: any){
      this.Email = (object.Email) ? object.Email : null;
      this.Password = (object.Password) ? object.Password : null;
    }
  }
  