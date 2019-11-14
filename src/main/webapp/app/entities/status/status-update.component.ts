import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStatus, Status } from 'app/shared/model/status.model';
import { StatusService } from './status.service';

@Component({
  selector: 'jhi-status-update',
  templateUrl: './status-update.component.html'
})
export class StatusUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(50)]],
    description: [null, [Validators.required, Validators.maxLength(1000)]]
  });

  constructor(protected statusService: StatusService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ status }) => {
      this.updateForm(status);
    });
  }

  updateForm(status: IStatus) {
    this.editForm.patchValue({
      id: status.id,
      name: status.name,
      description: status.description
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  private createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
