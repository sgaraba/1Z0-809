import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOngRequest } from 'app/shared/model/ong-request.model';

@Component({
  selector: 'jhi-ong-request-detail',
  templateUrl: './ong-request-detail.component.html'
})
export class OngRequestDetailComponent implements OnInit {
  ongRequest: IOngRequest;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ongRequest }) => {
      this.ongRequest = ongRequest;
    });
  }

  previousState() {
    window.history.back();
  }
}
