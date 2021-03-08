import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { fromEvent, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { UpdateArticleRequest, updateArticleRequestDefault } from '../models/update-article-request';
import { User } from '../models/user';
import { ConstantsService } from '../service/constants.service';
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
  private newArticleIdSubject: Subject<string> = new Subject<string>();

  @ViewChild('contentRef', {static: false}) textInput: ElementRef;
  private textInputSubscription: Subscription;

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
  }

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService, 
    private userService: UserService, 
    private updateArticleService: UpdateArticleService, 
    private constants: ConstantsService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(u => this.user = u)
  
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
      console.log(request);
      this.updateArticleService.updateArticle(request).subscribe(
        response => {
          console.log(response);
        }
      );
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public adjustHeight(el: HTMLElement): void{
    el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : el.style.height;
  }

  public publishArticle() {
    // update status, contentHtml, contentRaw
    // createRequest
    // sendRequest
  }

  public togglePreview() {
    this.previewMode = !this.previewMode;
    if (this.previewMode) {
      this.renderedString = this.markdownRendererService.renderString(this.contentMarkdown);
    }
  }

  private createRequest(): UpdateArticleRequest {
    this.updateArticleRequest.articleId = this.articleId;
    this.updateArticleRequest.udpatedBy = this.user.username;
    this.updateArticleRequest.title = this.title;
    this.updateArticleRequest.keywords = this.getKeywords();
    this.updateArticleRequest.categories = this.getCategories();
    this.updateArticleRequest.preview = this.preview;
    this.updateArticleRequest.contentMarkdown = this.contentMarkdown;
    this.updateArticleRequest.contentHtml = this.contentHtml;
    this.updateArticleRequest.contentRaw = this.contentRaw;
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
