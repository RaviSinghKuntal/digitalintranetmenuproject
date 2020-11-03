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
  imageSrc:any;
  addMode: boolean = true;
  editMenuData:any;

  constructor(private _menuService: MenuService,public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any) {

    this.menuFormControl = this.fb.group({
      english_name: ['', Validators.required],
      image: ['', [Validators.required]],
      status: [status.Active],
    });

    this.editMenuData = {...data};
    if(this.editMenuData.editMenu){
      this.addMode = false;
      this.imageSrc = `http://localhost:3000/upload/${this.editMenuData.image}`;
      this.menuFormControl.patchValue({
        english_name: this.editMenuData.english_name,
        image: this.editMenuData.image,
        status: this.editMenuData.status
      })
    }
  }

  ngOnInit(): void { }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.menuFormControl.get('image').setValue(file);
        this.imageSrc = reader.result;
      }
      reader.readAsDataURL(file);
      }
  }

  onSaveMenu() {
    let formData = new FormData();
    formData.append('file',this.menuFormControl.get('image').value);
    let menuData:any = {
      english_name:this.menuFormControl.get('english_name').value,
      arabic_name:this.menuFormControl.get('english_name').value,
      status:this.menuFormControl.get('status').value
    }
    if(this.addMode){
      this._menuService.onAddImage(formData,menuData,true);
    }else{
      formData.append('_id',this.editMenuData._id);
      this._menuService.onAddImage(formData,menuData,false);
    }
  }

}
