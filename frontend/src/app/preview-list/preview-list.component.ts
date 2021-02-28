import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShortenedArticle } from '../models/shortened-article';
import { ArticlesService } from '../service/articles.service';

@Component({
  selector: 'app-preview-list',
  templateUrl: './preview-list.component.html',
  styleUrls: ['./preview-list.component.scss']
})
export class PreviewListComponent implements OnInit, OnChanges, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  shortenedArticles: ShortenedArticle[] = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getArticles().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        if (response.articles) {
          this.shortenedArticles = [].concat(
            Object.assign([], response.articles)
          );
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {  }
}
