import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { OngRequestDetailComponent } from 'app/entities/ong-request/ong-request-detail.component';
import { OngRequest } from 'app/shared/model/ong-request.model';

describe('Component Tests', () => {
  describe('OngRequest Management Detail Component', () => {
    let comp: OngRequestDetailComponent;
    let fixture: ComponentFixture<OngRequestDetailComponent>;
    const route = ({ data: of({ ongRequest: new OngRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [OngRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OngRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OngRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ongRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
