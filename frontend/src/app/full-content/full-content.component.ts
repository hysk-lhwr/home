import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { LinkedList } from '../models/linkables/linked-list';
import { Role } from '../models/role';
import { SideNavList } from '../models/side-nav-list/side-nav-list';
import { User } from '../models/user';
import { ArticlesLinkService } from '../service/articles-link.service';
import { ConstantsService } from '../service/constants.service';
import { DeleteArticleService } from '../service/delete-article.service';
import { FullContentService } from '../service/full-content.service';
import { MarkdownRendererService } from '../service/markdown-renderer.service';
import { NavListService } from '../service/nav-list.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-full-content',
  templateUrl: './full-content.component.html',
  styleUrls: ['./full-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FullContentComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private destroyRouterSub$: Subject<boolean> = new Subject<boolean>();
  private newArticleIdSubject: Subject<string> = new Subject<string>();
  
  user: User;
  articleId: string;
  fullContent: FullContent = null;
  renderedString: string = null;
  admin: Role = Role.ADMIN;
  iconPath = this.constants.iconPath;
  iconColor: {} = {
    delete: this.constants.iconColor.regular,
    edit: this.constants.iconColor.regular,
  };
  articlesLink: LinkedList;
  navList: SideNavList;

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService,
    private userService: UserService, 
    private constants: ConstantsService, 
    private deleteService: DeleteArticleService,
    private navListService: NavListService,
    private articlesLinkService: ArticlesLinkService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(u => this.user=u);

    this.articlesLinkService.articlesLink$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      link => {
        this.articlesLink = link;
        this.updateNav();
      }
    );

    this.navListService.navList$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      l => this.navList = l
    );
  
    this.newArticleIdSubject.pipe(
      takeUntil(this.destroy$),
      switchMap(
        id => {
          return this.fullContentService.getFullContent(id).pipe(
            catchError(e => {
              console.log('no such article');
              return of(
                <FullContent>  {
                  createdDate: null,
                  editedDate: null,
                  contentRaw: '',
                  contentMarkdown: '',
                  contentHtml: '',
                  views: null,
                  likes: null,
                  categories: null,
                  keywords: null,
                }
              )
            })
          )
        }
      )
    ).subscribe(
      response => {
        this.fullContent = response;
        this.renderedString = this.markdownRendererService.renderString(this.fullContent.contentMarkdown);
      }
    );

    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(e => e instanceof NavigationEnd),
    ).subscribe(
      e => {
        const navigation = this.router.getCurrentNavigation();
        this.articleId = navigation.extras.state ? navigation.extras.state.articleId : null;
        if(this.articleId) {

          // fire articleId subject to retrieve full content
          this.newArticleIdSubject.next(this.articleId);

          // updates nav list
          this.updateNav();

        } else {
          this.router.navigateByUrl('articles');
        }
        this.destroyRouterSub$.next(true);
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  editArticle() {
    this.router.navigateByUrl('/editor', {state: {articleId: this.articleId}});
  }

  deleteArticle() {
    this.deleteService.deleteArticle(this.articleId).subscribe();
    this.router.navigateByUrl('/articles');
  }

  hoverIcon(key: string, col: string) {
    this.iconColor[key] = this.constants.iconColor[col];
  }

  hoverEnds(key: string, col: string) {
    this.iconColor[key] = this.constants.iconColor[col];
  }

  private updateNav(): void {
    if (!!this.articlesLink && !!this.articleId) {
      // add nav items for next and previous article
      const currentArticle = this.articlesLink.getNodeByValue(this.articleId);
      if (currentArticle.previous) {
        this.navList.navItems.push({
          navUrl: "article/" + encodeURI(currentArticle.previous.title),
          iconName: 'previous',
          name: 'previous',
          requireLogin: false,
          state: {
            articleId: currentArticle.previous.value,
          }
        });
      }
      if (currentArticle.next) {
        this.navList.navItems.push({
          navUrl: "article/" + encodeURI(currentArticle.next.title),
          iconName: 'next',
          name: 'next',
          requireLogin: false,
          state: {
            articleId: currentArticle.next.value,
          }
        });
      }
      this.navListService.setNavList(this.navList);
    }
  }
}
