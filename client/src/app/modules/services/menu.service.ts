import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuChanged = new EventEmitter<Menu[]>();
  SERVER_URL = 'http://localhost:3000/'
  private menu: Menu[]=[];

	constructor(private http: HttpClient) { }

  public getMenu() {
    return new Promise((resolve, reject)=>{
      this.http.get(`${this.SERVER_URL}menu`).subscribe(
        (data:any) =>  {
          this.menu = data;
          return resolve(data);
        },
        (err:any) => {
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
        let imageKey:string = res.key;
        let menuDataobj = {...menuData, imageKey}
        this.onAddMenu(menuDataobj);
      },
      (err:any)=>{
        console.log(err)
      });
  }

  public onAddMenu(menuData:object){
     return this.http.post(`${this.SERVER_URL}menu/addMenu`,menuData).subscribe(
        (res: any) => {
          let fileData = this.getImage(res._id)
          console.log(res);
          this.menu.push(res);
          this.menuChanged.emit(this.menu.slice());
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  public getImage(imageId:any){
    return this.http.get(`${this.SERVER_URL}upload/${imageId}`)
    .subscribe(
      (res:any) =>{
        return res;
      },
      (err:any)=>{
        console.log(err);
      });
  }

  public removeMenu(menuId:any) {
    console.log({ menuId });
    this.http.delete(`${this.SERVER_URL}menu/deleteMenu`, {params: {body: menuId}}).subscribe(
      (res:any)=>{
        console.log({res})
      },
      (err:any)=>{
        console.log({err})
      })
    this.menuChanged.emit(this.menu.slice())
  }

  public getMenuById(menuId){
    let menuItem = this.menu.find((menu) => { 
      return menu._id === menuId; 
    });
    return menuItem;
  }

  public onEditMenu(formData){
    let menuIndex = this.menu.findIndex((menu => menu._id === formData.get('_id')));
    this.menu[menuIndex].menu_name = formData.get('menu_name')
    this.menu[menuIndex].image = formData.get('image')
    this.menu[menuIndex].status = formData.get('status')
    this.menuChanged.emit(this.menu.slice())
  }

}
