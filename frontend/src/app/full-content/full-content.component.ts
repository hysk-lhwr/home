import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { Role } from '../models/role';
import { User } from '../models/user';
import { ConstantsService } from '../service/constants.service';
import { DeleteArticleService } from '../service/delete-article.service';
import { FullContentService } from '../service/full-content.service';
import { MarkdownRendererService } from '../service/markdown-renderer.service';
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
  }

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService,
    private userService: UserService, 
    private constants: ConstantsService, 
    private deleteService: DeleteArticleService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(u => this.user=u);
  
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
      takeUntil(this.destroyRouterSub$),
      filter(e => e instanceof NavigationEnd),
    ).subscribe(
      e => {
        const navigation = this.router.getCurrentNavigation();
        this.articleId = navigation.extras.state ? navigation.extras.state.articleId : null;
        if(this.articleId) {
          this.newArticleIdSubject.next(this.articleId);
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
}
