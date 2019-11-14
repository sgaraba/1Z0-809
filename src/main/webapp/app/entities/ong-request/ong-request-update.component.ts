import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOngRequest, OngRequest } from 'app/shared/model/ong-request.model';
import { OngRequestService } from './ong-request.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-ong-request-update',
  templateUrl: './ong-request-update.component.html'
})
export class OngRequestUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];
  registrationDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    idno: [null, [Validators.required, Validators.maxLength(13)]],
    registrationDate: [],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ongRequestService: OngRequestService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ongRequest }) => {
      this.updateForm(ongRequest);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ongRequest: IOngRequest) {
    this.editForm.patchValue({
      id: ongRequest.id,
      name: ongRequest.name,
      idno: ongRequest.idno,
      registrationDate: ongRequest.registrationDate,
      user: ongRequest.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ongRequest = this.createFromForm();
    if (ongRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.ongRequestService.update(ongRequest));
    } else {
      this.subscribeToSaveResponse(this.ongRequestService.create(ongRequest));
    }
  }

  private createFromForm(): IOngRequest {
    return {
      ...new OngRequest(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      idno: this.editForm.get(['idno']).value,
      registrationDate: this.editForm.get(['registrationDate']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOngRequest>>) {
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
}
