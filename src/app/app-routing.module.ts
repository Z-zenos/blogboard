import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingComponent } from './components/setting/setting.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './forms/post-form/post-form.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'write', component: PostFormComponent },
  { path: 'setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
