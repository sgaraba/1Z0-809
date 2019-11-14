import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VolunteerSharedModule } from 'app/shared/shared.module';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectUpdateComponent } from './project-update.component';
import { ProjectDeletePopupComponent, ProjectDeleteDialogComponent } from './project-delete-dialog.component';
import { projectRoute, projectPopupRoute } from './project.route';

const ENTITY_STATES = [...projectRoute, ...projectPopupRoute];

@NgModule({
  imports: [VolunteerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectUpdateComponent,
    ProjectDeleteDialogComponent,
    ProjectDeletePopupComponent
  ],
  entryComponents: [ProjectDeleteDialogComponent]
})
export class VolunteerProjectModule {}
