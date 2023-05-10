import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconComponent } from './components/icon/icon.component';
import { MainComponent } from './layouts/main/main.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { environment } from 'src/environments/environment.prod';
import { CategoriesComponent } from './components/categories/categories.component';
import { SettingComponent } from './components/setting/setting.component';
import { CategoryFormComponent } from './forms/category-form/category-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BadgeComponent } from './components/badge/badge.component';
import { TagComponent } from './components/tag/tag.component';
import { OverlayComponent } from './layouts/overlay/overlay.component';
import { ToastComponent } from './components/toast/toast.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';
import { DestroyFormComponent } from './forms/destroy-form/destroy-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PostFormComponent } from './forms/post-form/post-form.component';
import { PostsComponent } from './components/posts/posts.component';
import { TipComponent } from './components/tip/tip.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';
import { AlertComponent } from './components/alert/alert.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {NgOptimizedImage} from "@angular/common";
import { PreviewComponent } from './components/preview/preview.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

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
    LoaderComponent,
    PostFormComponent,
    PostsComponent,
    TipComponent,
    ImageUploaderComponent,
    AlertComponent,
    PostCardComponent,
    LoginComponent,
    NotFoundComponent,
    PreviewComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),

    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgSelectModule,
    FormsModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
