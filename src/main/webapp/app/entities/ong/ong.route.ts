import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ong } from 'app/shared/model/ong.model';
import { OngService } from './ong.service';
import { OngComponent } from './ong.component';
import { OngDetailComponent } from './ong-detail.component';
import { OngUpdateComponent } from './ong-update.component';
import { OngDeletePopupComponent } from './ong-delete-dialog.component';
import { IOng } from 'app/shared/model/ong.model';

@Injectable({ providedIn: 'root' })
export class OngResolve implements Resolve<IOng> {
  constructor(private service: OngService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOng> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((ong: HttpResponse<Ong>) => ong.body));
    }
    return of(new Ong());
  }
}

export const ongRoute: Routes = [
  {
    path: '',
    component: OngComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'volunteerApp.ong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OngDetailComponent,
    resolve: {
      ong: OngResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OngUpdateComponent,
    resolve: {
      ong: OngResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ong.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OngUpdateComponent,
    resolve: {
      ong: OngResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ong.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ongPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OngDeletePopupComponent,
    resolve: {
      ong: OngResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'volunteerApp.ong.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
