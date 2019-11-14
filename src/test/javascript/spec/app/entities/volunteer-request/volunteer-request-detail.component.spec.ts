import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { VolunteerRequestDetailComponent } from 'app/entities/volunteer-request/volunteer-request-detail.component';
import { VolunteerRequest } from 'app/shared/model/volunteer-request.model';

describe('Component Tests', () => {
  describe('VolunteerRequest Management Detail Component', () => {
    let comp: VolunteerRequestDetailComponent;
    let fixture: ComponentFixture<VolunteerRequestDetailComponent>;
    const route = ({ data: of({ volunteerRequest: new VolunteerRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [VolunteerRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VolunteerRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VolunteerRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.volunteerRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
