import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionType } from '../models/error-handling/action-type';
import { Error } from '../models/error-handling/error';
import { ErrorNotificationService } from '../service/error-notification.service';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  error: Error;
  countDown: number = 3;
  private destroy$: Subject<boolean> = new Subject();

  constructor(private errorService: ErrorNotificationService, private router: Router) { 
    this.errorService.error$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(
      err => {
        this.error = err;
      }
    )
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    interval(1000).subscribe(val => {
      if(this.countDown > 0) {
        this.countDown = this.countDown - 1;
      } else {
        this.countDown = 3;
        this.act();
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  private act(): void {

    if(this.error) {

      switch(this.error.action) {

        case ActionType.REDIRECT: {
          this.router.navigateByUrl('/');
          break;
        }
  
        case ActionType.IGNORE: {
          console.log('The error will be ignored.');
          break;
        }
  
        case ActionType.RETRY: {
          console.log('Retrying after countdown');
          break;
        }
      }

      this.errorService.resolveError();
    }
  }

}
