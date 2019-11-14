import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { VolunteerRequest } from 'app/shared/model/volunteer-request.model';
import { VolunteerRequestService } from './volunteer-request.service';
import { VolunteerRequestComponent } from './volunteer-request.component';
import { VolunteerRequestDetailComponent } from './volunteer-request-detail.component';
import { VolunteerRequestUpdateComponent } from './volunteer-request-update.component';
import { VolunteerRequestDeletePopupComponent } from './volunteer-request-delete-dialog.component';
import { IVolunteerRequest } from 'app/shared/model/volunteer-request.model';

@Injectable({ providedIn: 'root' })
export class VolunteerRequestResolve implements Resolve<IVolunteerRequest> {
  constructor(private service: VolunteerRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVolunteerRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((volunteerRequest: HttpResponse<VolunteerRequest>) => volunteerRequest.body));
    }
    return of(new VolunteerRequest());
  }
}

export const volunteerRequestRoute: Routes = [
  {
    path: '',
    component: VolunteerRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'volunteerApp.volunteerRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VolunteerRequestDetailComponent,
    resolve: {
      volunteerRequest: VolunteerRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.volunteerRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VolunteerRequestUpdateComponent,
    resolve: {
      volunteerRequest: VolunteerRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.volunteerRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VolunteerRequestUpdateComponent,
    resolve: {
      volunteerRequest: VolunteerRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.volunteerRequest.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const volunteerRequestPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: VolunteerRequestDeletePopupComponent,
    resolve: {
      volunteerRequest: VolunteerRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.volunteerRequest.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
