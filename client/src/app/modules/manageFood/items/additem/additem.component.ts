import { Component, Inject, OnInit, Optional } from '@angular/core';
import { status } from '../../../../shared/constant';
import { ThemePalette } from '@angular/material/core';
import { MenuService } from '../../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
})
export class AdditemComponent implements OnInit {
  itemFormControl: FormGroup;
  color: ThemePalette = 'accent';
  addMode: boolean = true;
  editMenuData:any;

  constructor(private _menuService: MenuService,public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any) {

    this.itemFormControl = this.fb.group({
      _id: Date.now(),
      menu: ['', Validators.required],
      category: ['', [Validators.required]],
      itemName: [],
      itemNameArabic: [],
      itemDesc: [],
      itemDescArabic: [],
      calories:[],
      status: [],
    });

    this.editMenuData = {...data};
    if(this.editMenuData.editMenu){
      this.addMode = false;
      this.itemFormControl.patchValue({ 
        _id: this.editMenuData._id,
        menuName: this.editMenuData.menuName,
        fileUpload: this.editMenuData.fileUpload,
        status: this.editMenuData.status 
      })
    }
  }

  ngOnInit(): void { }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.itemFormControl.get('fileUpload').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

 async onSaveMenu() {
    const imageData = await toBase64(this.itemFormControl.get('fileUpload').value);
    let menuData = {
      // _id:this.itemFormControl.get('_id').value,
      menuName:this.itemFormControl.get('menuName').value,
      fileUpload: imageData,
      status:this.itemFormControl.get('status').value,
    }
    if (this.addMode) {
      this._menuService.onAddMenu(menuData);
    }else{
      this._menuService.onEditMenu(menuData)
    }
  }

}


const TREE_DATA = {
  Modifiers: {
    Breads: {
      Italian: null,
      Multigrain: null,
      Honey_Oat: null
    },
    Toppings:{
      American:null,
      Mozzarella:null
    },
    Veggies:{
      Lettuce:null,
      Cucumbers:null,
      Tomatoes:null
    }

  }
}