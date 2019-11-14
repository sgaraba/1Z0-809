import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { VolunteerTestModule } from '../../../test.module';
import { VolunteerRequestDeleteDialogComponent } from 'app/entities/volunteer-request/volunteer-request-delete-dialog.component';
import { VolunteerRequestService } from 'app/entities/volunteer-request/volunteer-request.service';

describe('Component Tests', () => {
  describe('VolunteerRequest Management Delete Component', () => {
    let comp: VolunteerRequestDeleteDialogComponent;
    let fixture: ComponentFixture<VolunteerRequestDeleteDialogComponent>;
    let service: VolunteerRequestService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [VolunteerTestModule],
        declarations: [VolunteerRequestDeleteDialogComponent]
      })
        .overrideTemplate(VolunteerRequestDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VolunteerRequestDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VolunteerRequestService);
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
