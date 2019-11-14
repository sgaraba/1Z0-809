import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { VolunteerTestModule } from '../../../test.module';
import { OngUpdateComponent } from 'app/entities/ong/ong-update.component';
import { OngService } from 'app/entities/ong/ong.service';
import { Ong } from 'app/shared/model/ong.model';

describe('Component Tests', () => {
  describe('Ong Management Update Component', () => {
    let comp: OngUpdateComponent;
    let fixture: ComponentFixture<OngUpdateComponent>;
    let service: OngService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [OngUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OngUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OngUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OngService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ong(123);
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
        const entity = new Ong();
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
