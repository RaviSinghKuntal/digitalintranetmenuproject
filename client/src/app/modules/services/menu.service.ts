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
  private menu: Menu[] = [];

  constructor(private http: HttpClient,private _apiService:ApiService) { }

  public getMenu() {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/menu`).subscribe(
        (data: any) => {
          this.menu = data;
          return resolve(data);
        },
        (err: any) => {
          reject(err)
        }
      )
    })
  }

  public onAddImage(formData) {
    return new Promise((resolve, reject) => {
    this.http.post(`${SERVER_URL}/upload`, formData)
    .subscribe(
      (res:any)=>{
        return resolve(res.key);
      },
      (err:any)=>{
        reject(err)
      });
    });
  }

  public onAddMenu(menuData:any){
     return this.http.post(`${SERVER_URL}/menu/addMenu`,menuData).subscribe(
        (res: any) => {
          this.menu.push(res);
          this.menuChanged.emit(this.menu.slice());
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public removeMenu(menuId:any) {
      const httpOptions: any = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      httpOptions.body = {
        _id: menuId,
      };
  
      this.http.delete(`${SERVER_URL}/menu/deleteMenu`, httpOptions).subscribe(
        (res: any) => {
          let index = this.menu.findIndex((menu)  => (menu._id === menuId));
          this.menu.splice(index, 1)
          this.menuChanged.emit(this.menu.slice())
      },
      (err: any) => {
        console.log({ err })
      })
    this.menuChanged.emit(this.menu.slice())
  }

  public getMenuById(menuId:any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${SERVER_URL}/menu/${menuId}`).subscribe(
      (res:any) => {
        return resolve(res);
      },
      (err:any) => {
        reject(err);
      }
    )
  })
  }

  public onEditMenu(menuData) {
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
    this.http.put(`${SERVER_URL}/menu/updateMenu`, updateMenuData).subscribe(
        (res:any) => {
          let menuIndex = this.menu.findIndex(menu => menu._id === menuData._id);
          this.menu[menuIndex].english_name = menuData.english_name,
          this.menu[menuIndex].image = menuData.image,
          this.menu[menuIndex].status = menuData.status,
          this.menuChanged.emit(this.menu.slice())   
        },
        (err:any) => {
          console.log(err);
        }
      );
  }

  }
