import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from './status.service';

@Component({
  selector: 'jhi-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit, OnDestroy {
  statuses: IStatus[];
  eventSubscriber: Subscription;

  constructor(protected statusService: StatusService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.statusService.query().subscribe((res: HttpResponse<IStatus[]>) => {
      this.statuses = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInStatuses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStatus) {
    return item.id;
  }

  registerChangeInStatuses() {
    this.eventSubscriber = this.eventManager.subscribe('statusListModification', () => this.loadAll());
  }
}
