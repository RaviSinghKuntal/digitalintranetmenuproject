import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddmenuComponent } from '../manageFood/menu/addmenu/addmenu.component';
import { Menu } from 'src/app/models/menu.model';
import { AdditemComponent } from '../manageFood/items/additem/additem.component';

@Injectable({
    providedIn:'root',
})
export class DialogBoxService {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AdditemComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditableDialog(menuItem:Menu) {
    let editMenuData = {...menuItem, editMenu:true}
    let dialogRef=this.dialog.open(AddmenuComponent,{data: editMenuData});
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

}