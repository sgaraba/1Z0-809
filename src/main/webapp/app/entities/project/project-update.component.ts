import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IProject, Project } from 'app/shared/model/project.model';
import { ProjectService } from './project.service';
import { IStatus } from 'app/shared/model/status.model';
import { StatusService } from 'app/entities/status/status.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IOng } from 'app/shared/model/ong.model';
import { OngService } from 'app/entities/ong/ong.service';

@Component({
  selector: 'jhi-project-update',
  templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit {
  isSaving: boolean;

  statuses: IStatus[];

  categories: ICategory[];

  users: IUser[];

  ongs: IOng[];
  registrationDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    description: [null, [Validators.required, Validators.maxLength(5000)]],
    registrationDate: [],
    status: [],
    category: [],
    users: [],
    ong: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected projectService: ProjectService,
    protected statusService: StatusService,
    protected categoryService: CategoryService,
    protected userService: UserService,
    protected ongService: OngService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
    });
    this.statusService.query({ 'projectId.specified': 'false' }).subscribe(
      (res: HttpResponse<IStatus[]>) => {
        if (!this.editForm.get('status').value || !this.editForm.get('status').value.id) {
          this.statuses = res.body;
        } else {
          this.statusService
            .find(this.editForm.get('status').value.id)
            .subscribe(
              (subRes: HttpResponse<IStatus>) => (this.statuses = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.categoryService.query({ 'projectId.specified': 'false' }).subscribe(
      (res: HttpResponse<ICategory[]>) => {
        if (!this.editForm.get('category').value || !this.editForm.get('category').value.id) {
          this.categories = res.body;
        } else {
          this.categoryService
            .find(this.editForm.get('category').value.id)
            .subscribe(
              (subRes: HttpResponse<ICategory>) => (this.categories = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.ongService
      .query()
      .subscribe((res: HttpResponse<IOng[]>) => (this.ongs = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(project: IProject) {
    this.editForm.patchValue({
      id: project.id,
      name: project.name,
      description: project.description,
      registrationDate: project.registrationDate,
      status: project.status,
      category: project.category,
      users: project.users,
      ong: project.ong
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const project = this.createFromForm();
    if (project.id !== undefined) {
      this.subscribeToSaveResponse(this.projectService.update(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.create(project));
    }
  }

  private createFromForm(): IProject {
    return {
      ...new Project(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      registrationDate: this.editForm.get(['registrationDate']).value,
      status: this.editForm.get(['status']).value,
      category: this.editForm.get(['category']).value,
      users: this.editForm.get(['users']).value,
      ong: this.editForm.get(['ong']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>) {
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

  trackStatusById(index: number, item: IStatus) {
    return item.id;
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackOngById(index: number, item: IOng) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
