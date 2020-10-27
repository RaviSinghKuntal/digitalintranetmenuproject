import { Component, OnInit } from '@angular/core';
import { status } from '../../../../shared/constant';
import { ThemePalette } from '@angular/material/core';
import { MenuService } from '../../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  filesName:any= [];

  constructor(private _menuService: MenuService,public fb: FormBuilder) {
    this.itemFormControl = this.fb.group({
      _id: Date.now(),
      menu: ['', Validators.required],
      category: ['', [Validators.required]],
      itemName: [''],
      itemNameArabic: [''],
      itemDesc: [''],
      itemDescArabic: [''],
      fileUpload:[''],
      calories:[''],
      status: [''],
    });
  }

  ngOnInit(): void { }

  onFileChange(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = () => {
        this.itemFormControl.get('fileUpload').setValue(event.target.files);
        this.filesName = this.itemFormControl.get('fileUpload').value;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

 onSaveMenu() {
   console.log(this.itemFormControl.get('fileUpload').value)
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