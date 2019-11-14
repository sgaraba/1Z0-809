import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { OngDetailComponent } from 'app/entities/ong/ong-detail.component';
import { Ong } from 'app/shared/model/ong.model';

describe('Component Tests', () => {
  describe('Ong Management Detail Component', () => {
    let comp: OngDetailComponent;
    let fixture: ComponentFixture<OngDetailComponent>;
    const route = ({ data: of({ ong: new Ong(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [OngDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OngDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OngDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ong).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
