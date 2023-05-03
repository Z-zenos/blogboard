import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { MainComponent } from './layouts/main/main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingComponent } from './components/setting/setting.component';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BadgeComponent } from './components/badge/badge.component';
import { TagComponent } from './components/tag/tag.component';
import { OverlayComponent } from './layouts/overlay/overlay.component';
import { ToastComponent } from './components/toast/toast.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { DestroyFormComponent } from './forms/destroy-form/destroy-form.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    IconComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    CategoriesComponent,
    SettingComponent,
    CategoryFormComponent,
    BadgeComponent,
    TagComponent,
    OverlayComponent,
    ToastComponent,
    CopyClipboardDirective,
    DestroyFormComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
