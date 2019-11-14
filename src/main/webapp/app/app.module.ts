import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { VolunteerSharedModule } from 'app/shared/shared.module';
import { VolunteerCoreModule } from 'app/core/core.module';
import { VolunteerAppRoutingModule } from './app-routing.module';
import { VolunteerHomeModule } from './home/home.module';
import { VolunteerEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    VolunteerSharedModule,
    VolunteerCoreModule,
    VolunteerHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    VolunteerEntityModule,
    VolunteerAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class VolunteerAppModule {}
