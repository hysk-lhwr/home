import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShortenedArticle } from '../models/shortened-article';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {
  @Input('article') article: ShortenedArticle;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  showFullArticle() {
    this.router.navigateByUrl(
      '/article/' + encodeURIComponent(this.article.articleTitle),
      {state: {articleId: this.article.articleId}}
    )
  }

  appendKeywordToRoute(event: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        keyword: event
      },
      // preserve the existing query params in the route
      queryParamsHandling: 'merge',
      skipLocationChange: false,
    });
  }
}
