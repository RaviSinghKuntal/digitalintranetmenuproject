import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AddcategoryComponent } from '../../modules/manageFood/category/addcategory/addcategory.component';
import { AdditemComponent } from '../../modules/manageFood/items/additem/additem.component';
import { AddmenuComponent } from '../../modules/manageFood/menu/addmenu/addmenu.component';
import { AddmodifierComponent } from '../../modules/manageFood/modifier/addmodifier/addmodifier.component';
import { CategoryComponent } from '../../modules/manageFood/category/category.component';
import { DashboardComponent } from '../../modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { DashboardHeaderComponent } from '../../modules/manageFood/shared/dashboard-header/dashboard-header.component';
import { ItemsComponent } from '../../modules/manageFood/items/items.component';
import { PostsComponent } from '../../modules/posts/posts.component';
import { MenuComponent } from '../../modules/manageFood/menu/menu.component';
import { ModifierComponent } from '../../modules/manageFood/modifier/modifier.component';
@NgModule({
  declarations: [
    AddcategoryComponent,
    AdditemComponent,
    AddmodifierComponent,
    AddmenuComponent,
    CategoryComponent,
    DefaultComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    ItemsComponent,
    MenuComponent,
    ModifierComponent,
    PostsComponent,
  ],
  imports: [
    CommonModule,HttpClientModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [],
  entryComponents:[AddmenuComponent]
})
export class DefaultModule {}
