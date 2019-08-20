import {User} from "../core/models/user.model";

export class sessionObject {
  public token: string;
  public user: User;
  public currency:string;
}