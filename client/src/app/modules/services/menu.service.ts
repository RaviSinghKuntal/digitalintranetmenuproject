import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuChanged = new EventEmitter<Menu[]>();
  SERVER_URL = 'http://localhost:3000/'
  private menu: Menu[] = [];

  constructor(private http: HttpClient) { }

  public getMenu() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.SERVER_URL}menu`).subscribe(
        (data: any) => {
          this.menu = data;
          return resolve(data);
        },
        (err: any) => {
          reject(err)
          console.log(err);
        }
      )
    })
  }

  public onAddImage(formData,menuData) {
    this.http.post(`${this.SERVER_URL}upload`, formData)
    .subscribe(
      (res:any)=>{
        menuData["image"] = `${this.SERVER_URL}upload/${res.key}`;
        this.onAddMenu(menuData);
      },
      (err:any)=>{
        console.log(err)
      });
  }

  public onAddMenu(menuData:any){
     return this.http.post(`${this.SERVER_URL}menu/addMenu`,menuData).subscribe(
        (res: any) => {
          menuData["_id"] = res._id;
          this.menu.push(menuData);
          this.menuChanged.emit(this.menu.slice());
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public removeMenu(menuId:any) {
      console.log({ menuId });
      const httpOptions: any = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      httpOptions.body = {
        _id: menuId,
      };
  
      this.http.delete(`${this.SERVER_URL}menu/deleteMenu`, httpOptions).subscribe(
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

  public getMenuById(menuId) {
    let menuItem = this.menu.find((menu) => {
      return menu._id === menuId;
    });
    return menuItem;
  }

  public onEditMenu(formData) {
    let menuIndex = this.menu.findIndex((menu => menu._id === formData.get('_id')));
    this.menu[menuIndex].menu_name = formData.get('menu_name')
    this.menu[menuIndex].image = formData.get('image')
    this.menu[menuIndex].status = formData.get('status')
    this.menuChanged.emit(this.menu.slice())
  }

}
