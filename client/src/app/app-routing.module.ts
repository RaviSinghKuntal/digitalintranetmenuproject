import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CategoryComponent } from './modules/manageFood/category/category.component';
import { ItemsComponent } from './modules/manageFood/items/items.component';
import { MenuComponent } from './modules/manageFood/menu/menu.component';
import { ModifierComponent } from './modules/manageFood/modifier/modifier.component';
import { PostsComponent } from './modules/posts/posts.component';
const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'item',
        component: ItemsComponent,
      },
      {
        path: 'modifier',
        component: ModifierComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
