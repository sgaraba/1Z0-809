import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VolunteerTestModule } from '../../../test.module';
import { OngDeleteDialogComponent } from 'app/entities/ong/ong-delete-dialog.component';
import { OngService } from 'app/entities/ong/ong.service';

describe('Component Tests', () => {
  describe('Ong Management Delete Component', () => {
    let comp: OngDeleteDialogComponent;
    let fixture: ComponentFixture<OngDeleteDialogComponent>;
    let service: OngService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [OngDeleteDialogComponent]
      })
        .overrideTemplate(OngDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OngDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OngService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
