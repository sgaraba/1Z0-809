import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOng } from 'app/shared/model/ong.model';

@Component({
  selector: 'jhi-ong-detail',
  templateUrl: './ong-detail.component.html'
})
export class OngDetailComponent implements OnInit {
  ong: IOng;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ong }) => {
      this.ong = ong;
    });
  }

  previousState() {
    window.history.back();
  }
}
