export class signInObject {
    public Name: string;
    public LastName: string;
    public Email: string;
    public Password: string;
    public DashAddress: string;
    public Country: string;
    public Currency: string;

    

    constructor( object: any){
      this.Name = (object.Name) ? object.Name : null;
      this.LastName = (object.LastName) ? object.LastName : null;
      this.Email = (object.Email) ? object.Email : null;
      this.Password = (object.Password) ? object.Password : null;
      this.DashAddress = (object.DashAddress) ? object.DashAddress : null;
      this.Country = (object.Country) ? object.Country : null;
      this.Currency = (object.Currency) ? object.Currency : null;
    }
  }
  