import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VolunteerSharedModule } from 'app/shared/shared.module';
import { VolunteerRequestComponent } from './volunteer-request.component';
import { VolunteerRequestDetailComponent } from './volunteer-request-detail.component';
import { VolunteerRequestUpdateComponent } from './volunteer-request-update.component';
import { VolunteerRequestDeletePopupComponent, VolunteerRequestDeleteDialogComponent } from './volunteer-request-delete-dialog.component';
import { volunteerRequestRoute, volunteerRequestPopupRoute } from './volunteer-request.route';

const ENTITY_STATES = [...volunteerRequestRoute, ...volunteerRequestPopupRoute];

@NgModule({
  imports: [VolunteerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    VolunteerRequestComponent,
    VolunteerRequestDetailComponent,
    VolunteerRequestUpdateComponent,
    VolunteerRequestDeleteDialogComponent,
    VolunteerRequestDeletePopupComponent
  ],
  entryComponents: [VolunteerRequestDeleteDialogComponent]
})
export class VolunteerVolunteerRequestModule {}
