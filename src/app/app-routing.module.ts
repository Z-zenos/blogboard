import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingComponent } from './components/setting/setting.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './forms/post-form/post-form.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'write', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'setting', component: SettingComponent, canActivate: [AuthGuard] },
  { path: '**', component: CategoriesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
