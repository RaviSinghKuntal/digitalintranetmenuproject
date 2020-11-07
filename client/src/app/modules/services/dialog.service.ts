import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddmenuComponent } from '../manageFood/menu/addmenu/addmenu.component';
import { AddcategoryComponent } from '../manageFood/category/addcategory/addcategory.component';
import { Menu } from 'src/app/models/menu.model';
import { Category } from 'src/app/models/category.model';
import { AdditemComponent } from '../manageFood/items/additem/additem.component';

@Injectable({
    providedIn:'root',
})
export class DialogBoxService {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AddcategoryComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditableDialog(menuItem:Category) {
    let editCategoryData = {...menuItem, editCategory:true}
    let dialogRef=this.dialog.open(AddcategoryComponent,{data: editCategoryData});
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

}