import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export interface IOngRequest {
  id?: number;
  name?: string;
  idno?: string;
  registrationDate?: Moment;
  user?: IUser;
}

export class OngRequest implements IOngRequest {
  constructor(public id?: number, public name?: string, public idno?: string, public registrationDate?: Moment, public user?: IUser) {}
}
