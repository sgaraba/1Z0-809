import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VolunteerSharedModule } from 'app/shared/shared.module';
import { OngComponent } from './ong.component';
import { OngDetailComponent } from './ong-detail.component';
import { OngUpdateComponent } from './ong-update.component';
import { OngDeletePopupComponent, OngDeleteDialogComponent } from './ong-delete-dialog.component';
import { ongRoute, ongPopupRoute } from './ong.route';

const ENTITY_STATES = [...ongRoute, ...ongPopupRoute];

@NgModule({
  imports: [VolunteerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [OngComponent, OngDetailComponent, OngUpdateComponent, OngDeleteDialogComponent, OngDeletePopupComponent],
  entryComponents: [OngDeleteDialogComponent]
})
export class VolunteerOngModule {}
