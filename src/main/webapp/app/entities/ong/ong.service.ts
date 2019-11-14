import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOng } from 'app/shared/model/ong.model';

type EntityResponseType = HttpResponse<IOng>;
type EntityArrayResponseType = HttpResponse<IOng[]>;

@Injectable({ providedIn: 'root' })
export class OngService {
  public resourceUrl = SERVER_API_URL + 'api/ongs';

  constructor(protected http: HttpClient) {}

  create(ong: IOng): Observable<EntityResponseType> {
    return this.http.post<IOng>(this.resourceUrl, ong, { observe: 'response' });
  }

  update(ong: IOng): Observable<EntityResponseType> {
    return this.http.put<IOng>(this.resourceUrl, ong, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOng>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOng[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
