import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class ApiService{

    menuChanged = new EventEmitter<Menu[]>();
    SERVER_URL = 'http://localhost:3000';
    constructor(private http: HttpClient) { }

    public getData() {
        return new Promise((resolve, reject) => {
          this.http.get(`${this.SERVER_URL}/menu`).subscribe(
            (data: any) => {
            //   this.menu = data;
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
    this.http.post(`${this.SERVER_URL}/upload`, formData)
    .subscribe(
        (res:any)=>{
        console.log(res)
        menuData["image"] = res.key
        this.onAddData(menuData);
        },
        (err:any)=>{
        console.log(err)
        });
    }

    public onAddData(menuData:any){
        return this.http.post(`${this.SERVER_URL}/menu/addMenu`,menuData).subscribe(
        (res: any) => {
            // this.menu.push(res);
            // this.menuChanged.emit(this.menu.slice());
        },
        (err: any) => {
            console.log(err);
        }
        );
    }
    
    public removeData(menuId:any) {
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
            // let index = this.menu.findIndex((menu)  => (menu._id === menuId));
            // this.menu.splice(index, 1)
            // this.menuChanged.emit(this.menu.slice())
        },
        (err: any) => {
        console.log({ err })
        })
    // this.menuChanged.emit(this.menu.slice())
    }
    
    public getDataById(menuId:any) {
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
    
    public onEditData(formData,menuData) {
    console.log(formData)
    console.log(menuData)
    // let menuIndex = this.menu.findIndex((menu => menu._id === formData.get('_id')));
    // this.menu[menuIndex].menu_name = formData.get('menu_name')
    // this.menu[menuIndex].image = formData.get('image')
    // this.menu[menuIndex].status = formData.get('status')
    // this.menuChanged.emit(this.menu.slice())
    }
};