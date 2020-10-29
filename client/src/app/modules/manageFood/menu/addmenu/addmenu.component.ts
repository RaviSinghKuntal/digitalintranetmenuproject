import { Component, Inject, OnInit, Optional } from '@angular/core';
import { status } from '../../../../shared/constant';
import { ThemePalette } from '@angular/material/core';
import { MenuService } from '../../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-addmenu',
  templateUrl: './addmenu.component.html',
  styleUrls: ['./addmenu.component.scss'],
})
export class AddmenuComponent implements OnInit {
  menuFormControl: FormGroup;
  color: ThemePalette = 'accent';
  addMode: boolean = true;
  editMenuData:any;

  constructor(private _menuService: MenuService,public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any) {

    this.menuFormControl = this.fb.group({
      menuName: ['', Validators.required],
      fileUpload: ['', [Validators.required]],
      status: [status.Active],
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
    formData.append('file',this.menuFormControl.get('fileUpload').value)
    let menuData:any = {
      english_name:this.menuFormControl.get('menuName').value,
      arabic_name:this.menuFormControl.get('menuName').value,
      status:this.menuFormControl.get('status').value
    }
    if (this.addMode) {
      this._menuService.onAddImage(formData,menuData);
    }else{
      this._menuService.onEditMenu(formData)
    }
  }

}
