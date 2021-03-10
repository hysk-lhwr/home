import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { fromEvent, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { Status } from '../models/status';
import { UpdateArticleRequest, updateArticleRequestDefault } from '../models/update-article-request';
import { User } from '../models/user';
import { ConstantsService } from '../service/constants.service';
import { DeleteArticleService } from '../service/delete-article.service';
import { FullContentService } from '../service/full-content.service';
import { MarkdownRendererService } from '../service/markdown-renderer.service';
import { UpdateArticleService } from '../service/update-article.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  // the name of this Subject can be confusing
  // it retrieves id from the navigation event
  // which can either be the id of an existing article
  // or the id just created by the new article component
  private newArticleIdSubject: Subject<string> = new Subject<string>();

  @ViewChild('contentRef', {static: false}) textInput: ElementRef;
  private textInputSubscription: Subscription;
  private requestSubject: Subject<UpdateArticleRequest> = new Subject<UpdateArticleRequest>();
  private request$ = this.requestSubject.asObservable();

  articleId: string;
  renderedString: string = null;
  title: string = null;
  categories: string = null;
  labels: string = null;
  preview: string = null;
  contentMarkdown: string = null;
  contentRaw: string = null;
  contentHtml: string = null;
  updateArticleRequest: UpdateArticleRequest = updateArticleRequestDefault;
  user: User;
  previewMode: boolean = false;
  iconColor = this.constants.iconColor;
  iconPath = this.constants.iconPath;
  currentStatus: Status = Status.DRAFT;
  emptyContent: FullContent = {
    createdDate: null,
    editedDate: null,
    contentRaw: '',
    contentMarkdown: '',
    contentHtml: '',
    views: null,
    likes: null,
    title: null,
    categories: null,
    keywords: null,
    preview: null,
    status: Status.DRAFT,
  }

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService, 
    private userService: UserService, 
    private updateArticleService: UpdateArticleService, 
    private constants: ConstantsService, 
    private deleteService: DeleteArticleService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(u => this.user = u)

    this.request$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      request => {
        this.updateArticleService.updateArticle(request).subscribe();
      }
    )
  
    this.newArticleIdSubject.pipe(
      takeUntil(this.destroy$),
      switchMap(
        id => {
          return this.fullContentService.getFullContent(id).pipe(
            catchError(e => {
              console.log('no such article');
              return of(this.emptyContent)
            })
          )
        }
      )
    ).subscribe(
      response => {
        this.title = response.title? response.title : null;
        this.categories = response.categories? response.categories.join(',') : null;
        this.labels = response.keywords? response.keywords.join(',') : null;
        this.preview = response.preview? response.preview : null;
        this.contentMarkdown = response.contentMarkdown? response.contentMarkdown : null;
        this.currentStatus = response.status;
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

  ngOnInit() { }

  ngAfterViewInit() {
    this.textInputSubscription = fromEvent(
      this.textInput.nativeElement,
      'input'
    ).pipe(
      // get text input from event
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),

      // triggers every second
      debounceTime(1000),

      // triggers only if has changed
      distinctUntilChanged(),

      // update contentMarkdown and requestDto
      map(val => {
        this.contentMarkdown = val;
        return this.createRequest();
      }),

      // setup unsub
      takeUntil(this.destroy$),
    ).subscribe(request => {
      this.requestSubject.next(request);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public publishArticle() {
    this.currentStatus = Status.PUBLISHED;
    this.requestSubject.next(this.createRequest());
    this.exitPage();
  }

  public deleteArticle() {
    this.deleteService.deleteArticle(this.articleId).subscribe();
    this.exitPage();
  }

  public saveAndExit() {
    this.currentStatus = Status.DRAFT;
    this.requestSubject.next(this.createRequest());
    this.exitPage();
  }

  public togglePreview() {
    this.previewMode = !this.previewMode;
    if (this.previewMode) {
      this.renderedString = this.markdownRendererService.renderString(this.contentMarkdown);
    }
  }

  private exitPage() {
    this.updateArticleRequest = updateArticleRequestDefault;
    this.router.navigateByUrl("/articles");
  }

  private createRequest(): UpdateArticleRequest {
    this.updateArticleRequest = {
      articleId: this.articleId,
      udpatedBy: this.user.username,
      title: this.title,
      keywords: this.getKeywords(),
      categories: this.getCategories(),
      preview: this.preview,
      contentMarkdown: this.contentMarkdown,
      contentHtml: this.contentHtml,
      contentRaw: this.contentRaw,
      status: this.currentStatus,
      }
    return this.updateArticleRequest;
  }

  private getKeywords(): string[] {
    if (!!this.labels && this.labels.length > 0) {
      var labelList: string[] = [];
      this.labels.split(',').forEach(s => {
        if (s.trim()) {
          labelList.push(s.trim());
        }
      })
      return labelList;
    } else {
      return [];
    }
  }

  private getCategories(): string[] {
    if (!!this.categories && this.categories.length > 0) {
      var catList: string[] = [];
      this.categories.split(',').forEach(s => {
        if (s.trim()) {
          catList.push(s.trim());
        }
      })
      return catList;
    } else {
      return [];
    }
  }
}
