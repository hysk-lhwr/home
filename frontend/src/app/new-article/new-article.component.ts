import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewArticleRequest } from '../models/new-article-request';
import { User } from '../models/user';
import { NewArticleService } from '../service/new-article.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  user: User;
  newArticleId: string;

  constructor(
    private userService: UserService, 
    private newArticleService: NewArticleService,
    private router: Router) { }

  ngOnInit() {
    this.userService.user$.subscribe(u => this.user=u);
  }

  createArticle() {
    const request: NewArticleRequest = {
      createdBy: this.user.username
    }
    this.newArticleService.createArticle(request).subscribe(
      response => {
        this.newArticleId = response.articleId;
        this.router.navigateByUrl('/editor', {state: {articleId: this.newArticleId}});
      }
    );
  }

}
