import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { VolunteerRequestUpdateComponent } from 'app/entities/volunteer-request/volunteer-request-update.component';
import { VolunteerRequestService } from 'app/entities/volunteer-request/volunteer-request.service';
import { VolunteerRequest } from 'app/shared/model/volunteer-request.model';

describe('Component Tests', () => {
  describe('VolunteerRequest Management Update Component', () => {
    let comp: VolunteerRequestUpdateComponent;
    let fixture: ComponentFixture<VolunteerRequestUpdateComponent>;
    let service: VolunteerRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [VolunteerRequestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VolunteerRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VolunteerRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VolunteerRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new VolunteerRequest(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new VolunteerRequest();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
