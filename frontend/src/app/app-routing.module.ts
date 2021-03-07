import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { FullContentComponent } from './full-content/full-content.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PreviewListComponent } from './preview-list/preview-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'articles',
        component: PreviewListComponent,
      },
      {
        path: 'article/:title',
        component: FullContentComponent,
      },
      {
        path: '',
        redirectTo: 'articles',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'editor',
    component: ArticleEditorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
