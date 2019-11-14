import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VolunteerSharedModule } from 'app/shared/shared.module';
import { OngRequestComponent } from './ong-request.component';
import { OngRequestDetailComponent } from './ong-request-detail.component';
import { OngRequestUpdateComponent } from './ong-request-update.component';
import { OngRequestDeletePopupComponent, OngRequestDeleteDialogComponent } from './ong-request-delete-dialog.component';
import { ongRequestRoute, ongRequestPopupRoute } from './ong-request.route';

const ENTITY_STATES = [...ongRequestRoute, ...ongRequestPopupRoute];

@NgModule({
  imports: [VolunteerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OngRequestComponent,
    OngRequestDetailComponent,
    OngRequestUpdateComponent,
    OngRequestDeleteDialogComponent,
    OngRequestDeletePopupComponent
  ],
  entryComponents: [OngRequestDeleteDialogComponent]
})
export class VolunteerOngRequestModule {}
