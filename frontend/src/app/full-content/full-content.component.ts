import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { BinaryFeedbackRequest } from '../models/binary-feedback';
import { ActionType } from '../models/error-handling/action-type';
import { Error } from '../models/error-handling/error';
import { ErrorType } from '../models/error-handling/error-type';
import { FullContent } from '../models/full-content';
import { LinkedList } from '../models/linkables/linked-list';
import { Role } from '../models/role';
import { SideNavList } from '../models/side-nav-list/side-nav-list';
import { User } from '../models/user';
import { ArticlesLinkService } from '../service/articles-link.service';
import { ConstantsService } from '../service/constants.service';
import { DeleteArticleService } from '../service/delete-article.service';
import { ErrorNotificationService } from '../service/error-notification.service';
import { FullContentService } from '../service/full-content.service';
import { IpService } from '../service/ip-service';
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
  iconPath: Keyable;
  iconColor: Keyable = {
    delete: this.constants.iconColor.regular,
    edit: this.constants.iconColor.regular,
    thumbup: this.constants.iconColor.regular,
    thumbdown: this.constants.iconColor.regular,
    eye: this.constants.iconColor.highlight,
    heart: this.constants.iconColor.delete,
  };
  articlesLink: LinkedList;
  navList: SideNavList;
  feedback: boolean;
  clientIp: string;

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService,
    private userService: UserService, 
    private constants: ConstantsService, 
    private deleteService: DeleteArticleService,
    private navListService: NavListService,
    private articlesLinkService: ArticlesLinkService,
    private ipService: IpService,
    private errorNotificationService: ErrorNotificationService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(u => this.user = u);

    this.ipService.clientIp$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      ip => this.clientIp = ip
    )

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
              return of(null);
            })
          )
        }
      )
    ).subscribe(
      response => {
        if(!!response) {
          this.fullContent = response;
          this.renderedString = this.markdownRendererService.renderString(this.fullContent.contentMarkdown);  
        } else {
          const error: Error = {
            type: ErrorType.DEAD_END,
            message: 'Requested content does not exist',
            action: ActionType.REDIRECT,
            actionMessage: 'Redirecting...',
          };
          this.fullContent = null;
          this.errorNotificationService.newError(error);
        }
      }
    );

    this.router.events.pipe(
      takeUntil(this.destroyRouterSub$),
      filter(e => (e instanceof NavigationEnd) || (e instanceof NavigationStart)),
    ).subscribe(
      e => {
        const navigation = this.router.getCurrentNavigation();

        if (e instanceof NavigationEnd) {
          this.articleId = navigation.extras.state ? navigation.extras.state.articleId : null;
          if(this.articleId) {
  
            // fire articleId subject to retrieve full content
            this.newArticleIdSubject.next(this.articleId);
  
            // updates nav list
            this.updateNav();
  
          } else {
            this.fullContent = null;
            const error: Error = {
              type: ErrorType.DEAD_END,
              message: 'Illegal parameter',
              action: ActionType.REDIRECT,
              actionMessage: 'Redirecting...',
            }
            this.errorNotificationService.newError(error);
          }  
        }

        if (e instanceof NavigationStart) {
          const currentUrl = navigation.extractedUrl.toString();
          if (!currentUrl.startsWith('/article/')) {
            this.navListService.resetList();
            this.destroyRouterSub$.next(true);
          }
        }
      }
    );
  }

  ngOnInit() {
    this.iconPath = this.constants.iconPath;
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
    if (this.feedback !== undefined && (key === 'thumbup' || key === 'thumbdown')) {
      return;
    }
    this.iconColor[key] = this.constants.iconColor[col];
  }

  hoverEnds(key: string, col: string) {
    if (this.feedback !== undefined && (key === 'thumbup' || key === 'thumbdown')) {
      return;
    }
    this.iconColor[key] = this.constants.iconColor[col];
  }

  setFeedback(val: boolean): void {
    this.feedback = val;

    if (this.feedback) {
      this.iconColor['thumbup'] = this.constants.iconColor.enabled;
      this.iconColor['thumbdown'] = this.constants.iconColor.regular;
    } else {
      this.iconColor['thumbup'] = this.constants.iconColor.regular;
      this.iconColor['thumbdown'] = this.constants.iconColor.delete;
    }

    const fbRequest: BinaryFeedbackRequest = {
      username: this.user.username,
      ip: this.clientIp,
      score: val? 1:-1,
    }
    this.fullContentService.addFeedback(this.articleId, fbRequest).subscribe(
      resp => {
        if (!resp.success) {
          const error: Error = {
            type: ErrorType.SERVER_ERROR,
            message: 'failed to save feedback',
            action: ActionType.IGNORE,
            actionMessage: 'ignoring the error',
          }
          this.errorNotificationService.newError(error);
        }
      }
    );
  }

  private updateNav(): void {
    if (!!this.articlesLink && !!this.articleId) {
      // add nav items for next and previous article
      const currentArticle = this.articlesLink.getNodeByValue(this.articleId);
      if (currentArticle.previous) {
        this.navList.navItems.push({
          navUrl: "article/" + encodeURIComponent(currentArticle.previous.title),
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
          navUrl: "article/" + encodeURIComponent(currentArticle.next.title),
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