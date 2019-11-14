import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'jhi-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit, OnDestroy {
  categories: ICategory[];
  eventSubscriber: Subscription;

  constructor(protected categoryService: CategoryService, protected eventManager: JhiEventManager) {}

  loadAll() {
    this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => {
      this.categories = res.body;
    });
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCategories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICategory) {
    return item.id;
  }

  registerChangeInCategories() {
    this.eventSubscriber = this.eventManager.subscribe('categoryListModification', () => this.loadAll());
  }
}
