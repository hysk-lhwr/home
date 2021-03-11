import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NewArticleRequest } from '../models/new-article-request';
import { User } from '../models/user';
import { NewArticleService } from '../service/new-article.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit, OnDestroy {

  user: User = null;
  newArticleId: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService, 
    private newArticleService: NewArticleService,
    private router: Router) {

      this.userService.user$.subscribe(u => {
        this.user=u;
      });
  
      this.router.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd),
      ).subscribe(
        e => {
          const url = this.router.getCurrentNavigation().extractedUrl.toString();
          if (!!this.user && url === '/new') {
            this.createArticle();
          }
          this.destroy$.next(true);
        }
      );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private createArticle() {
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
