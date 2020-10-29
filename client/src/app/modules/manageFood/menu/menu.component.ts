import { Component, OnInit } from '@angular/core';
import { title }  from "../../../shared/constant";
import { Menu } from '../../../models/menu.model';

import { MenuService } from '../../services/menu.service';
import { DialogBoxService } from '../../services/dialog.service';
import { SocketioService } from '../../services/socketio.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  title: string = title.Menu;
  menu:any;

  constructor(private _menuService: MenuService,private _dialogBox: DialogBoxService,private _socketService: SocketioService) {
  }

  async ngOnInit() {
    this.menu = await this._menuService.getMenu();
    this._menuService.menuChanged.subscribe((menu: Menu) => {
      console.log(menu);
    });
    this._socketService.setupSocketConnection();
  }

  onRemoveMenu(menuId:string) {
    this._menuService.removeMenu(menuId);
  }

  onEditMenu(menuId:number) {
    const menuItem: Menu = this._menuService.getMenuById(menuId);
    this._dialogBox.openEditableDialog(menuItem)
  }
}
