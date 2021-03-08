import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { Role } from '../models/role';
import { User } from '../models/user';
import { ConstantsService } from '../service/constants.service';
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
  private newArticleIdSubject: Subject<string> = new Subject<string>();
  
  user: User;
  articleId: string;
  fullContent: FullContent = null;
  renderedString: string = null;
  admin: Role = Role.ADMIN;
  iconColor: string = this.constants.iconColor.regular;
  iconPath: object = this.constants.iconPath;

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService,
    private userService: UserService, 
    private constants: ConstantsService) {

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
      takeUntil(this.destroy$),
      filter(e => e instanceof ActivationEnd)
    ).subscribe(
      e => {
        const navigation = this.router.getCurrentNavigation();
        this.articleId = navigation.extras.state ? navigation.extras.state.articleId : null;
        if(this.articleId) {
          this.newArticleIdSubject.next(this.articleId);
        } else {
          this.router.navigateByUrl('articles');
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

  editArticle() {
    this.router.navigateByUrl('/editor', {state: {articleId: this.articleId}});
  }

  hoverIcon() {
    this.iconColor = this.constants.iconColor.highlight;
  }

  hoverEnds() {
    this.iconColor = this.constants.iconColor.regular;
  }
}
