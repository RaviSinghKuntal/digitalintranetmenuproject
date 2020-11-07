import { Component, OnInit } from '@angular/core';
import { title }  from "../../../shared/constant";
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../models/category.model';
import { DialogBoxService } from '../../services/dialog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  title: string = title.Category;
  category: any;

  constructor(private _categoryService: CategoryService,private _dialogBox: DialogBoxService) {
  }

  async ngOnInit(){
    this.category = await this._categoryService.getCategory();
    this._categoryService.categoryChanged.subscribe((category: Category[]) => {
      this.category = category;
    });
  }

  async onRemoveCategory(categoryId:number) {
    await this._categoryService.removeCategory(categoryId);
  }

  onEditCategory(categoryItem) {
    this._dialogBox.openEditableDialog(categoryItem);
  }
}
