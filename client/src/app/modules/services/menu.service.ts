import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  menuChanged = new EventEmitter<Menu[]>();
  SERVER_URL = 'http://localhost:3000'
  private menu: Menu[] = [];

  constructor(private http: HttpClient,private _apiService:ApiService) { }

  public getMenu() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.SERVER_URL}/menu`).subscribe(
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

  public onAddImage(formData,menuData,addMode) {
    this.http.post(`${this.SERVER_URL}/upload`, formData)
    .subscribe(
      (res:any)=>{
        menuData["image"] = res.key
        if(addMode){
          this.onAddMenu(menuData);
        }
        else
        {
          menuData['_id'] = formData.get('_id');
          this.onEditMenu(menuData)
        }
      },
      (err:any)=>{
        console.log(err)
      });
  }

  public onAddMenu(menuData:any){
     return this.http.post(`${this.SERVER_URL}/menu/addMenu`,menuData).subscribe(
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
  
      this.http.delete(`${this.SERVER_URL}/menu/deleteMenu`, httpOptions).subscribe(
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
  
  // public getImage(imageId:any){
  //   return new Promise((resolve, reject) => {
  //   this.http.get(`${this.SERVER_URL}/upload/${imageId}`, {responseType: 'blob'})
  //   .subscribe(
  //     (res:any) =>{
  //       let xmlData = this.onFileChange(res);
  //       return resolve(xmlData);
  //     },
  //     (err:any)=>{
  //       reject(err);
  //     });
  //   });
  // }

  public getMenuById(menuId:any) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.SERVER_URL}/menu/${menuId}`).subscribe(
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
    this.http.put(`${this.SERVER_URL}/menu/updateMenu`, updateMenuData).subscribe(
        (res:any) => {
          console.log(res);
        },
        (err:any) => {
          console.log(err);
        }
        // this.menuChanged.emit(this.menu.slice())
      );
    // let menuIndex = this.menu.findIndex((menu => menu._id === formData.get('_id')));
    // this.menu[menuIndex].menu_name = formData.get('menu_name')
    // this.menu[menuIndex].image = formData.get('image')
    // this.menu[menuIndex].status = formData.get('status')
    // this.menuChanged.emit(this.menu.slice())
  }

  // onFileChange(file: any) {
  //   console.log(file)
  //     let xmlData;
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       xmlData = reader.result
  //     }
  //     reader.readAsDataURL(file);
  //     return xmlData;
  // }

  }
