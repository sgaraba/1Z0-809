import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { OngRequestUpdateComponent } from 'app/entities/ong-request/ong-request-update.component';
import { OngRequestService } from 'app/entities/ong-request/ong-request.service';
import { OngRequest } from 'app/shared/model/ong-request.model';

describe('Component Tests', () => {
  describe('OngRequest Management Update Component', () => {
    let comp: OngRequestUpdateComponent;
    let fixture: ComponentFixture<OngRequestUpdateComponent>;
    let service: OngRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [OngRequestUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OngRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OngRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OngRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OngRequest(123);
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
        const entity = new OngRequest();
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
