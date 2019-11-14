import { IProject } from 'app/shared/model/project.model';

export interface IOng {
  id?: number;
  name?: string;
  description?: string;
  idno?: string;
  email?: string;
  address?: string;
  phone?: string;
  projects?: IProject[];
}

export class Ong implements IOng {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public idno?: string,
    public email?: string,
    public address?: string,
    public phone?: string,
    public projects?: IProject[]
  ) {}
}
