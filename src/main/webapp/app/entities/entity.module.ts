import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'status',
        loadChildren: () => import('./status/status.module').then(m => m.VolunteerStatusModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.VolunteerCategoryModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./project/project.module').then(m => m.VolunteerProjectModule)
      },
      {
        path: 'ong',
        loadChildren: () => import('./ong/ong.module').then(m => m.VolunteerOngModule)
      },
      {
        path: 'volunteer-request',
        loadChildren: () => import('./volunteer-request/volunteer-request.module').then(m => m.VolunteerVolunteerRequestModule)
      },
      {
        path: 'ong-request',
        loadChildren: () => import('./ong-request/ong-request.module').then(m => m.VolunteerOngRequestModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class VolunteerEntityModule {}
