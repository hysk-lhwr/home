import { Component, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommentRequest } from '../models/comment-request';
import { User } from '../models/user';
import { CommentService } from '../service/comment.service';
import { IpService } from '../service/ip-service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnChanges, OnDestroy {

  @Input('targetId') targetId: string;
  private getCommentsSubject: Subject<boolean> = new Subject();
  private getComments$ = this.getCommentsSubject.asObservable();
  private destroy$: Subject<boolean> = new Subject();
  newComment: string;
  clientIp: string;
  comments: Comment[] = [];
  user: User;

  constructor(
    private ipService: IpService, 
    private commentService: CommentService, 
    private userService: UserService
    ) {

      this.userService.user$.pipe(
        takeUntil(this.destroy$),
      ).subscribe(
        user => this.user = user
      );

      this.ipService.clientIp$.pipe(
        takeUntil(this.destroy$),
      ).subscribe(ip =>
        {
          this.clientIp = ip;
        }
      );

      this.getComments$.pipe(
        takeUntil(this.destroy$),
      ).subscribe(val => {
        console.log('retriving comments');
        const params: Params = {
          targetId: this.targetId,
        };
        this.commentService.getComments(params).subscribe(resp => {
          this.comments = Object.assign([], resp.comments);
          console.log(this.comments);
        });
      })
   }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if ('targetId' in changes) {
      this.getCommentsSubject.next(true);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (e.shiftKey && e.key === 'Enter') {
      console.log('sending comment');
      this.sendComment();
    }
  }

  sendComment(): void {
    if (this.newComment && this.newComment.trim()) {
      const newCommentRequest: CommentRequest = {
        targetId: this.targetId,
        content: this.newComment,
        commentedBy: this.user.username,
        ipAddress: this.clientIp,
      }
      this.commentService.createComment(newCommentRequest).subscribe(
        resp => {
          this.newComment = null;
          this.getCommentsSubject.next(true);
        }
      )
    }
  }
}
