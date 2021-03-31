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
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { CommentsComponent } from './comments/comments.component';
import { ProjectsComponent } from './projects/projects.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewListComponent,
    PreviewCardComponent,
    FullContentComponent,
    ArticleCardComponent,
    HomeComponent,
    LoginComponent,
    SideNavComponent,
    SideBarComponent,
    NewArticleComponent,
    ArticleEditorComponent,
    SearchComponent,
    FilterComponent,
    CommentsComponent,
    ProjectsComponent,
    ErrorNotificationComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
