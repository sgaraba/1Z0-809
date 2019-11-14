import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOngRequest } from 'app/shared/model/ong-request.model';
import { OngRequestService } from './ong-request.service';

@Component({
  selector: 'jhi-ong-request-delete-dialog',
  templateUrl: './ong-request-delete-dialog.component.html'
})
export class OngRequestDeleteDialogComponent {
  ongRequest: IOngRequest;

  constructor(
    protected ongRequestService: OngRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ongRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ongRequestListModification',
        content: 'Deleted an ongRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ong-request-delete-popup',
  template: ''
})
export class OngRequestDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ongRequest }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OngRequestDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ongRequest = ongRequest;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/ong-request', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/ong-request', { outlets: { popup: null } }]);
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
