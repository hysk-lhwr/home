import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviewListComponent } from './preview-list/preview-list.component';
import { PreviewCardComponent } from './preview-card/preview-card.component';
import { FullContentComponent } from './full-content/full-content.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewListComponent,
    PreviewCardComponent,
    FullContentComponent,
    ArticleCardComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
