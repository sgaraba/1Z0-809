import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from 'app/shared/model/status.model';
import { StatusService } from './status.service';
import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './status-detail.component';
import { StatusUpdateComponent } from './status-update.component';
import { StatusDeletePopupComponent } from './status-delete-dialog.component';
import { IStatus } from 'app/shared/model/status.model';

@Injectable({ providedIn: 'root' })
export class StatusResolve implements Resolve<IStatus> {
  constructor(private service: StatusService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStatus> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((status: HttpResponse<Status>) => status.body));
    }
    return of(new Status());
  }
}

export const statusRoute: Routes = [
  {
    path: '',
    component: StatusComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.status.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatusDetailComponent,
    resolve: {
      status: StatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.status.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatusUpdateComponent,
    resolve: {
      status: StatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.status.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatusUpdateComponent,
    resolve: {
      status: StatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.status.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const statusPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StatusDeletePopupComponent,
    resolve: {
      status: StatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.status.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
