import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-full-content',
  templateUrl: './full-content.component.html',
  styleUrls: ['./full-content.component.scss']
})
export class FullContentComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  articleId: string;

  constructor(private router: Router) {
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(e => e instanceof ActivationEnd)
    ).subscribe(
      e => {
        const navigation = this.router.getCurrentNavigation();
        this.articleId = navigation.extras.state ? navigation.extras.state.articleId : null;
        if(this.articleId) {
          console.log(this.articleId);
        } else {
          this.router.navigateByUrl('articles');
        }
      }
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
