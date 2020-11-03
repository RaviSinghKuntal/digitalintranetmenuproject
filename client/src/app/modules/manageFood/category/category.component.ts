import { Component, OnInit } from '@angular/core';
import { title }  from "../../../shared/constant";
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../../models/menu.model';
import { DialogBoxService } from '../../services/dialog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  title: string = title.Category;
  menu: any;

  constructor(private _menuService: MenuService,private _dialogBox: DialogBoxService) {
  }

  ngOnInit(): void {
    this.menu = this._menuService.getMenu();
    this._menuService.menuChanged.subscribe((menu: Menu[]) => {
      this.menu = menu;
    });
  }

  onRemoveMenu(menuId:number) {
    this._menuService.removeMenu(menuId);
  }

  onEditMenu(menuId:number) {
    console.log(this._menuService.getMenu())
    // const menuItem: Menu = this._menuService.getMenuById(menuId);
    // this._dialogBox.openEditableDialog(menuItem)
  }
}
