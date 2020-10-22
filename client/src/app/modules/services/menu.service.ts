import { Injectable } from '@angular/core';
import { Menu } from '../../models/menu.model';
import { EventEmitter } from '@angular/core';
import { HttpClient} from  '@angular/common/http';  
import { ItemsComponent } from '../manageFood/items/items.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menuChanged = new EventEmitter<Menu[]>();
  SERVER_URL = 'http://localhost:3000/'
  private menu: Menu[] = [];

	constructor(private http: HttpClient) { }

  public getMenu() {
    return this.http.get(`${this.SERVER_URL}menu`).subscribe(
      (res: any) => {
        console.log('~~~~~~~~~~~>',res)
        // this.menu.slice();
      },
      (err: any) => {
        console.log(err);
      }
    );
    // return this.menu.slice();
  }

  public onAddMenu(formData) {
    console.log(formData)
    // this.menu.push(new Menu(formData.get('_id'),formData.get('menuName'),formData.get('fileUpload'),formData.get('status')));
    // this.menuChanged.emit(this.menu.slice());
    return this.http.post(`${this.SERVER_URL}menu/addMenu`,formData).subscribe(
      (res: any) => {
        this.menu.push(res.dataFromDatabase);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  public removeMenu(menuId:number) {
    let index = this.menu.map((menu)  =>  { 
      return menu._id
    }).indexOf(menuId);
    this.menu.splice(index,1)
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
    this.menu[menuIndex].menuName = formData.get('menuName')
    this.menu[menuIndex].fileUpload = formData.get('fileUpload')
    this.menu[menuIndex].status = formData.get('status')
    this.menuChanged.emit(this.menu.slice())
  }

}
