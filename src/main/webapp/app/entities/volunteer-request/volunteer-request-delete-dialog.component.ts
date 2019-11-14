import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVolunteerRequest } from 'app/shared/model/volunteer-request.model';
import { VolunteerRequestService } from './volunteer-request.service';

@Component({
  selector: 'jhi-volunteer-request-delete-dialog',
  templateUrl: './volunteer-request-delete-dialog.component.html'
})
export class VolunteerRequestDeleteDialogComponent {
  volunteerRequest: IVolunteerRequest;

  constructor(
    protected volunteerRequestService: VolunteerRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.volunteerRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'volunteerRequestListModification',
        content: 'Deleted an volunteerRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-volunteer-request-delete-popup',
  template: ''
})
export class VolunteerRequestDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ volunteerRequest }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(VolunteerRequestDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.volunteerRequest = volunteerRequest;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/volunteer-request', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/volunteer-request', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
