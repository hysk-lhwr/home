import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil } from 'rxjs/operators';
import { FullContent } from '../models/full-content';
import { FullContentService } from '../service/full-content.service';
import { MarkdownRendererService } from '../service/markdown-renderer.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleEditorComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private newArticleIdSubject: Subject<string> = new Subject<string>();

  articleId: string;
  fullContent: FullContent = null;
  renderedString: string = null;

  constructor(
    private router: Router, 
    private fullContentService: FullContentService,
    private markdownRendererService: MarkdownRendererService) {

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
                  likes: null
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
}
