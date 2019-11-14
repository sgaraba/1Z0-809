import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProject } from 'app/shared/model/project.model';

export interface IVolunteerRequest {
  id?: number;
  registrationDate?: Moment;
  user?: IUser;
  project?: IProject;
}

export class VolunteerRequest implements IVolunteerRequest {
  constructor(public id?: number, public registrationDate?: Moment, public user?: IUser, public project?: IProject) {}
}
