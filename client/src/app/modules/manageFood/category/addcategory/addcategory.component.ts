import { Component, Inject, OnInit, Optional } from '@angular/core';
import { status, SERVER_URL } from '../../../../shared/constant';
import { ThemePalette } from '@angular/material/core';
import { CategoryService } from '../../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Category } from 'src/app/models/category.model';
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {
  categoryFormControl: FormGroup;
  color: ThemePalette = 'accent';
  imageSrc:any;
  addMode: boolean = true;
  editCategoryData:any;

  constructor(private _categoryService: CategoryService,public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.categoryFormControl = this.fb.group({
      english_name: ['', Validators.required],
      image: ['', [Validators.required]],
      status: [status.Active],
    });

    this.editCategoryData = {...data};
    if(this.editCategoryData.editCategory){
      this.addMode = false;
      this.imageSrc = `${SERVER_URL}/upload/${this.editCategoryData.image}`;
      this.categoryFormControl.patchValue({
        engish_name: this.editCategoryData.english_name,
        image: this.editCategoryData.image,
        status: this.editCategoryData.status 
      })
    }
  }

  ngOnInit(): void { }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.categoryFormControl.get('image').setValue(file);
        this.imageSrc = reader.result;
        console.log(this.imageSrc)
      };
      reader.readAsDataURL(file);
    }
  }

  async onSaveCategory() {
    let formData = new FormData();
    formData.append('file',this.categoryFormControl.get('image').value);
    let categoryData:any = {
      english_name:this.categoryFormControl.get('english_name').value,
      arabic_name:this.categoryFormControl.get('english_name').value,
      status:this.categoryFormControl.get('status').value
    }
    if(typeof this.categoryFormControl.get('image').value === 'object'){
      categoryData['image'] = await this._categoryService.onAddImage(formData);
      if(this.addMode){
        await this._categoryService.onAddCategory(categoryData);
      }else{
        categoryData['_id'] = this.editCategoryData._id;
        this._categoryService.onEditCategory(categoryData);
      }
    }else{
      categoryData['_id'] = this.editCategoryData._id;
      categoryData['image'] = this.categoryFormControl.get('image').value;
      this._categoryService.onAddCategory(categoryData);
    }
  }
}
