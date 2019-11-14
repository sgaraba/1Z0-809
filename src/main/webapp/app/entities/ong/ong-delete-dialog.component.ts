import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOng } from 'app/shared/model/ong.model';
import { OngService } from './ong.service';

@Component({
  selector: 'jhi-ong-delete-dialog',
  templateUrl: './ong-delete-dialog.component.html'
})
export class OngDeleteDialogComponent {
  ong: IOng;

  constructor(protected ongService: OngService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.ongService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'ongListModification',
        content: 'Deleted an ong'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-ong-delete-popup',
  template: ''
})
export class OngDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ong }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OngDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.ong = ong;
        this.ngbModalRef.result.then(
          () => {
            this.router.navigate(['/ong', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          () => {
            this.router.navigate(['/ong', { outlets: { popup: null } }]);
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
