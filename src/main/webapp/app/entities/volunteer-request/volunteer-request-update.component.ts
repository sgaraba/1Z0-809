import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVolunteerRequest, VolunteerRequest } from 'app/shared/model/volunteer-request.model';
import { VolunteerRequestService } from './volunteer-request.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project/project.service';

@Component({
  selector: 'jhi-volunteer-request-update',
  templateUrl: './volunteer-request-update.component.html'
})
export class VolunteerRequestUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  projects: IProject[];
  registrationDateDp: any;

  editForm = this.fb.group({
    id: [],
    registrationDate: [],
    user: [],
    project: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected volunteerRequestService: VolunteerRequestService,
    protected userService: UserService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ volunteerRequest }) => {
      this.updateForm(volunteerRequest);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.projectService.query({ 'volunteerRequestId.specified': 'false' }).subscribe(
      (res: HttpResponse<IProject[]>) => {
        if (!this.editForm.get('project').value || !this.editForm.get('project').value.id) {
          this.projects = res.body;
        } else {
          this.projectService
            .find(this.editForm.get('project').value.id)
            .subscribe(
              (subRes: HttpResponse<IProject>) => (this.projects = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(volunteerRequest: IVolunteerRequest) {
    this.editForm.patchValue({
      id: volunteerRequest.id,
      registrationDate: volunteerRequest.registrationDate,
      user: volunteerRequest.user,
      project: volunteerRequest.project
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const volunteerRequest = this.createFromForm();
    if (volunteerRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.volunteerRequestService.update(volunteerRequest));
    } else {
      this.subscribeToSaveResponse(this.volunteerRequestService.create(volunteerRequest));
    }
  }

  private createFromForm(): IVolunteerRequest {
    return {
      ...new VolunteerRequest(),
      id: this.editForm.get(['id']).value,
      registrationDate: this.editForm.get(['registrationDate']).value,
      user: this.editForm.get(['user']).value,
      project: this.editForm.get(['project']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVolunteerRequest>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackProjectById(index: number, item: IProject) {
    return item.id;
  }
}
