import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOngRequest } from 'app/shared/model/ong-request.model';

type EntityResponseType = HttpResponse<IOngRequest>;
type EntityArrayResponseType = HttpResponse<IOngRequest[]>;

@Injectable({ providedIn: 'root' })
export class OngRequestService {
  public resourceUrl = SERVER_API_URL + 'api/ong-requests';

  constructor(protected http: HttpClient) {}

  create(ongRequest: IOngRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ongRequest);
    return this.http
      .post<IOngRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ongRequest: IOngRequest): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ongRequest);
    return this.http
      .put<IOngRequest>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOngRequest>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOngRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(ongRequest: IOngRequest): IOngRequest {
    const copy: IOngRequest = Object.assign({}, ongRequest, {
      registrationDate:
        ongRequest.registrationDate != null && ongRequest.registrationDate.isValid()
          ? ongRequest.registrationDate.format(DATE_FORMAT)
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
      res.body.forEach((ongRequest: IOngRequest) => {
        ongRequest.registrationDate = ongRequest.registrationDate != null ? moment(ongRequest.registrationDate) : null;
      });
    }
    return res;
  }
}
