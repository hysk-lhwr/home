import { Component, HostListener, Input, OnInit } from '@angular/core';
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
export class CommentsComponent implements OnInit {

  @Input('targetId') targetId: string;
  newComment: string;
  clientIp: string;
  user: User;

  constructor(
    private ipService: IpService, 
    private commentService: CommentService, 
    private userService: UserService
    ) {

      this.userService.user$.subscribe(
        user => this.user = user
      );

      this.ipService.clientIp$.subscribe(ip =>
        {
          this.clientIp = ip;
        }
      );
   }

  ngOnInit() {}

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
        }
      )
    }
  }
}
