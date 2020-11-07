import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { EventEmitter } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  categoryChanged = new EventEmitter<Category[]>();
  private category:any = [];

  constructor(private _apiService:ApiService) { }

  async getCategory() {
    this.category = await this._apiService.getData('/category');
    return this.category;
  }

  async onAddImage(formData) {
    return await this._apiService.onAddImage(formData,'/upload');
  }

  async onAddCategory(categoryData:any){
    let res = await this._apiService.onAddData(categoryData,'/category/addCategory');
    this.category.push(res);
    this.categoryChanged.emit(this.category.slice());
  }

  async removeCategory(categoryId:any) {
    const httpOptions: any = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        _id:categoryId
      }
    };
    await this._apiService.removeData(httpOptions,'/category/deleteCategory');
    let index = this.category.findIndex((category)  => (category._id === categoryId));
    this.category.splice(index, 1);
    this.categoryChanged.emit(this.category.slice());
  }

  async getCategoryById(categoryId:any) {
    await this._apiService.getDataById(categoryId,'/category/')
  }

  async onEditCategory(categoryData) {
    let updateCategoryData = {
      query:{
        _id: categoryData._id,
      },
      updation:{
        english_name:categoryData.english_name,
        arabic_name:categoryData.arabic_name,
        image:categoryData.image,
        status:categoryData.status
      },
      options:{}
    }
    await this._apiService.onEditData(updateCategoryData,'/category/updateCategory')
    let categoryIndex = this.category.findIndex(category => category._id === categoryData._id);
    this.category[categoryIndex].english_name = categoryData.english_name,
    this.category[categoryIndex].image = categoryData.image,
    this.category[categoryIndex].status = categoryData.status,
    this.categoryChanged.emit(this.category.slice());
  }

  }
