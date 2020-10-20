import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MenuService } from '../../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Menu } from 'src/app/models/menu.model';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  menuFormControl: FormGroup;
  color: ThemePalette = 'accent';
  checked: boolean = false;
  addMode: boolean = true;
  editMenuData:any;

  constructor(private _menuService: MenuService,public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.menuFormControl = this.fb.group({
      _id: Date.now(),
      menuName: ['', Validators.required],
      fileUpload: ['', [Validators.required]],
      status: [this.checked],
    });

    this.editMenuData = {...data};
    if(this.editMenuData.editMenu){
      this.addMode = false;
      this.menuFormControl.patchValue({ 
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
        this.menuFormControl.get('fileUpload').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSaveMenu() {
    let formData = new FormData();
    formData.append('_id', this.menuFormControl.get('_id').value);
    formData.append('menuName', this.menuFormControl.get('menuName').value);
    formData.append('fileUpload', this.menuFormControl.get('fileUpload').value);
    formData.append('status', this.menuFormControl.get('status').value);
    if (this.addMode) {
      this._menuService.onAddMenu(formData);
    }else{
      this._menuService.onEditMenu(formData)
    }
  }
}
