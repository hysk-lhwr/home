import { Component, Input, OnInit } from '@angular/core';
import { ShortenedArticle } from '../models/shortened-article';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss']
})
export class PreviewCardComponent implements OnInit {
  @Input('article') article: ShortenedArticle;

  constructor() { }

  ngOnInit() {
  }

}
