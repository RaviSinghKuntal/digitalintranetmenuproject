import { Injectable } from '@angular/core';
import { SERVER_URL } from '../../shared/constant';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  menuChanged = new EventEmitter<Menu[]>();
  private menu:any = [];

  constructor(private _apiService:ApiService) { }

  async getMenu() {
    this.menu = await this._apiService.getData('/menu');
    return this.menu;
  }

  async onAddImage(formData) {
    return await this._apiService.onAddImage(formData,'/upload');
  }

  async onAddMenu(menuData:any){
    let res = await this._apiService.onAddData(menuData,'/menu/addMenu');
    this.menu.push(res);
    this.menuChanged.emit(this.menu.slice());
  }

  async removeMenu(menuId:any) {
    const httpOptions: any = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        _id:menuId
      }
    };
    await this._apiService.removeData(httpOptions,'/menu/deleteMenu');
    let index = this.menu.findIndex((menu)  => (menu._id === menuId));
    this.menu.splice(index, 1);
    this.menuChanged.emit(this.menu.slice());
  }

  async getMenuById(menuId:any) {
    await this._apiService.getDataById(menuId,'/menu/')
  }

  async onEditMenu(menuData) {
    console.log(menuData)
    let updateMenuData = {
      query:{
        _id: menuData._id,
      },
      updation:{
        english_name:menuData.english_name,
        arabic_name:menuData.arabic_name,
        image:menuData.image,
        status:menuData.status
      },
      options:{}
    }
    await this._apiService.onEditData(updateMenuData,'/menu/updateMenu')
    let menuIndex = this.menu.findIndex(menu => menu._id === menuData._id);
    this.menu[menuIndex].english_name = menuData.english_name,
    this.menu[menuIndex].image = menuData.image,
    this.menu[menuIndex].status = menuData.status,
    this.menuChanged.emit(this.menu.slice());
  }

  }
