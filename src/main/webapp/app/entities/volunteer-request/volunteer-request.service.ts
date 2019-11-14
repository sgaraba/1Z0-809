import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVolunteerRequest } from 'app/shared/model/volunteer-request.model';

type EntityResponseType = HttpResponse<IVolunteerRequest>;
type EntityArrayResponseType = HttpResponse<IVolunteerRequest[]>;

@Injectable({ providedIn: 'root' })
export class VolunteerRequestService {
  public resourceUrl = SERVER_API_URL + 'api/volunteer-requests';

  constructor(protected http: HttpClient) {}

  create(volunteerRequest: IVolunteerRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(volunteerRequest);
    return this.http
      .post<IVolunteerRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(volunteerRequest: IVolunteerRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(volunteerRequest);
    return this.http
      .put<IVolunteerRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVolunteerRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVolunteerRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(volunteerRequest: IVolunteerRequest): IVolunteerRequest {
    const copy: IVolunteerRequest = Object.assign({}, volunteerRequest, {
      registrationDate:
        volunteerRequest.registrationDate != null && volunteerRequest.registrationDate.isValid()
          ? volunteerRequest.registrationDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.registrationDate = res.body.registrationDate != null ? moment(res.body.registrationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((volunteerRequest: IVolunteerRequest) => {
        volunteerRequest.registrationDate = volunteerRequest.registrationDate != null ? moment(volunteerRequest.registrationDate) : null;
      });
    }
    return res;
  }
}
