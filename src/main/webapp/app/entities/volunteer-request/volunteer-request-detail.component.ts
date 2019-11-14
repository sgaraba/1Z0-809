import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVolunteerRequest } from 'app/shared/model/volunteer-request.model';

@Component({
  selector: 'jhi-volunteer-request-detail',
  templateUrl: './volunteer-request-detail.component.html'
})
export class VolunteerRequestDetailComponent implements OnInit {
  volunteerRequest: IVolunteerRequest;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ volunteerRequest }) => {
      this.volunteerRequest = volunteerRequest;
    });
  }

  previousState() {
    window.history.back();
  }
}
