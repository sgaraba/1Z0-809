import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OngRequest } from 'app/shared/model/ong-request.model';
import { OngRequestService } from './ong-request.service';
import { OngRequestComponent } from './ong-request.component';
import { OngRequestDetailComponent } from './ong-request-detail.component';
import { OngRequestUpdateComponent } from './ong-request-update.component';
import { OngRequestDeletePopupComponent } from './ong-request-delete-dialog.component';
import { IOngRequest } from 'app/shared/model/ong-request.model';

@Injectable({ providedIn: 'root' })
export class OngRequestResolve implements Resolve<IOngRequest> {
  constructor(private service: OngRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOngRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ongRequest: HttpResponse<OngRequest>) => ongRequest.body));
    }
    return of(new OngRequest());
  }
}

export const ongRequestRoute: Routes = [
  {
    path: '',
    component: OngRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'volunteerApp.ongRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OngRequestDetailComponent,
    resolve: {
      ongRequest: OngRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ongRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OngRequestUpdateComponent,
    resolve: {
      ongRequest: OngRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ongRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OngRequestUpdateComponent,
    resolve: {
      ongRequest: OngRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ongRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ongRequestPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OngRequestDeletePopupComponent,
    resolve: {
      ongRequest: OngRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ongRequest.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
