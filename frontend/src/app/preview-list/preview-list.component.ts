import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Node } from '../models/linkables/node';
import { ShortenedArticle } from '../models/shortened-article';
import { Status } from '../models/status';
import { User } from '../models/user';
import { ArticlesLinkService } from '../service/articles-link.service';
import { ArticlesService } from '../service/articles.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrls: ['./preview-list.component.scss']
})
export class PreviewListComponent implements OnInit, OnChanges, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private user: User;

  shortenedArticles: ShortenedArticle[] = [];

  constructor(private articlesService: ArticlesService, private userService: UserService, private articlesLinkService: ArticlesLinkService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(u => {
      this.user = u;
    });

    this.articlesService.getArticles().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        if (response.articles) {
          this.shortenedArticles = [].concat(
            Object.assign([], response.articles)
          );
          this.articlesLinkService.resetLink();
          this.shortenedArticles.forEach(
            article => {
              if(this.checkVisibility(article)) {
                const articleNode = new Node(article.articleId, article.status, article.articleTitle);
                this.articlesLinkService.append(articleNode);  
              }
            }
          )
        }
      }
    );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) { }

  checkVisibility(article: ShortenedArticle): boolean {
    if (!!article) {
      if (!!this.user.timeLoggedin) {
        return true;
      } else {
        return article.status.valueOf() === Status.PUBLISHED.valueOf();
      }
    } else {
      return false;
    }
  }
}
