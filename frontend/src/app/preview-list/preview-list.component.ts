import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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
  private destroyRouterSub$: Subject<boolean> = new Subject<boolean>();
  private params: any;

  shortenedArticles: ShortenedArticle[] = [];

  constructor(
    private articlesService: ArticlesService, 
    private userService: UserService, 
    private articlesLinkService: ArticlesLinkService,
    private router: Router,
    private route: ActivatedRoute,
    ) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(u => {
      this.user = u;
    });

    this.router.events.pipe(
      takeUntil(this.destroyRouterSub$),
      filter(e => e instanceof NavigationEnd),
    ).subscribe(e => {
      const currentUrl = this.router.getCurrentNavigation().extractedUrl;
      // retrieve parameters if navigated to /articles (preview list) page
      // be aware of redirection from '/'
      if (currentUrl && (currentUrl.toString().startsWith('/articles') || currentUrl.toString() === '/')) {
        const params = this.route.snapshot.queryParams;
        this.retrieveArticles(params);
      } else {
        this.destroyRouterSub$.next(true);
      }
    });
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

  private retrieveArticles(params: Params) {
    console.log('retrieving articles');
    this.articlesService.getArticles(params).pipe(
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

}
