import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IOng, Ong } from 'app/shared/model/ong.model';
import { OngService } from './ong.service';

@Component({
  selector: 'jhi-ong-update',
  templateUrl: './ong-update.component.html'
})
export class OngUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    description: [null, [Validators.required, Validators.maxLength(5000)]],
    idno: [null, [Validators.required, Validators.maxLength(13)]],
    email: [null, [Validators.maxLength(50)]],
    address: [null, [Validators.maxLength(50)]],
    phone: [null, [Validators.maxLength(20)]]
  });

  constructor(protected ongService: OngService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ong }) => {
      this.updateForm(ong);
    });
  }

  updateForm(ong: IOng) {
    this.editForm.patchValue({
      id: ong.id,
      name: ong.name,
      description: ong.description,
      idno: ong.idno,
      email: ong.email,
      address: ong.address,
      phone: ong.phone
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ong = this.createFromForm();
    if (ong.id !== undefined) {
      this.subscribeToSaveResponse(this.ongService.update(ong));
    } else {
      this.subscribeToSaveResponse(this.ongService.create(ong));
    }
  }

  private createFromForm(): IOng {
    return {
      ...new Ong(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      idno: this.editForm.get(['idno']).value,
      email: this.editForm.get(['email']).value,
      address: this.editForm.get(['address']).value,
      phone: this.editForm.get(['phone']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOng>>) {
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
