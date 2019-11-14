import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VolunteerSharedModule } from 'app/shared/shared.module';
import { StatusComponent } from './status.component';
import { StatusDetailComponent } from './status-detail.component';
import { StatusUpdateComponent } from './status-update.component';
import { StatusDeletePopupComponent, StatusDeleteDialogComponent } from './status-delete-dialog.component';
import { statusRoute, statusPopupRoute } from './status.route';

const ENTITY_STATES = [...statusRoute, ...statusPopupRoute];

@NgModule({
  imports: [VolunteerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [StatusComponent, StatusDetailComponent, StatusUpdateComponent, StatusDeleteDialogComponent, StatusDeletePopupComponent],
  entryComponents: [StatusDeleteDialogComponent]
})
export class VolunteerStatusModule {}
